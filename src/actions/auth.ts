"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { registrationSchema, loginSchema } from "@/lib/validation";
import { createSession, destroySession } from "@/lib/session";
import { createToken } from "@/lib/id";
import { SITE_URL } from "@/lib/seo";
import {
  sendMail,
  registrationEmail,
  passwordResetEmail,
} from "@/lib/mail";

export interface ActionState {
  error?: string;
  fieldErrors?: Record<string, string>;
  ok?: boolean;
  message?: string;
}

async function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "The store database isn't configured in this environment. Set DATABASE_URL to enable accounts.",
    );
  }
  return import("@/db");
}

export async function registerAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const raw = {
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    password: String(formData.get("password") ?? ""),
    firstName: String(formData.get("firstName") ?? "").trim(),
    lastName: String(formData.get("lastName") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    dateOfBirth: String(formData.get("dateOfBirth") ?? ""),
    street: String(formData.get("street") ?? "").trim(),
    city: String(formData.get("city") ?? "").trim(),
    country: String(formData.get("country") ?? ""),
    postalCode: String(formData.get("postalCode") ?? "").trim(),
    agreedToTerms: formData.get("agreedToTerms") === "on" || formData.get("agreedToTerms") === "true",
  };

  const parsed = registrationSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[issue.path[0] as string] = issue.message;
    }
    return { fieldErrors, error: "Please fix the highlighted fields." };
  }

  let userId: string;
  try {
    const { db, users } = await getDb();
    const existing = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, parsed.data.email))
      .limit(1);
    if (existing[0]) {
      return { fieldErrors: { email: "An account with this email already exists." } };
    }
    const passwordHash = await bcrypt.hash(parsed.data.password, 10);
    const inserted = await db
      .insert(users)
      .values({
        email: parsed.data.email,
        passwordHash,
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        phone: parsed.data.phone,
        dateOfBirth: parsed.data.dateOfBirth,
        street: parsed.data.street,
        city: parsed.data.city,
        country: parsed.data.country,
        postalCode: parsed.data.postalCode,
        agreedToTerms: true,
      })
      .returning({ id: users.id });
    userId = inserted[0].id;
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Registration failed. Please try again." };
  }

  await sendMail({
    to: parsed.data.email,
    subject: "Welcome to EarnerSkins",
    html: registrationEmail(parsed.data.firstName),
  }).catch(() => {});

  await createSession(userId);
  redirect("/account");
}

export async function loginAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = loginSchema.safeParse({
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    password: String(formData.get("password") ?? ""),
  });
  if (!parsed.success) {
    return { error: "Enter your email and password." };
  }

  let userId: string;
  try {
    const { db, users } = await getDb();
    const rows = await db
      .select()
      .from(users)
      .where(eq(users.email, parsed.data.email))
      .limit(1);
    const user = rows[0];
    if (!user || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) {
      return { error: "Incorrect email or password." };
    }
    userId = user.id;
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Sign in failed. Please try again." };
  }

  await createSession(userId);
  redirect("/account");
}

export async function logoutAction() {
  await destroySession();
  redirect("/");
}

export async function requestResetAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email) return { error: "Enter your email address." };

  try {
    const { db, users, tokens } = await getDb();
    const rows = await db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1);
    if (rows[0]) {
      const token = createToken();
      await db.insert(tokens).values({
        userId: rows[0].id,
        token,
        purpose: "reset",
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      });
      const url = `${SITE_URL}/reset-password?token=${token}`;
      await sendMail({
        to: email,
        subject: "Reset your EarnerSkins password",
        html: passwordResetEmail(url),
      }).catch(() => {});
    }
  } catch {
    // fall through — never reveal whether an account exists
  }

  // Always report success to avoid account enumeration.
  return {
    ok: true,
    message: "If an account exists for that email, we've sent a password reset link.",
  };
}

export async function resetPasswordAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const token = String(formData.get("token") ?? "");
  const password = String(formData.get("password") ?? "");
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  try {
    const { db, users, tokens } = await getDb();
    const rows = await db.select().from(tokens).where(eq(tokens.token, token)).limit(1);
    const record = rows[0];
    if (!record || record.usedAt || record.expiresAt < new Date() || record.purpose !== "reset") {
      return { error: "This reset link is invalid or has expired." };
    }
    const passwordHash = await bcrypt.hash(password, 10);
    await db.update(users).set({ passwordHash }).where(eq(users.id, record.userId));
    await db.update(tokens).set({ usedAt: new Date() }).where(eq(tokens.id, record.id));
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Could not reset password." };
  }

  return { ok: true, message: "Your password has been updated. You can now sign in." };
}
