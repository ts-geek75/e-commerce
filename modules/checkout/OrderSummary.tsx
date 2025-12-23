"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ConfirmRemoveDialog from "@/components/common/ConfirmationDialog";
import {
  useGetCartQuery,
  useUpdateQuantityMutation,
  useRemoveItemMutation,
  CartItem,
} from "@/redux/apis/CartApi";

const OrderSummary: React.FC = () => {
  const { data: items = [] } = useGetCartQuery();
  const [updateQuantity] = useUpdateQuantityMutation();
  const [removeItem] = useRemoveItemMutation();

  const [itemToRemove, setItemToRemove] = useState<CartItem | null>(null);
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center gap-3">
        <ShoppingBag size={20} />
        <h2 className="text-lg font-medium">Order Summary ({items.length})</h2>
      </div>

      <Separator />

      <div className="py-4 space-y-6">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="w-16 h-20 relative bg-gray-50">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex justify-between">
                <span className="text-sm font-medium">{item.name}</span>
                <span className="text-sm">₹{item.price}</span>
              </div>
              <div className="flex items-center border w-fit rounded">
                <button
                  className="px-2"
                  onClick={() =>
                    item.quantity > 1
                      ? updateQuantity({
                          productId: item.id,
                          quantity: item.quantity - 1,
                        })
                      : setItemToRemove(item)
                  }
                >
                  <Minus size={12} />
                </button>
                <span className="px-2 text-xs">{item.quantity}</span>
                <button
                  className="px-2"
                  onClick={() =>
                    updateQuantity({
                      productId: item.id,
                      quantity: item.quantity + 1,
                    })
                  }
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Separator className="mt-3" />

      <div className="px-4 py-4">
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span className="text-lg">₹{subtotal.toFixed(2)}</span>
        </div>
      </div>

      <ConfirmRemoveDialog
        item={itemToRemove}
        open={!!itemToRemove}
        onClose={() => setItemToRemove(null)}
        onConfirm={(item) => {
          removeItem(item.id);
          setItemToRemove(null);
        }}
      />
    </div>
  );
};

export default OrderSummary;
