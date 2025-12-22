"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { CheckoutFormData } from "@/types/CheckoutForm";

const usePlaceOrder = () => {
  const router = useRouter();

  const placeOrder = async (
    values: CheckoutFormData,
    setSubmitting: (value: boolean) => void,
    onSuccess?: () => void
  ) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await fetch("/api/place-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      toast.success("Order placed successfully");

      onSuccess?.();
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return { placeOrder };
};

export default usePlaceOrder;
