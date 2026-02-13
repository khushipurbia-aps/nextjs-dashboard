import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateBook } from "@/app/store/bookSlice"
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { RootState } from "@/app/store/store";
import { addBook } from "@/app/store/bookSlice"
import { AppDispatch } from "@/app/store/store"

interface AddModalProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    bookToEditId?: number | null
}

export default function Addmodal({ open, setOpen, bookToEditId }: AddModalProps) {
    const bookToEdit = useSelector((state: RootState) => {
    if (!bookToEditId) return null;

    return state.books.booksList?.find(
        (b) => b?.id === bookToEditId
    ) || null;
});


    const [bookName, setBookName] = useState("");
    const [author, setAuthor] = useState("");
    const [publishedOn, setPublishedOn] = useState("");

    useEffect(() => {
        if (bookToEdit) {
            setBookName(bookToEdit.bookName);
            setAuthor(bookToEdit.author);
            setPublishedOn(bookToEdit.publishedOn);
        } else {
            setBookName("");
            setAuthor("");
            setPublishedOn("");
        }
    }, [bookToEdit]);

    const dispatch = useDispatch<AppDispatch>();
    const isFormValid = bookName && author && publishedOn

    // const handleAdd = () => {
    //     if (!isFormValid) return;
    //     if (bookToEdit) {
    //         dispatch(updateBook({
    //             id: bookToEdit.id,
    //             bookName,
    //             author,
    //             publishedOn
    //         }));
    //     }
    //     else dispatch(addBook({
    //         bookName,
    //         author,
    //         publishedOn
    //     }));
    //     setBookName("");
    //     setAuthor("");
    //     setPublishedOn("");
    //     setOpen(false);
    // }

    const handleAdd = () => {
        if (bookToEdit) {
            dispatch(updateBook({
                id: bookToEdit.id,
                bookName,
                author,
                publishedOn
            }));
        }
        else dispatch(
            addBook({
                bookName,
                author,
                publishedOn,
            })
        );
        setBookName("");
        setAuthor("");
        setPublishedOn("");
        setOpen(false)
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>{bookToEdit ? "Edit Book" : "Add Book"}</DialogTitle>
                    <DialogDescription>
                        {bookToEdit ? "Update the book details below" : "Fill in the book details below"}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-1">
                        <Label htmlFor="bookName">Book Name</Label>
                        <Input
                            id="bookName"
                            value={bookName}
                            onChange={(e) => { setBookName(e.target.value) }} />
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="author">Author</Label>
                        <Input
                            id="author"
                            value={author}
                            onChange={(e) => { setAuthor(e.target.value) }} />
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="publishedOn">Published On</Label>
                        <Input id="publishedOn"
                            type="date"
                            value={publishedOn}
                            onChange={(e) => { setPublishedOn(e.target.value) }} />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleAdd} disabled={!isFormValid}>
                        {bookToEdit ? "Save" : "Add"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}