"use client";

import { useState } from "react";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ExportButton() {
  const [loading, setLoading] = useState(false);
  const formatDate = (dateString: string) =>
    new Date(dateString)
      .toLocaleDateString("en-GB")
      .split("/")
      .join("-");

  const fetchAllBooks = async () => {
    let allBooks: any[] = [];

    const firstRes = await fetch(`/api/books?page=1`);
    const firstData = await firstRes.json();

    allBooks = firstData.books;
    const totalPages = firstData.totalPages;

    for (let page = 2; page <= totalPages; page++) {
      const res = await fetch(`/api/books?page=${page}`);
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