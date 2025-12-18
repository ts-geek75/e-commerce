"use client";

import React from "react";
import Image from "next/image";
import { X, Minus, Plus } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useShoppingCart } from "../hooks";

const ShoppingCart: React.FC = () => {
  const { items, updateQuantity, subtotal } = useShoppingCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="rounded-none border-black">
          Bag ({items.length})
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full max-w-full sm:max-w-[440px] p-0 flex flex-col h-full border-l border-stone-200"
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-[20px] font-normal text-stone-800">Shopping Bag</h2>
          <SheetTrigger asChild>
            <button className="text-stone-500 hover:text-black transition-colors">
              <X size={24} strokeWidth={1} />
            </button>
          </SheetTrigger>
        </div>

        <Separator className="bg-stone-100" />

        {/* Scrollable Product List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-10">
          {items.length === 0 ? (
            <p className="text-center text-stone-400">Your bag is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-6">
                <div className="relative h-28 w-24 flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain"
                    sizes="100%"
                  />
                </div>

                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start">
                    <div className="space-y-0.5">
                      <p className="text-[13px] text-stone-400 font-light">{item.category}</p>
                      <h3 className="text-[15px] font-medium text-stone-900">{item.name}</h3>
                    </div>
                    <p className="text-[15px] font-normal text-stone-900">
                      €{item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center w-fit border border-stone-200">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-2 hover:bg-stone-50 transition-colors"
                      >
                        <Minus size={14} strokeWidth={1.5} />
                      </button>
                      <span className="w-10 text-center text-[14px]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-2 hover:bg-stone-50 transition-colors"
                      >
                        <Plus size={14} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-8 bg-white border-t border-stone-100">
          <Separator className="mb-8 bg-stone-100" />

          <div className="flex justify-between items-center mb-1">
            <span className="text-[16px] text-stone-900">Subtotal</span>
            <span className="text-[18px] font-medium text-stone-900">
              €{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>

          <p className="text-[13px] text-stone-400 mb-8">
            Shipping and taxes calculated at checkout
          </p>

          <div className="space-y-3">
            <Button className="w-full bg-[#111111] hover:bg-black text-white rounded-none h-[55px] text-[13px] uppercase tracking-widest font-light">
              Proceed to Checkout
            </Button>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="w-full border-stone-200 rounded-none h-[55px] text-[13px] uppercase tracking-widest font-light text-stone-800"
              >
                Continue Shopping
              </Button>
            </SheetTrigger>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;
