"use client";

import { AuthPage } from "@refinedev/antd";
import { useSearchParams } from "next/navigation";

export default function UpdatePassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>Invalid Reset Link</h2>
        <p>The password reset link is invalid or has expired.</p>
      </div>
    );
  }

  return (
    <AuthPage
      type="updatePassword"
      title={
        <div style={{ textAlign: "center" }}>
          <h2>Reset Password</h2>
          <p>Enter your new password</p>
        </div>
      }
    />
  );
}
