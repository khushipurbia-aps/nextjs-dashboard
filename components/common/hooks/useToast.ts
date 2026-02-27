
"use client";

import { toast } from "sonner";

export const useToast = () => {
  const showLoading = (message: string, id?: string) => {
    toast.loading(message, { id });
  };
  const showSuccess = (message: string, id?: string) => {
    toast.success(message, { id });
  };
  const showError = (message: string, id?: string) => {
    toast.error(message, { id });
  };

  return {
    showLoading,
    showSuccess,
    showError,
  };
}; 
