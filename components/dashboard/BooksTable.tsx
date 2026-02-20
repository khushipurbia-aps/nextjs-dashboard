"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Deletemodal from "./DeleteModal";
import Addmodal from "./AddModal";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useSelector, useDispatch } from "react-redux";
import { Edit2 } from "lucide-react";
import { RootState, AppDispatch } from "@/app/store/store";
import { fetchBooks } from "@/app/store/bookSlice";
import { useRouter } from "next/navigation";
import { ChevronUp, ChevronDown } from "lucide-react";

type Props = {
    bookId?: number;
};

export default function BooksTable({ bookId }: Props) {
    const [open, setOpen] = useState(false)
    const [bookToEditId, setBookToEditId] = useState<number | null>(null);
    const dispatch = useDispatch<AppDispatch>();

    const allBooks = useSelector(
        (state: RootState) => state.books.booksList
    );

    const books = bookId
        ? allBooks.filter((b) => b.id === bookId)
        : allBooks;

    useEffect(() => {
        dispatch(fetchBooks({}));
    }, [dispatch]);

    const router = useRouter();
    const handleClick = (id: number) => {
        router.push(`/dashboard/${id}`);
    };

    const [sortBy, setSortBy] = useState<"bookName" | "publishedOn" | undefined>(undefined);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const handleSort = (field: "bookName" | "publishedOn", order: "asc" | "desc") => {
        setSortBy(field);
        setSortOrder(order);

        dispatch(fetchBooks({
            sortBy: field,
            sortOrder: order,
        }));
    };

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead className="flex flex-row">Book Name
                            <div>
                                <ChevronUp
                                    className="w-5 h-3"
                                    onClick={() => handleSort("bookName", "asc")}
                                />
                                <ChevronDown
                                    className="w-5 h-3"
                                    onClick={() => handleSort("bookName", "desc")}
                                />

                            </div>
                        </TableHead>

                        <TableHead>Author</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="flex flex-row">Published On
                            <div>
                                <ChevronUp
                                    className="w-5 h-3"
                                    onClick={() => handleSort("publishedOn", "asc")}
                                />
                                <ChevronDown
                                    className="w-5 h-3"
                                    onClick={() => handleSort("publishedOn", "desc")}
                                />
                            </div>

                        </TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {books.map((book, index) => (
                        <TableRow
                            onClick={() => {
                                if (!bookId) handleClick(book.id);
                            }}
                            key={book.id}>
                        
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{book.bookName}</TableCell>
                            <TableCell>{book.author}</TableCell>
                            <TableCell>
                                {book.categories.join(", ")}
                            </TableCell>
                            <TableCell> {new Date(book.publishedOn).toLocaleDateString("en-GB")}</TableCell>
                            <TableCell>
                                <Deletemodal id={book.id} />
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setBookToEditId(book.id);
                                        setOpen(true);
                                    }}
                                >
                                    <Edit2 />
                                </Button>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table >
            <Addmodal open={open} setOpen={setOpen} bookToEditId={bookToEditId} />
        </>

    );
}