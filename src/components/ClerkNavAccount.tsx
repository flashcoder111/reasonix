"use client";

import Link from "next/link";
import { LogIn } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";

type ClerkNavAccountProps = {
  href: string;
  label: string;
};

export function ClerkNavAccount({ href, label }: ClerkNavAccountProps) {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <span className="inline-flex h-10 w-10 animate-pulse rounded-lg border border-emerald-100 bg-emerald-50" />
    );
  }

  if (isSignedIn) {
    return (
      <div className="inline-flex items-center rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1.5">
        <UserButton />
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 font-medium text-emerald-950 transition hover:border-emerald-300 hover:bg-emerald-100"
    >
      <LogIn className="h-4 w-4" aria-hidden="true" />
      {label}
    </Link>
  );
}

