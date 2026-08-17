import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { AuthShell } from "@/components/auth/AuthShell";
import { ResetForm } from "@/components/auth/ResetForms";

export const metadata: Metadata = pageMetadata({
  title: "Choose a new password",
  description: "Set a new password for your EarnerSkins account.",
  path: "/reset-password",
});

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  return (
    <AuthShell
      title="Choose a new password"
      footer={
        <Link href="/login" className="text-primary hover:underline">
          Back to sign in
        </Link>
      }
    >
      {token ? (
        <ResetForm token={token} />
      ) : (
        <p className="text-sm text-muted">
          This reset link is missing its token. Please use the link from your email, or{" "}
          <Link href="/forgot-password" className="text-primary hover:underline">
            request a new one
          </Link>
          .
        </p>
      )}
    </AuthShell>
  );
}
