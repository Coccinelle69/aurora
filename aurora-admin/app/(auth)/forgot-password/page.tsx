"use client";

import { AuthPage } from "@refinedev/antd";

export default function ForgotPassword() {
  return (
    <AuthPage
      type="forgotPassword"
      wrapperProps={{
        style: {
          background: "transparent",
          backgroundColor: "transparent",
        },
      }}
      contentProps={{
        style: {
          background: "rgba(255, 255, 255, 0.2)",
          maxWidth: "400px",
          margin: "0 auto",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
          padding: "20px",
        },
      }}
      title={
        <div style={{ textAlign: "center" }}>
          <h1 className="font-logo text-8xl text-white mb-8 drop-shadow-xl">
            Aurora
          </h1>
          <h2 className="text-[#001256]">Forgot Password</h2>
          <p className="text-[#001256]">
            Enter your email to receive a reset link
          </p>
        </div>
      }
    />
  );
}
