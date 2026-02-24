"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ImportSuccessModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}

export default function SuccessModal({
  open,
  setOpen,
}: ImportSuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()} className="max-w-sm text-center space-y-6">
        <DialogHeader>
          <DialogTitle>Import Successful</DialogTitle>
        </DialogHeader>

        <p className="text-muted-foreground">
          Books were imported successfully.
        </p>

        <div className="flex justify-center">
          <Button onClick={() => setOpen(false)}>
            OK
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}