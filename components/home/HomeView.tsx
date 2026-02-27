"use client"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import BooksTable from "../common/table/BooksTable";
import { useParams } from "next/navigation";
// import { Button } from "@/components/ui/button";
import ButtonWrapper from "../common/ButtonWrapper";
import { useState } from "react";

import Addmodal from "../common/modals/AddModal";
import Importbooks from "../common/modals/ImportBooksModal";
import ExportButton from "../common/ExportButton";
import SuccessModal from "../common/modals/SuccessModal";
import { Toaster } from "sonner";

export default function DashboardCard() {
    const [addOpen, setAddOpen] = useState(false);
    const [editBookId, setEditBookId] = useState<number | null>(null);
    const [importOpen, setImportOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const params = useParams();
    const isDetailPage = params.id ? true : false;
    return (
        <>
            <Toaster position="top-center" />
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="font-bold text-xl">Your Books</CardTitle>
                        {!isDetailPage && (
                            <div className="flex gap-2">
                                {/* <Button variant="outline" onClick={() => setImportOpen(true)}>
                                    Import CSV
                                </Button> */}
                                <ButtonWrapper variant="outline" onClick={() => setImportOpen(true)}>
                                    Import CSV
                                </ButtonWrapper>
                                <ExportButton />
                                {/* <Button onClick={() => setAddOpen(true)}>
                                    Add Book
                                </Button> */}
                                <ButtonWrapper onClick={() => setAddOpen(true)}>
                                    Add Book
                                </ButtonWrapper>
                            </div>

                        )}
                    </div>
                </CardHeader>

                <CardContent>
                    <BooksTable
                        onEdit={(id) => {
                            setEditBookId(id);
                            setAddOpen(true);
                        }}
                    />
                </CardContent>
            </Card>

            <Addmodal
                open={addOpen}
                setOpen={(value) => {
                    setAddOpen(value);
                    if (!value) setEditBookId(null);
                }}
                bookToEditId={editBookId}
                onSuccess={() => {
                    if (!editBookId) setSuccessOpen(true);

                }}
            />
            <Importbooks open={importOpen} setOpen={setImportOpen}
                onSuccess={() => setSuccessOpen(true)}
            />
            <SuccessModal open={successOpen} setOpen={setSuccessOpen} />

        </>

    );

}

