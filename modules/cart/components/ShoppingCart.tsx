"use client";

import React from "react";
import Image from "next/image";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/modules/cart/context";
import ConfirmRemoveDialog from "@/components/common/ConfirmationDialog";
import { CartItem } from "../hooks/useShoppingCart";
import Link from "next/link";

const ShoppingCart: React.FC = () => {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const [itemToRemove, setItemToRemove] = React.useState<CartItem | null>(null);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="border-none shadow-none bg-transparent relative p-1"
        >
          <ShoppingBag size={50} />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#C5A059] text-primary-text text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full max-w-[300px] sm:max-w-[440px] p-0 flex flex-col h-full border-l border-gray-200"
      >
        <div className="px-4 pt-4 flex items-center justify-between">
          <h2 className="text-[20px] font-normal text-primary-text">
            Shopping Bag
          </h2>
        </div>

        <Separator className="bg-gray-200" />

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-10">
          {items.length === 0 ? (
            <p className="text-center text-primary-text-gray">
              Your bag is empty.
            </p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-6">
                <div className="relative w-24 shrink-0">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name || "Product image"}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-24 w-24 flex items-center justify-center text-primary-text text-xs">
                      No image
                    </div>
                  )}
                </div>

                <div className="flex flex-col flex-1">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-[13px] text-primary-text-gray">
                        {item.category}
                      </p>
                      <h3 className="text-[15px] text-primary-text mb-2">
                        {item.name}
                      </h3>
                    </div>
                    <p className="text-[15px] text-primary-text">
                      ₹{item.price}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center border border-stone-200 w-fit">
                      <button
                        onClick={() => {
                          if (item.quantity <= 1) {
                            setItemToRemove(item);
                          } else {
                            updateQuantity(item.id, item.quantity - 1);
                          }
                        }}
                        className="px-3 py-2 hover:bg-stone-50"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="w-10 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-2 hover:bg-stone-50"
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

        <Separator className="bg-gray-200" />

        <div className="px-4 text-primary-text">
          <div className="flex justify-between mb-1">
            <span>Subtotal</span>
            <span className="text-[18px]">₹{subtotal.toFixed(2)}</span>
          </div>

          <p className="text-[13px] text-primary-text-gray mb-4">
            Shipping and taxes calculated at checkout
          </p>

          <div className="space-y-2 pb-3">
            <Link href="/checkout" className="block">
              <Button className="w-full bg-black text-white rounded-xl h-[55px]">
                Proceed to Checkout
              </Button>
            </Link>
            <SheetTrigger asChild>
              <Link href ="/products" className="block">
              <Button variant="outline" className="w-full rounded-xl h-[55px]">
                Continue Shopping
              </Button>
              </Link>
            </SheetTrigger>
          </div>
        </div>

        <ConfirmRemoveDialog
          item={itemToRemove}
          open={!!itemToRemove}
          onClose={() => setItemToRemove(null)}
          onConfirm={(item) => removeItem(item.id)}
        />
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;
