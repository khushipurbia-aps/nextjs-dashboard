"use client"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import BooksTable from "./BooksTable";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";

import Addmodal from "./AddModal";
import Importbooks from "./ImportBooks";
import SuccessModal from "./SuccessModal";

export default function DashboardCard() {
    const [addOpen, setAddOpen] = useState(false);
    const [importOpen, setImportOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const params = useParams();
    const isDetailPage = params.id ? true : false;
    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="font-bold text-xl">Your Books</CardTitle>
                        {!isDetailPage && (
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={() => setImportOpen(true)}>
                                    Import CSV
                                </Button>
                                <Button onClick={() => setAddOpen(true)}>
                                    Add Book
                                </Button>
                            </div>

                        )}
                    </div>
                </CardHeader>

                <CardContent>
                    <BooksTable />
                </CardContent>
            </Card>


            <Addmodal open={addOpen} setOpen={setAddOpen} />
            <Importbooks open={importOpen} setOpen={setImportOpen} onSuccess={() => setSuccessOpen(true)} />
            <SuccessModal open={successOpen} setOpen={setSuccessOpen}/>

        </>

    );

}

