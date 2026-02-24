"use client";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import { useDispatch } from "react-redux";
import { fetchBooks } from "@/app/store/bookSlice";
import { AppDispatch } from "@/app/store/store";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert"
import { UploadCloud } from "lucide-react"
import Spinner from "./Spinner";


interface ImportBooksProps {
    open: boolean;
    setOpen: (val: boolean) => void;
    onSuccess: () => void;
}

export default function ImportBooks({ open, setOpen, onSuccess }: ImportBooksProps) {
    const [parsedData, setParsedData] = useState<any[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const requiredHeaders = ["bookName", "author", "categories", "publishedOn"];

    const resetState = () => {
        setParsedData([]);
        setSelectedFile(null);
        setError(null);
        setShowConfirm(false)
        setLoading(false)
    }

    useEffect(() => {
        if (!open) {
            resetState();
        }
    }, [open]);

    const handleFile = (file: File) => {
        resetState();
        setSelectedFile(file);
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
            dispatch(fetchBooks({ page: 1 }));
            setOpen(false)
            onSuccess()
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        resetState();
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
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
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent onInteractOutside={(e) => e.preventDefault()} className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Import Books from CSV</DialogTitle>
                </DialogHeader>


                <div className="space-y-6">
                    <Card
                        {...getRootProps()}
                        className={`border-2 border-dashed cursor-pointer transition-all duration-200 ${isDragActive ? "border-primary bg-primary/5" : "hover:border-primary/60"}`}>
                        <CardContent className="flex flex-col items-center justify-center p-10 text-center space-y-4">
                            <input {...getInputProps()} />
                            <UploadCloud className="w-10 h-10 text-muted-foreground" />
                            <div>
                                <p className="font-medium">
                                    Drag & drop your CSV file here
                                </p>
                                <p>
                                    or click to browse (Max 2MB)
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {selectedFile && (
                        <p className="text-sm text-muted-foreground">
                            Selected file: <span className="font-medium">{selectedFile.name}</span>
                        </p>
                    )}
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    {showConfirm && (
                        <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button onClick={handleConfirmImport} disabled={loading}>
                                {loading && <Spinner size={16} className="mr-2" />}
                                {loading ? "Importing..." : "Confirm Import"}
                            </Button>
                        </div>
                    )}
                </div>

            </DialogContent>
        </Dialog >
    );
}