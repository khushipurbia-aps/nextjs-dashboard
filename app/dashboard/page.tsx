"use client";

import Header from "@/components/dashboard/Header"
import DashboardCard from "@/components/dashboard/DashboardCard"


export default function dashboard() {
    return (
        <div className="p-6 space-y-6">
            <Header/>
            <DashboardCard/>
        </div>
    )
}