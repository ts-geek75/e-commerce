"use client";

import React from "react";
import Image from "next/image";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ConfirmRemoveDialog from "@/components/common/ConfirmationDialog";
import { useCart } from "@/modules/cart/context";
import { CartItem } from "../cart/hooks/useShoppingCart";

const OrderSummary: React.FC = () => {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const [itemToRemove, setItemToRemove] = React.useState<CartItem | null>(null);

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center gap-3">
        <ShoppingBag size={20} />
        <h2 className="text-lg font-normal text-primary-text">
          Order Summary ({items.length})
        </h2>
      </div>

      <Separator />

      <div className="flex-1 overflow-y-auto py-4 space-y-8">
        {items.length === 0 ? (
            <p className="text-sm text-primary-text-gray">Your cart is empty.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex gap-5">
              <div className="w-24 shrink-0">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name || "Product image"}
                    width={70}
                    height={70}
                    className="object-cover"
                  />
                ) : (
                  <div className="h-24 w-24 flex items-center justify-center text-xs">
                    No image
                  </div>
                )}
              </div>

              <div className="flex flex-col flex-1">
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs text-primary-text-gray">
                      {item.category}
                    </p>
                    <h3 className="text-sm text-primary-text">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-sm text-primary-text">
                    ₹{item.price}
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="flex items-center border border-stone-200 w-fit">
                    <button
                      className="px-3 py-2"
                      onClick={() => {
                        if (item.quantity <= 1) {
                          setItemToRemove(item);
                        } else {
                          updateQuantity(item.id, item.quantity - 1);
                        }
                      }}
                    >
                      <Minus size={14} />
                    </button>

                    <span className="w-10 text-center">
                      {item.quantity}
                    </span>

                    <button
                      className="px-3 py-2"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
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
        onConfirm={(item) => removeItem(item.id)}
      />
    </div>
  );
};

export default OrderSummary;
