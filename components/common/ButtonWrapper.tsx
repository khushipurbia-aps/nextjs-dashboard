"use client"

import { Button } from "../ui/button";
import React from "react";

type ButtonWrapperProps = {
    type?: "button" | "submit";
    className?: string;
    variant?: string;
    size?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean
};


export default function ButtonWrapper({
    type,
    className,
    variant,
    size,
    onClick,
    disabled
}: ButtonWrapperProps) {
    return (
    <Button
    type={type}
    className={className}
    onClick={onClick}
    disabled={disabled}
    
    />
    );
}
