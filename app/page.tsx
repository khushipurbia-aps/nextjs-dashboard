import Login from "@/components/home/loginform";

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage:
          "url('/bgimg2.jpg')",
      }}
    >
      <Login/>
      
    </div>

  );
}

