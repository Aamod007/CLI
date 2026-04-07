"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    if (!isPending && (!data?.session || !data?.user)) {
      router.push("/sign-in");
    }
  }, [data, isPending, router]);

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-zinc-400">Loading profile...</p>
      </div>
    );
  }

  if (!data?.session || !data?.user) {
    return null;
  }

  const user = data.user;

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await authClient.signOut();
      router.push("/sign-in");
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-950/70">
        <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
          <Image
            src={user.image || "/login.png"}
            alt={user.name || "User profile"}
            width={96}
            height={96}
            className="rounded-full object-cover"
          />
          <h1 className="text-2xl font-bold text-indigo-400">
            Welcome {user.name || "User"}
          </h1>
          <p className="text-sm text-zinc-400">{user.email}</p>
          <Button
            type="button"
            variant="outline"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="mt-2 w-full"
          >
            {isSigningOut ? "Signing out..." : "Sign out"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
