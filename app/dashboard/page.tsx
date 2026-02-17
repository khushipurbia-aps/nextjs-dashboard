
import Header from "@/components/dashboard/Header"
import DashboardCard from "@/components/dashboard/DashboardCard"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function dashboard() {
    const cookiestore = await cookies();
    const user = cookiestore.get("user");
    if(!user){
        redirect("/")
    }
    return (
        <div className="p-6 space-y-6">
            <Header/>
            <DashboardCard/>
        </div>
    )
}
