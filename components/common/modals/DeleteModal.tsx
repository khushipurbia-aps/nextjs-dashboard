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
// import { Button } from "@/components/ui/button"
import ButtonWrapper from "../ButtonWrapper/ButtonWrapper";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteBook } from "@/app/store/bookSlice";
import { AppDispatch } from "@/app/store/store";
import { useRouter } from "next/navigation";
export default function Deletemodal({ id }: { id: number }) {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const handleDelete = () => {
        dispatch(deleteBook(id))
        router.push("/dashboard");
    }
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                {/* <Button className="mr-4" onClick={(e) => e.stopPropagation()}>
                    <Trash2 />
                </Button> */}
                <ButtonWrapper className="mr-4" onClick={(e) => e.stopPropagation()}>
                    <Trash2 />
                </ButtonWrapper>
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
                        {/* <Button variant="outline">No</Button> */}
                        <ButtonWrapper variant="outline">No</ButtonWrapper>
                    </DialogClose>

                    <DialogClose asChild>
                        {/* <Button
                            variant="destructive"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDelete()
                            }
                            }
                        >
                            Yes
                        </Button> */}
                        <ButtonWrapper
                            variant="destructive"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDelete()
                            }
                            }
                        >
                            Yes
                        </ButtonWrapper>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}