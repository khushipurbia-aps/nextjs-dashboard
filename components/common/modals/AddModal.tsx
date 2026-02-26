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
import InputWrapper from "../InputWrapper"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateBook } from "@/app/store/bookSlice"
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { RootState } from "@/app/store/store";
import { addBook } from "@/app/store/bookSlice"
import { AppDispatch } from "@/app/store/store"
import Daypicker from "@/components/common/DayPicker"
import Reactselect from "@/components/common/ReactSelect"
import Spinner from "@/components/common/Spinner"

type CategoryOption = { value: string; label: string };
interface AddModalProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    bookToEditId?: number | null
    onSuccess: () => void;
}

export default function Addmodal({ open, setOpen, bookToEditId, onSuccess }: AddModalProps) {
    const [loading, setLoading] = useState(false);
    const bookToEdit = useSelector((state: RootState) => {
        if (!bookToEditId) return null;
        return state.books.booksList?.find(
            (b) => b?.id === bookToEditId
        ) || null;
    });

    const [formData, setFormData] = useState({
        bookName: "",
        author: "",
        publishedOn: undefined as Date | undefined,
        categories: [] as CategoryOption[],
    });

    const resetForm = () => setFormData({
        bookName: "",
        author: "",
        publishedOn: undefined,
        categories: [],
    });

    useEffect(() => {
        if (bookToEdit) {
            setFormData({
                bookName: bookToEdit.bookName,
                author: bookToEdit.author,
                publishedOn: new Date(bookToEdit.publishedOn),
                categories: bookToEdit.categories.map((c: string) => ({ value: c, label: c })),
            });
        } else {
            resetForm();
        }
    }, [bookToEdit]);

    const dispatch = useDispatch<AppDispatch>();
    const isFormValid = formData.bookName && formData.author && formData.categories.length > 0 && formData.publishedOn

    const handleAdd = async () => {
        if (!isFormValid || loading) return;
        setLoading(true);

        try {
            const formattedCategories = formData.categories.map((c) => c.value);
            if (!formData.publishedOn) return;

            const formattedDate =
                `${formData.publishedOn.getFullYear()}-${String(
                    formData.publishedOn.getMonth() + 1
                ).padStart(2, "0")}-${String(
                    formData.publishedOn.getDate()
                ).padStart(2, "0")}`;

            if (bookToEdit) {
                await dispatch(updateBook({
                    id: bookToEdit.id,
                    bookName: formData.bookName,
                    author: formData.author,
                    publishedOn: formattedDate,
                    categories: formattedCategories,
                })).unwrap();
            } else {
                await dispatch(addBook({
                    bookName: formData.bookName,
                    author: formData.author,
                    publishedOn: formattedDate,
                    categories: formattedCategories,
                })).unwrap();
            }

            setOpen(false);
            resetForm();
            onSuccess();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={(value) => {
            setOpen(value);
            if (!value) {
                resetForm();
            }
        }}>
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
                        {/* <Input
                            id="bookName"
                            value={formData.bookName}
                            onChange={(e) => { setFormData(prev => ({ ...prev, bookName: e.target.value })) }}
                        /> */}
                        <InputWrapper
                            id="bookName"
                            value={formData.bookName}
                            onChange={(e) => { setFormData(prev => ({ ...prev, bookName: e.target.value })) }}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="author">Author</Label>
                        {/* <Input
                            id="author"
                            value={formData.author}
                            onChange={(e) => { setFormData(prev => ({ ...prev, author: e.target.value })) }} /> */}
                        <InputWrapper
                            id="author"
                            value={formData.author}
                            onChange={(e) => { setFormData(prev => ({ ...prev, author: e.target.value })) }}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label>Book Category</Label>
                        <Reactselect categories={formData.categories} setCategories={(newCategories) =>
                            setFormData(prev => ({ ...prev, categories: newCategories }))
                        } />
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="publishedOn">Published On</Label>
                        <Daypicker publishedOn={formData.publishedOn}
                            setPublishedOn={(date) =>
                                setFormData(prev => ({ ...prev, publishedOn: date }))} />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button
                        onClick={handleAdd}
                        disabled={!isFormValid || loading}
                        className="min-w-25"
                    >
                        {loading && <Spinner size={16} className="mr-2" />}

                        {loading
                            ? bookToEdit
                                ? "Saving..."
                                : "Adding..."
                            : bookToEdit
                                ? "Save"
                                : "Add"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}