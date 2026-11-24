"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button className="dashboard-signout" onClick={() => signOut({ callbackUrl: "/" })}>
      ออกจากระบบ
    </button>
  );
}
