"use client";

import { Button } from "../ui/button";
import { useState } from "react";
import { AppDispatch } from "@/app/store/store";
import { useDispatch } from "react-redux";
import { fetchBooks } from "@/app/store/bookSlice";
import { DayPicker } from "react-day-picker"
import "react-day-picker/style.css";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "lucide-react";

import { useDayPicker } from "react-day-picker"

type FooterProps = {
    setPublishedOn: (date: Date | undefined) => void;
};
function CalendarFooter({ setPublishedOn }: FooterProps,
) {
    const { goToMonth } = useDayPicker();

    const handleToday = () => {
        const today = new Date();
        setPublishedOn(today);
        goToMonth(today);
    };

    return (
        <button
            className="text-sm text-blue-600 hover:underline"
            onClick={handleToday}
        >
            Today
        </button>
    );
}

type DaypickerProps = {
    publishedOn: Date | undefined;
    setPublishedOn: (date: Date | undefined) => void;
};

export default function Daypicker({
    publishedOn,
    setPublishedOn,
}: DaypickerProps) {
    const [calendarOpen, setcalendarOpen] = useState(false);
    return (
        <Popover open={calendarOpen} onOpenChange={setcalendarOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    {publishedOn
                        ? publishedOn.toLocaleDateString("en-GB")
                        : "Pick a day"}
                </Button>
            </PopoverTrigger>

            <PopoverContent align="start"
                className="w-78 p-3">
                <DayPicker
                    animate
                    required
                    mode="single"
                    selected={publishedOn}
                    onSelect={(date) => {
                        setPublishedOn(date);
                        setcalendarOpen(false);
                    }}
                    footer={
                        <CalendarFooter
                            setPublishedOn={setPublishedOn}
                        />
                    }
                />
            </PopoverContent>
        </Popover>
    );
}
