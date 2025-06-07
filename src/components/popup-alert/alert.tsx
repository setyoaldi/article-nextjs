import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ReactNode } from "react";

interface DialogWrapperProps {
  open?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  footer?: ReactNode;
  onDialogClose?: (responValue: boolean) => void;
  description?: string;
}

export function AlertDialogCategory({
  open,
  onClose,
  onConfirm,
  title,
  description,
  onDialogClose,
}: DialogWrapperProps) {
  const handleCancel = () => {
    onDialogClose?.(false);
    onClose?.();
  };

  const handleConfirm = () => {
    onDialogClose?.(true);
    onConfirm?.();
    onClose?.();
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent onFocusOutside={(e) => e.preventDefault()}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="cursor-pointer hover:opacity-80"
            onClick={handleCancel}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className={`cursor-pointer hover:opacity-80 ${
              title === "Logout" ? "bg-[#2563EB]" : "bg-[#DC2626]"
            }`}
            onClick={handleConfirm}
          >
            {title === "Logout" ? "Logout" : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
