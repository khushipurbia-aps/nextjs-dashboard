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
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { Edit2 } from "lucide-react";

interface BookType {
    id: number;
    bookName: string;
    author: string;
    publishedOn: string;
}



export default function BooksTable() {
    const [open, setOpen] = useState(false)

    const [bookToEditId, setBookToEditId] = useState<number | null>(null);

    
    // const books = useSelector((state: RootState) => state.books.booksList)

    const [books, setBooks] = useState<BookType[]>([]);
    useEffect(() => {
        const fetchBooks = async () => {
                const res = await fetch("/api/books");
                const data: BookType[] = await res.json();
                setBooks(data);
        };
        fetchBooks();
    }, []);


    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Book Name</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Published On</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {books.map((book, index) => (
                        <TableRow key={book.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{book.bookName}</TableCell>
                            <TableCell>{book.author}</TableCell>
                            <TableCell> {new Date(book.publishedOn).toLocaleDateString("en-GB")}</TableCell>
                            <TableCell>
                                <Deletemodal id={book.id} />
                                <Button
                                    onClick={() => {
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