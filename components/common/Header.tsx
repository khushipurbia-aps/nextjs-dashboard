"use client";
import Timer from "./Timer";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
  username: string;
}

export default function Header({ username }: Props) {
   const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">
        Hi {username}, Welcome to your Dashboard
      </h1>
      <Button onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}