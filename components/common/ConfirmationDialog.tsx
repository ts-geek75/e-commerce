"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { CartItem } from "@/modules/cart/hooks/useShoppingCart";

interface ConfirmRemoveDialogProps {
  item: CartItem | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (item: CartItem) => void;
}

const ConfirmRemoveDialog: React.FC<ConfirmRemoveDialogProps> = ({
  item,
  open,
  onClose,
  onConfirm,
}) => {
  if (!item) return null;

  return (
    <AlertDialog open={open} onOpenChange={(val) => !val && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Item</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove <strong>{item.name}</strong> from your cart?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => { onConfirm(item); onClose(); }}>
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmRemoveDialog;
