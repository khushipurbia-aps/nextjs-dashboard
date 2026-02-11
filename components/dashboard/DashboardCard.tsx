import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import BooksTable from "./BooksTable";
export default function DashboardCard(){
    return (
        <Card className="max-w-5xl">
            <CardHeader>
                <CardTitle className="font-bold">Your Books</CardTitle>
            </CardHeader>
            <CardContent>
                <BooksTable />
            </CardContent>
        </Card>
    );
}

