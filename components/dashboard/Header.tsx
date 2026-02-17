"use client";

import Addmodal from "./AddModal";
import Timer from "./Timer";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { userCookie } from "@/app/store/authSlice";

export default function Header() {
    const [open, setOpen] = useState(false);
    const username = useSelector((state: RootState) => state.auth.username);

    const params = useParams();
    const isDetailPage = params.id ? true : false;

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
        <div className="space-y-6 relative">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                    Hi {username}, Welcome to your Dashboard
                </h1>
                <Timer />
            </div>
            <div className="flex justify-between ">
                
            
            {!isDetailPage && (
                <Button onClick={() => setOpen(true)}>
                    Add Book
                </Button>
            )}

            <Button onClick={handleLogout} >
                    Logout
                </Button>
            </div>

            <Addmodal open={open} setOpen={setOpen} />
        </div>

    );
}