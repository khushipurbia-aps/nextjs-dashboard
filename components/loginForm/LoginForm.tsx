"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction, CardFooter } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
import ButtonWrapper from "../common/ButtonWrapper";
// import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputWrapper from "../common/InputWrapper";
export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    const isFormValid = email != "" && password != "" && isEmailValid
    const handleLogin = async () => {
        const res = await fetch("/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })

        const data = await res.json();
        if (!res.ok) {
            setError(data.message)
            return;
        }
        setError("")
        router.replace("/dashboard");
    }

    return (
        <Card className="w-full max-w-sm ">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Login to your account</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form className="space-y-6"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }
                    }>
                    {error && (
                        <p className="text-red-500 text-sm">
                            {error}
                        </p>
                    )}
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            {/* <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                onChange={(e) => {setEmail(e.target.value), 
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
                                onChange={(e) => {
                                    setPassword(e.target.value),
                                        setError("");
                                }}
                            /> */}
                            <InputWrapper
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError("");
                                }}
                            />
                        </div>
                    </div>
                    {/* <Button
                        type="submit"
                        className="w-full"
                        disabled={!isFormValid}
                    >
                        Login
                    </Button> */}
                    <ButtonWrapper
                        type="submit"
                        className="w-full"
                        disabled={!isFormValid}
                    >
                        Login
                    </ButtonWrapper>
                </form>
            </CardContent>
            <p className="text-center text-sm">
                Don't have an account?{" "}
                <button type="button" className="text-blue-600 hover:underline cursor-pointer"
                    onClick={() => router.push("/signup")}>
                    Sign Up
                </button>
            </p>
        </Card>
    );
}