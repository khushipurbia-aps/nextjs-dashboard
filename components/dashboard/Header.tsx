"use client";

import Addmodal from "./AddModal";
import Timer from "./Timer";
import { Button } from "../ui/button";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useParams } from "next/navigation";

export default function Header() {
    const [open, setOpen] = useState(false);
    const username = useSelector((state: RootState) => state.auth.username);

    const params = useParams();
    const isDetailPage = params.id ? true : false;

    return (
        <div className="space-y-6 relative">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                    Hi {username}, Welcome to your Dashboard
                </h1>
                <Timer />
            </div>
            {/* <Button onClick={() => setOpen(true)}>Add Book</Button> */}
            {!isDetailPage && (
                <Button onClick={() => setOpen(true)}>
                    Add Book
                </Button>
            )}

            <Addmodal open={open} setOpen={setOpen} />
        </div>

    );
}