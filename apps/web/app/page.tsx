"use client";

import { Hello } from "@repo/ui";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  console.log(
    "NEXT_PUBLIC_NEXTAUTH_SECRET",
    process.env.NEXT_PUBLIC_NEXTAUTH_SECRET
  );
  console.log("process.env", process.env);

  if (!session) {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <h2>You are not signed in</h2>
        <a href="/login">Go to Login</a>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h1>Welcome, {session.user?.name}</h1>
      <img
        src={session.user?.image ?? ""}
        alt="profile"
        width={80}
        height={80}
      />
      <p>{session.user?.email}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
