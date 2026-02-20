"use client";

import { Button } from "../ui/button";
import { useState } from "react";
import { AppDispatch } from "@/app/store/store";
import { useDispatch } from "react-redux";
import { fetchBooks } from "@/app/store/bookSlice";
import Select from "react-select";
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Daypicker from "./DayPicker";
const categoryOptions = [
    { value: "Fiction", label: "Fiction" },
    { value: "Non-Fiction", label: "Non-Fiction" },
    { value: "Technology", label: "Technology" },
    { value: "Self-Help", label: "Self-Help" },
    { value: "Biography", label: "Biography" },
    { value: "History", label: "History" },
];
export default function Filtermodal() {
    const [publishedOn, setPublishedOn] = useState<Date | undefined>(undefined);
    const [name, setName] = useState("");
    const [categories, setCategories] = useState<any[]>([]);

    const dispatch = useDispatch<AppDispatch>();

    const handleFilter = () => {
        const formattedDate = publishedOn
            ? publishedOn.toISOString().split("T")[0]
            : undefined;

        dispatch(fetchBooks({ publishedOn: formattedDate, name, categories: categories.map(c => c.value), }));
    };

    const handleClear = () => {
        setPublishedOn(undefined);
        setName("")
        setCategories([])
        dispatch(fetchBooks({}));
    };


    return (
        <Card className="shadow-sm rounded-xl max-w-5xl">
            <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">

                    <div className="space-y-1">
                        <Label>Select Date</Label>
                        <Daypicker publishedOn={publishedOn} setPublishedOn={setPublishedOn} />
                    </div>

                    <div className="space-y-1">
                        <Label>Search</Label>
                        <Input
                            placeholder="Search by Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1">
                        <Label>Book Category</Label>
                        <Select
                            isMulti
                            options={categoryOptions}
                            value={categories}
                            onChange={(selected) => setCategories(selected as any[])}
                        />
                    </div>

                    <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={handleClear}>
                            Clear
                        </Button>
                        <Button onClick={handleFilter}>
                            Apply
                        </Button>
                    </div>

                </div>
            </CardContent>
        </Card>
    );
}