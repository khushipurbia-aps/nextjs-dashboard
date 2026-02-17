"use client";

import Login from "@/components/home/loginform";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();


  //for client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasUser = document.cookie.includes("user=");

      if (hasUser) {
        router.push("/dashboard");
      }
    }
  }, []);


  // const cookiestore = await cookies();
  // const user = cookiestore.get("user");
  // // console.log(user)
  // if(user){
  //   redirect("/dashboard");
  // }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage:
          "url('/bgimg2.jpg')",
      }}
    >
      <Login />

    </div>

  );
}

