"use client";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { useParams } from "next/navigation";
import BooksTable from "@/components/dashboard/BooksTable";

export default function BookDetails() {
    const params = useParams();
    const id = Number(params.id);

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">
                    Following are your book details
                </h1>
            <Card className="max-w-5xl">
                <CardHeader>
                    <CardTitle className="font-bold">Your Book</CardTitle>
                </CardHeader>
                <CardContent>
                    <BooksTable bookId={id} />
                </CardContent>
            </Card>
        </div>
    )
}



// export default function DashboardCard(){
//     return (
//         <Card className="max-w-5xl">
//             <CardHeader>
//                 <CardTitle className="font-bold">Your Books</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <BooksTable />
//             </CardContent>
//         </Card>
//     );
// }

