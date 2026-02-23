"use client";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import { useDispatch } from "react-redux";
import { fetchBooks } from "@/app/store/bookSlice";
import { AppDispatch } from "@/app/store/store";

export default function ImportBooks() {
    const [parsedData, setParsedData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const dispatch = useDispatch<AppDispatch>();
    const requiredHeaders = ["bookName", "author", "categories", "publishedOn"];

    const handleFile = (file: File) => {
        setError(null);
        if (file.size > 2 * 1024 * 1024) {
            setError("File too large (Max 2MB)");
            return;
        }
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const headers = results.meta.fields;
                const isValidHeaders = requiredHeaders.every(h =>
                    headers?.includes(h)
                );
                if (!isValidHeaders) {
                    setError("Invalid headers. Required: bookName, author, categories, publishedOn");
                    return;
                }
                validateRows(results.data as any[]);
            },
        });
    };

    const validateRows = (rows: any[]) => {
        const today = new Date();
        for (let row of rows) {
            if (
                !row.bookName?.trim() ||
                !row.author?.trim() ||
                !row.categories?.trim() ||
                !row.publishedOn?.trim()
            ) {
                setError("Empty values are not allowed");
                return;
            }
            const parsedDate = new Date(row.publishedOn);
            if (isNaN(parsedDate.getTime())) {
                setError("Invalid date format in publishedOn");
                return;
            }
            if (parsedDate > today) {
                setError("Published date cannot be in the future");
                return;
            }
            row.categories = row.categories
                .split("|")
                .map((c: string) => c.trim());
        }
        setParsedData(rows);
        setShowConfirm(true);
    };

    const handleConfirmImport = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/books/import", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ books: parsedData }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Import failed");
            }
            alert("Books imported successfully");
            setShowConfirm(false);
            setParsedData([]);
            dispatch(fetchBooks({ page }));
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "text/csv": [".csv"]
        },
        multiple: false,
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) handleFile(file);
        }
    });

    return (
        <div className="space-y-4">

            <div
                {...getRootProps()}
                className="border-2 border-dashed p-6 text-center cursor-pointer rounded-lg"
            >
                <input {...getInputProps()} />
                <p>Drag & drop CSV here, or click to select</p>
            </div>

            {error && (
                <p className="text-red-500">{error}</p>
            )}

            {showConfirm && (
                <div className="p-4 border rounded-lg bg-gray-50">
                    <p className="mb-2">
                        {parsedData.length} books ready to import.
                    </p>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowConfirm(false)}
                            className="px-4 py-2 border rounded"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleConfirmImport}
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            {loading ? "Importing..." : "Confirm Import"}
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}