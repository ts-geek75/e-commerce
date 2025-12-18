"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const PRICE_RANGES = [
  { label: "Under ₹1,000", value: "0-1000" },
  { label: "₹1,000 – ₹2,000", value: "1000-2000" },
  { label: "₹2,000 – ₹3,000", value: "2000-3000" },
  { label: "Over ₹3,000", value: "3000-999999" },
];

const ProductFilterPanel: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toggleMultiFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const existing = params.getAll(key);

    if (existing.includes(value)) {
      params.delete(key);
      existing.filter((v) => v !== value).forEach((v) => params.append(key, v));
    } else {
      params.append(key, value);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const toggleSingleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const clearAll = () => {
    router.push(pathname);
  };

  const hasValue = (key: string, value: string) =>
    searchParams.getAll(key).includes(value);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter size={14} />
          Filters
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full max-w-[250px] p-4 sm:p-6">
        <h1 className="pb-5 font-medium">FILTERS</h1>

        <div className="space-y-6 text-[13px] text-primary-text-gray">
          <section className="space-y-4">
            <h3 className="text-primary-text">Category</h3>
            {["earrings", "bracelets", "rings"].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Checkbox
                  checked={hasValue("category", item)}
                  onCheckedChange={() => toggleMultiFilter("category", item)}
                  className="rounded-none border-gray-200"
                />
                <label className="cursor-pointer capitalize">{item}</label>
              </div>
            ))}
          </section>

          <Separator className="bg-stone-100" />
          <section className="space-y-4">
            <h3 className="text-primary-text">Price</h3>
            {PRICE_RANGES.map((price) => (
              <div key={price.value} className="flex items-center gap-3">
                <Checkbox
                  checked={searchParams.get("price") === price.value}
                  onCheckedChange={() =>
                    toggleSingleFilter("price", price.value)
                  }
                  className="rounded-none border-gray-200"
                />
                <label className="cursor-pointer">{price.label}</label>
              </div>
            ))}
          </section>

          <Separator className="bg-stone-100" />

          <section className="space-y-4">
            <h3 className="text-primary-text">Material</h3>
            {["Gold", "Silver", "Rose Gold", "Platinum"].map((material) => (
              <div key={material} className="flex items-center gap-3">
                <Checkbox
                  checked={hasValue("material", material)}
                  onCheckedChange={() =>
                    toggleMultiFilter("material", material)
                  }
                  className="rounded-none border-gray-200"
                />
                <label className="cursor-pointer">{material}</label>
              </div>
            ))}
          </section>

          <Separator className="bg-stone-100" />

          <Button
            variant="ghost"
            onClick={clearAll}
            className="px-0 text-sm font-normal text-primary-text-gray hover:bg-transparent hover:underline"
          >
            Clear All
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProductFilterPanel;
