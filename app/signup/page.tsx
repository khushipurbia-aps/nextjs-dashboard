"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
import ButtonWrapper from "@/components/common/ButtonWrapper";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import InputWrapper from "@/components/common/InputWrapper";
export default function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const router = useRouter()
    //for client-side
    useEffect(() => {
        if (typeof window !== "undefined") {
            const hasUser = document.cookie.includes("user=");
            if (hasUser) {
                router.push("/dashboard");
            }
        }
    }, []);

    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    const isFormValid = email != "" && password != "" && isEmailValid
    const handleSignup = async () => {
        const res = await fetch("/api/auth/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "appliation/json"
                },
                body: JSON.stringify({ email, password })
            })
        const data = await res.json();
        if (!res.ok) {
            setError(data.message)
            setSuccess("")
            return;
        }
        setError("")
        setSuccess("Account created successfully! Redirecting to login...")
        setTimeout(() => {
            router.push("/");
        }, 1500);
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
            style={{
                backgroundImage:
                    "url('/bgimg2.jpg')",
            }}
        >
            <Card className="w-full max-w-sm ">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Create your account</CardTitle>
                    <CardDescription>
                        Enter your details below to create an account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form className="space-y-6"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSignup();
                        }
                        }>
                        {error && (
                            <p className="text-red-500 text-sm">
                                {error}
                            </p>
                        )}
                        {success && (
                            <p className="text-green-600 text-sm text-center">
                                {success}
                            </p>
                        )}
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                {/* <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setError("");
                                    }}
                                    className={email != "" && !isEmailValid ? "border-red-600" : ""}
                                /> */}
                                <InputWrapper
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setError("");
                                    }}
                                    error={email !== "" && !isEmailValid}
                                />
                                {email != "" && !isEmailValid && (
                                    <p className="text-red-500 text-sm">Enter a valid Email</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                {/* <Input
                                    id="password"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                /> */}
                                <InputWrapper
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                            </div>
                        </div>

                        {/* <Button
                            type="submit"
                            className="w-full"
                            disabled={!isFormValid}
                        >
                            Sign Up
                        </Button> */}
                        <ButtonWrapper
                            type="submit"
                            className="w-full"
                            disabled={!isFormValid}
                        >
                            Sign Up
                        </ButtonWrapper>
                    </form>
                </CardContent>
                <p className="text-center text-sm">
                    Already have an account?{" "}
                    <button type="button" className="text-blue-600 hover:underline cursor-pointer"
                        onClick={() => router.push("/")}>
                        Login
                    </button>
                    
                </p>
            </Card>
        </div>
    );
}