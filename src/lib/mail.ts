import "server-only";
import nodemailer from "nodemailer";
import { COMPANY } from "./config";

/**
 * Transactional email. Uses SMTP when configured; otherwise logs the message
 * so local/preview flows don't crash. Replace SMTP_* env vars in production.
 */
function getTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;
  if (!SMTP_HOST) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT ?? 587) === 465,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASSWORD } : undefined,
  });
}

export interface MailOptions {
  to: string;
  subject: string;
  html: string;
  attachments?: { filename: string; content: Buffer; contentType: string }[];
}

export async function sendMail(opts: MailOptions): Promise<void> {
  const from = process.env.SMTP_FROM ?? `${COMPANY.brand} <${COMPANY.email}>`;
  const transport = getTransport();
  if (!transport) {
    console.info(`[mail:dev] → ${opts.to} — ${opts.subject}`);
    return;
  }
  await transport.sendMail({ from, ...opts });
}

const shell = (title: string, body: string) => `
<div style="background:#101114;padding:32px;font-family:Inter,Arial,sans-serif;color:#EDEFF3">
  <div style="max-width:560px;margin:0 auto;background:#17181D;border:1px solid #26282F;border-radius:16px;overflow:hidden">
    <div style="padding:24px 28px;border-bottom:1px solid #26282F">
      <span style="font-size:20px;font-weight:700">Earner<span style="background:linear-gradient(100deg,#A78BFA,#22D3EE,#6EE7B7);-webkit-background-clip:text;background-clip:text;color:transparent">Skins</span></span>
    </div>
    <div style="padding:28px">
      <h1 style="margin:0 0 16px;font-size:20px">${title}</h1>
      ${body}
    </div>
    <div style="padding:20px 28px;border-top:1px solid #26282F;color:#8A8F9C;font-size:12px">
      ${COMPANY.legalName} · ${COMPANY.address}<br/>
      Support: <a href="mailto:${COMPANY.email}" style="color:#B8F04A">${COMPANY.email}</a> · ${COMPANY.supportHours}
    </div>
  </div>
</div>`;

export function registrationEmail(firstName: string): string {
  return shell(
    "Welcome to EarnerSkins",
    `<p style="color:#8A8F9C;line-height:1.6">Hi ${firstName}, your account is ready. You can now browse and buy skins across CS2, Team Fortress 2 and Rust — with instant delivery on every order.</p>
     <a href="${site()}/login" style="display:inline-block;margin-top:16px;background:#B8F04A;color:#0C1400;padding:12px 20px;border-radius:10px;text-decoration:none;font-weight:600">Sign in</a>`,
  );
}

export function passwordResetEmail(resetUrl: string): string {
  return shell(
    "Reset your password",
    `<p style="color:#8A8F9C;line-height:1.6">We received a request to reset your EarnerSkins password. This link expires in 60 minutes. If you didn't ask for this, you can safely ignore this email.</p>
     <a href="${resetUrl}" style="display:inline-block;margin-top:16px;background:#B8F04A;color:#0C1400;padding:12px 20px;border-radius:10px;text-decoration:none;font-weight:600">Choose a new password</a>`,
  );
}

export function orderConfirmationEmail(orderNumber: string, totalFormatted: string): string {
  return shell(
    `Order ${orderNumber} confirmed`,
    `<p style="color:#8A8F9C;line-height:1.6">Thanks for your purchase. Your skins are being delivered to your account now. A PDF invoice is attached for your records.</p>
     <p style="margin-top:16px">Total paid: <strong style="font-family:monospace">${totalFormatted}</strong></p>`,
  );
}

function site() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}
