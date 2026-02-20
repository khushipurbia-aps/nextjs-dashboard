"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    const isFormValid = email!="" && password!="" && isEmailValid
    const handleLogin = () => {
        document.cookie = `user=${email}`;
        router.push("/dashboard");
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
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                                className={ email!="" && !isEmailValid ? "border-red-600" : ""}
                            />
                            {email!="" && !isEmailValid && (
                                <p className="text-red-500 text-sm">Enter a valid Email</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={!isFormValid}
                    >
                        Login
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}