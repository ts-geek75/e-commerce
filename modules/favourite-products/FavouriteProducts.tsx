"use client";

import React from "react";
import { Heart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const FavoriteProducts: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Heart size={20} className="text-primary-text" />
        </button>
      </SheetTrigger>

      <SheetContent 
        side="right" 
        className="w-full sm:max-w-md p-0 flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-normal text-primary-text">
            Your Favorites
          </h2>
        </div>
        <div className="flex-1 px-4">
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-primary-text-gray font-light">
              You haven't added any favorites yet. Browse our collection and 
              click the heart icon to save items you love.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default FavoriteProducts;