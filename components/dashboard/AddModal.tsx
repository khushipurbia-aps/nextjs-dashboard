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
import { DayPicker } from "react-day-picker"
import "react-day-picker/style.css";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "lucide-react";
import Select from "react-select";
import { useDayPicker } from "react-day-picker"

const categoryOptions = [
    { value: "Fiction", label: "Fiction" },
    { value: "Non-Fiction", label: "Non-Fiction" },
    { value: "Technology", label: "Technology" },
    { value: "Self-Help", label: "Self-Help" },
    { value: "Biography", label: "Biography" },
    { value: "History", label: "History" },
];

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
    const [publishedOn, setPublishedOn] = useState<Date | undefined>();

    const [categories, setCategories] = useState<any[]>([]);

    const [calendarOpen, setcalendarOpen] = useState(false);


    const resetForm = () => {
        setBookName("");
        setAuthor("");
        setPublishedOn(undefined);
        setCategories([])
    };

    useEffect(() => {
        if (bookToEdit) {
            setBookName(bookToEdit.bookName);
            setAuthor(bookToEdit.author);
            setPublishedOn(new Date(bookToEdit.publishedOn));
            // if (bookToEdit.categories) {
            setCategories(
                bookToEdit.categories.map((c: string) => ({
                    value: c,
                    label: c,
                }))
            );
            // }
        } else {
            resetForm();
        }
    }, [bookToEdit]);

    const dispatch = useDispatch<AppDispatch>();
    const isFormValid = bookName && author && categories.length > 0 && publishedOn

    const handleAdd = () => {

        const formattedCategories = categories.map((c) => c.value);


        if (!publishedOn) return;
        const formattedDate =
            `${publishedOn.getFullYear()}-
        ${String(publishedOn.getMonth() + 1).padStart(2, "0")}-
        ${String(publishedOn.getDate()).padStart(2, "0")}`;


        if (bookToEdit) {
            dispatch(updateBook({
                id: bookToEdit.id,
                bookName,
                author,
                publishedOn: formattedDate,
                categories: formattedCategories,
            }));
        }
        else dispatch(
            addBook({
                bookName,
                author,
                publishedOn: formattedDate,
                categories: formattedCategories,
            })
        );
        setOpen(false);
        resetForm();
    };
    type FooterProps = {
        setPublishedOn: (date: Date | undefined) => void;
    };
    function CalendarFooter({setPublishedOn }: FooterProps,
    ) {
        const { goToMonth } = useDayPicker();

        const handleToday = () => {
            const today = new Date();
            setPublishedOn(today);
            goToMonth(today);
        };

        return (
            <button
                className="text-sm text-blue-600 hover:underline"
                onClick={handleToday}
            >
                Today
            </button>
        );
    }

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
                        <Label>Book Category</Label>
                        <Select
                            isMulti
                            options={categoryOptions}
                            value={categories}
                            onChange={(selected) => setCategories(selected as any[])}
                        />
                    </div>

                    <div className="grid gap-1">
                        <Label htmlFor="publishedOn">Published On</Label>

                        <Popover open={calendarOpen} onOpenChange={setcalendarOpen} >
                            <PopoverTrigger asChild >
                                <Button variant="outline" className="justify-start font-normal">
                                    <Calendar />
                                    {publishedOn
                                        ? publishedOn.toLocaleDateString("en-GB")
                                        : "Pick a day"}
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent
                                align="start"
                                className="w-78 p-3">
                                <DayPicker
                                    animate
                                    mode="single"
                                    required
                                    selected={publishedOn}
                                    onSelect={(date) => {
                                        setPublishedOn(date);
                                        setcalendarOpen(false);
                                    }}
                                    footer={
                                        <CalendarFooter
                                            setPublishedOn={setPublishedOn}
                                        // setcalendarOpen={setcalendarOpen}
                                        />
                                    }
                                />
                            </PopoverContent>
                        </Popover>
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