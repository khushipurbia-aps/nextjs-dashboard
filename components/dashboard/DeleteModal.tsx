"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBook } from "@/app/store/bookSlice";

export default function Deletemodal({ id }: { id: number }) {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteBook(id))
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="mr-4">
                    <Trash2 />
                </Button>
            </DialogTrigger>
            <DialogContent onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this book?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">No</Button>
                    </DialogClose>

                    <DialogClose asChild>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleDelete}
                        >
                            Yes
                        </Button>
                        </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}