import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Login from "@/components/loginForm/LoginForm";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const email = cookieStore.get("user")?.value;

  if (email) {
    redirect("/dashboard");
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/bgimg2.jpg')" }}
    >
      <Login />
    </div>
  );
}