"use client";
import { Book } from "@/app/store/bookSlice";

import { useState } from "react";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

export default function ExportButton() {
  const [loading, setLoading] = useState(false);
  const filters = useSelector((state: RootState) => state.books.filters);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const fetchAllBooks = async () => {
    let allBooks: Book[] = [];
    const params = new URLSearchParams();

    if (filters?.publishedOn)
      params.append("publishedOn", filters.publishedOn)

    if (filters?.name)
      params.append("name", filters.name)

    if (filters?.categories?.length) {
      filters.categories.forEach((c: string) => {
        params.append("categories", c)
      })
    }

    const firstRes = await fetch(`/api/books?page=1&${params.toString()}`);
    const firstData = await firstRes.json();

    allBooks = firstData.books;
    const totalPages = firstData.totalPages;

    for (let page = 2; page <= totalPages; page++) {
      const res = await fetch(`/api/books?page=${page}&${params.toString()}`);
      const data = await res.json();
      allBooks = [...allBooks, ...data.books];
    }

    return allBooks;
  };

  const handleExport = async () => {
    if (loading) return;
    setLoading(true);
    toast.loading("Exporting books...", { id: "export" });

    try {
      const books = await fetchAllBooks();

      const formattedData = books.map((book) => ({
        bookName: book.bookName,
        author: book.author,
        categories: book.categories.join("|"),
        publishedOn: formatDate(book.publishedOn),
      }));

      const csv = Papa.unparse(formattedData);

      const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;",
      });

      saveAs(blob, "books_export.csv");

      toast.success("Books exported successfully!", { id: "export" });
    } catch (error) {
      toast.error("Export failed", { id: "export" });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleExport} disabled={loading}>
      {loading ? "Exporting..." : "Export"}
    </Button>
  );
}