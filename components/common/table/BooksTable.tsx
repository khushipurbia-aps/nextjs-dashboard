"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Deletemodal from "../../common/modals/DeleteModal";
import Addmodal from "../../common/modals/AddModal";
import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
import ButtonWrapper from "../ButtonWrapper";
import { useSelector, useDispatch } from "react-redux";
import { Edit2 } from "lucide-react";
import { RootState, AppDispatch } from "@/app/store/store";
import { fetchBooks } from "@/app/store/bookSlice";
import { useRouter } from "next/navigation";
import { ChevronUp, ChevronDown } from "lucide-react";
import Spinner from "@/components/common/Spinner";

type Props = {
    bookId?: number;
    onEdit?: (id: number) => void;
};

export default function BooksTable({ bookId, onEdit }: Props) {
    const [open, setOpen] = useState(false)
    const [bookToEditId, setBookToEditId] = useState<number | null>(null);

    const dispatch = useDispatch<AppDispatch>();
    const [successOpen, setSuccessOpen] = useState(false);

    const allBooks = useSelector(
        (state: RootState) => state.books.booksList
    );

    const books = bookId
        ? allBooks.filter((b) => b.id === bookId)
        : allBooks;

    const loading = useSelector(
        (state: RootState) => state.books.loading
    );

    //Pagination
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState<"bookName" | "publishedOn" | undefined>(undefined);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const totalPages = useSelector(
        (state: RootState) => state.books.totalPages
    );
    const filters = useSelector((state: RootState) => state.books.filters);
    useEffect(() => {
        if (!bookId) {
            dispatch(fetchBooks({ page, ...filters, sortBy, sortOrder }));
        }
    }, [dispatch, page, filters, sortBy, sortOrder]);

    useEffect(() => {
        setPage(1)
    }, [filters])

    const router = useRouter();
    const handleClick = (id: number) => {
        router.push(`/dashboard/${id}`);
    };

    const handleSort = (field: "bookName" | "publishedOn", order: "asc" | "desc") => {
        setSortBy(field);
        setSortOrder(order);
        setPage(1);
    };



    return (
        <>
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <Spinner size={30} />
                    <span className="mt-3 text-muted-foreground">
                        Loading books...
                    </span>
                </div>
            ) : (
                <>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead className="flex flex-row">
                                    Book Name
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

                                <TableHead className="flex flex-row">
                                    Published On
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
                                    key={book.id}
                                    onClick={() => {
                                        if (!bookId) handleClick(book.id);
                                    }}
                                >
                                    <TableCell>
                                        {(page - 1) * 10 + index + 1}
                                    </TableCell>

                                    <TableCell>{book.bookName}</TableCell>
                                    <TableCell>{book.author}</TableCell>
                                    <TableCell>
                                        {book.categories.join(", ")}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(book.publishedOn).toLocaleDateString("en-GB")}
                                    </TableCell>

                                    <TableCell>
                                        <Deletemodal id={book.id} />
                                        {/* <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onEdit?.(book.id);
                                            }}
                                        >
                                            <Edit2 />
                                        </Button> */}
                                        <ButtonWrapper
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onEdit?.(book.id);
                                            }}
                                        >
                                            <Edit2 />
                                        </ButtonWrapper>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {!bookId && (
                        <div className="flex justify-between mt-4">
                            {/* <Button
                                disabled={page === 1}
                                onClick={() => setPage(prev => prev - 1)}
                            >
                                &lt; Previous
                            </Button> */}
                            <ButtonWrapper
                                disabled={page === 1}
                                onClick={() => setPage(prev => prev - 1)}
                            >
                                &lt; Previous
                            </ButtonWrapper>

                            <span>
                                Page {page} of {totalPages}
                            </span>

                            {/* <Button
                                disabled={page === totalPages}
                                onClick={() => setPage(prev => prev + 1)}
                            >
                                Next &gt;
                            </Button> */}
                            <ButtonWrapper
                                disabled={page === totalPages}
                                onClick={() => setPage(prev => prev + 1)}
                            >
                                Next &gt;
                            </ButtonWrapper>
                            
                        </div>
                    )}
                </>
            )}

            <Addmodal
                open={open}
                setOpen={setOpen}
                bookToEditId={bookToEditId}
                onSuccess={() => setSuccessOpen(true)}
            />
        </>
    );
}