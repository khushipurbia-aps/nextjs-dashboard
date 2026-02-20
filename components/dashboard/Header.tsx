"use client";
import Timer from "./Timer";
import { Button } from "../ui/button";
import {useEffect } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { userCookie } from "@/app/store/authSlice";

export default function Header() {

    const username = useSelector((state: RootState) => state.auth.username);
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    
    useEffect(() => {
        dispatch(userCookie());
    }, []);

    const handleLogout = () => {
        document.cookie = "user=; max-age=0";
        router.push("/");
    };

    return (
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                    Hi {username}, Welcome to your Dashboard
                </h1>
                {/* <Timer /> */}
                <Button onClick={handleLogout} >
                    Logout
                </Button>
            </div>
    );
}