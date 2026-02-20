"use client"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import BooksTable from "./BooksTable";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";

import Addmodal from "./AddModal";
export default function DashboardCard() {
    const [open, setOpen] = useState(false);
    const params = useParams();
    const isDetailPage = params.id ? true : false;
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between ">
                    <CardTitle className="font-bold">Your Books</CardTitle>
                    {!isDetailPage && (
                        <Button onClick={() => setOpen(true)}>
                            Add Book
                        </Button>
                    )}
                </div>

                <Addmodal open={open} setOpen={setOpen} />
            </CardHeader>

            <CardContent>
                <BooksTable />
            </CardContent>
        </Card>

    );

}

