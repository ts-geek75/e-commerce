"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PlacedOrder: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      <div className="mb-6 text-green-500">
        <CheckCircle2 size={80} strokeWidth={1.5} />
      </div>
      <h1 className="text-3xl font-bold mb-2 tracking-tight">Hurray!</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Your order has been placed successfully.
      </p>
      <div >
        <Link href="/products">
          <Button variant="outline" className="mt-4 px-8 py-6 uppercase text-xs tracking-widest">
           Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PlacedOrder;