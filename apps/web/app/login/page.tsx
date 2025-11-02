"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 100,
      }}
    >
      <h1>Login to Fit Genie</h1>
      <button
        onClick={() => signIn("google")}
        style={{ marginTop: 20, padding: "10px 20px", cursor: "pointer" }}
      >
        Sign in with Google
      </button>
      <button
        onClick={() => signIn("facebook")}
        style={{ marginTop: 20, padding: "10px 20px", cursor: "pointer" }}
      >
        Sign in with Facebook
      </button>
    </div>
  );
}
