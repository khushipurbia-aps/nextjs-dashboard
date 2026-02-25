"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { fetchBooks } from "@/app/store/bookSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";

interface ImportSuccessModalProps {
    open: boolean;
    setOpen: (val: boolean) => void;
    // onConfirm?: () => void;
}

export default function SuccessModal({
    open,
    setOpen,
    // onConfirm,
}: ImportSuccessModalProps) {
    const dispatch = useDispatch<AppDispatch>();

    const handleOk = () => {
        // onConfirm?.();
        dispatch(fetchBooks({ page: 1 })); 
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                onInteractOutside={(e) => e.preventDefault()}
                className="max-w-sm text-center space-y-6"
            >
                <DialogHeader>
                    <DialogTitle>Success</DialogTitle>
                </DialogHeader>

                <p className="text-muted-foreground">
                    Operation completed successfully.
                </p>

                <div className="flex justify-center">
                    <Button onClick={handleOk}>
                        OK
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}