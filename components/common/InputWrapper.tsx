"use client";

import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import React from "react";

type InputWrapperProps = {
  id?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  className?: string;
};

export default function InputWrapper({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  className,
}: InputWrapperProps) {
  return (
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={cn(
        error && "border-red-600",
        className
      )}
    />
  );
}