"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar({
  hasPageLinks = true,
}: {
  hasPageLinks?: boolean;
}) {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: hasPageLinks ? "space-between" : "flex-end",
        padding: "10px 20px",
        background: "#f7f7f7",
        borderBottom: "1px solid #ddd",
      }}
    >
      {hasPageLinks && (
        <div style={{ display: "flex", gap: "20px" }}>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/profile">Profile</Link>
        </div>
      )}
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        style={{
          background: "#ff5555",
          color: "white",
          border: "none",
          padding: "6px 12px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </nav>
  );
}
