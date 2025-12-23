"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ConfirmRemoveDialog from "@/components/common/ConfirmationDialog";
import Link from "next/link";
import {
  useGetCartQuery,
  useUpdateQuantityMutation,
  useRemoveItemMutation,
  CartItem,
} from "@/redux/apis/CartApi";

const ShoppingCart: React.FC = () => {
  const { data: items = [], isLoading } = useGetCartQuery();
  const [updateQuantity] = useUpdateQuantityMutation();
  const [removeItem] = useRemoveItemMutation();
  
  const [itemToRemove, setItemToRemove] = useState<CartItem | null>(null);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleAdjust = (item: CartItem, delta: number) => {
    const newQty = item.quantity + delta;
    if (newQty <= 0) {
      setItemToRemove(item);
    } else {
      updateQuantity({ productId: item.id, quantity: newQty });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="border-none bg-transparent relative p-1">
          <ShoppingBag size={28} />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#C5A059] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full max-w-[400px] p-0 flex flex-col h-full">
        <div className="px-6 py-5">
          <h2 className="text-xl font-medium">Shopping Bag</h2>
        </div>
        <Separator />

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {isLoading ? (
            <div className="flex justify-center py-10"><Loader2 className="animate-spin" /></div>
          ) : items.length === 0 ? (
            <p className="text-center text-gray-500 py-10">Your bag is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 mb-6">
                <Image src={item.image} alt={item.name} width={80} height={80} className="object-cover bg-gray-50" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-sm">₹{item.price}</p>
                  </div>
                  <div className="mt-4 flex items-center border w-fit rounded">
                    <button className="px-2 py-1" onClick={() => handleAdjust(item, -1)}><Minus size={14} /></button>
                    <span className="px-2 text-sm">{item.quantity}</span>
                    <button className="px-2 py-1" onClick={() => handleAdjust(item, 1)}><Plus size={14} /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Subtotal</span>
            <span className="font-bold text-lg">₹{subtotal.toFixed(2)}</span>
          </div>
          <Link href="/checkout"><Button className="w-full h-12 bg-black text-white">Checkout</Button></Link>
        </div>

        <ConfirmRemoveDialog
          item={itemToRemove}
          open={!!itemToRemove}
          onClose={() => setItemToRemove(null)}
          onConfirm={(item) => { removeItem(item.id); setItemToRemove(null); }}
        />
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;