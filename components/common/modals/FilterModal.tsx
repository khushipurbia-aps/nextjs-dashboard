"use client";

// import { Button } from "@/components/ui/button";
import ButtonWrapper from "../ButtonWrapper";
import { useState } from "react";
import { AppDispatch } from "@/app/store/store";
import { useDispatch } from "react-redux";
import { fetchBooks, setFilters } from "@/app/store/bookSlice";
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
// import { Input } from "@/components/ui/input" 
import InputWrapper from "../InputWrapper";
import Daypicker from "@/components/common/DayPicker";
import Reactselect from "@/components/common/ReactSelect";

export default function Filtermodal() {
    const [publishedOn, setPublishedOn] = useState<Date | undefined>(undefined);
    const [name, setName] = useState("");
    const [categories, setCategories] = useState<any[]>([]);

    const dispatch = useDispatch<AppDispatch>();

    const handleFilter = () => {
        const formattedDate = publishedOn ?
            `${publishedOn.getFullYear()}-
            ${String(publishedOn.getMonth() + 1).padStart(2, "0")}-
            ${String(publishedOn.getDate()).padStart(2, "0")}`
            : undefined;
        const appliedFilters = {
            publishedOn: formattedDate,
            name,
            categories: categories.map((c) => c.value)
        }
        dispatch(setFilters(appliedFilters))
        dispatch(fetchBooks({ page: 1, ...appliedFilters }));
    };

    const handleClear = () => {
        setPublishedOn(undefined);
        setName("")
        setCategories([])
        dispatch(setFilters({}));
        dispatch(fetchBooks({ page: 1 }));
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
                        {/* <Input
                            placeholder="Search by Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        /> */}
                        <InputWrapper
                            id="name"
                            placeholder="Search by Name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </div>

                    <div className="space-y-1">
                        <Label>Book Category</Label>
                        <Reactselect categories={categories} setCategories={setCategories} />
                    </div>

                    <div className="flex gap-2 justify-end">
                        {/* <Button variant="outline" onClick={handleClear}>
                            Clear
                        </Button> */}
                        <ButtonWrapper variant="outline" onClick={handleClear}>
                            Clear
                        </ButtonWrapper>
                        {/* <Button onClick={handleFilter}>
                            Apply
                        </Button> */}
                        <ButtonWrapper onClick={handleFilter}>
                            Apply
                        </ButtonWrapper>
                    </div>

                </div>
            </CardContent>
        </Card>
    );
}