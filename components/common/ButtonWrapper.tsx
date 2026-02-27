"use client"

import { Button } from "../ui/button";
import { ReactNode } from "react";

type ButtonWrapperProps = {
    type?: "button" | "submit";
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean
    variant?: "default" | "outline" | "destructive";
    size?: "xs" | "sm" | "lg";
    children: ReactNode;
};

export default function ButtonWrapper({
    type = "button",
    className,
    onClick,
    disabled,
    variant,
    size,
    children
}: ButtonWrapperProps) {
    return (
        <Button
            type={type}
            className={className}
            onClick={onClick}
            disabled={disabled}
            variant={variant}
            size={size}
        >
            {children}
        </Button>
    );
}
