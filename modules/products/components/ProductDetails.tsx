"use client";

import React, { useRef, useState } from "react";
import { useGetProductsQuery } from "@/redux/apis/ProductsApi";
import { Breadcrumb, Loader } from "@/components/common";
import { Minus, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetCartQuery, useUpdateQuantityMutation } from "@/redux/apis/CartApi";

interface Props {
  productId: string;
}

const ProductDetails: React.FC<Props> = ({ productId }) => {

 const { data: products = [], isLoading: loading }   = useGetProductsQuery({ uuid: productId });
  const product = products?.[0];

  const { data: cartItems = [] } = useGetCartQuery();
  const [updateQuantity, { isLoading: isUpdating }] = useUpdateQuantityMutation();

  const [quantity, setQuantity] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);

  if (loading) return <Loader />;
  if (!product) return <div className="p-10 text-center">Product not found</div>;

  const isOutOfStock = product.stock <= 0;

  const breadcrumbItems = [
    { label: "Home", href: "/home" },
    { label: product.category, href: `/products?category=${product.category}` },
    { label: product.name, href: "#" },
  ];

  const handleAddToBag = async () => {
    if (isOutOfStock) return;

    const existingItem = cartItems.find((item) => item.id === product.uuid);

    const finalQuantity = existingItem 
      ? existingItem.quantity + quantity 
      : quantity;

    try {
      await updateQuantity({
        productId: product.uuid,
        quantity: finalQuantity,
      }).unwrap();
      
      setQuantity(1);
    } catch (error) {
      console.error("Failed to add to bag:", error);
    }
  };

  const handleDotClick = (index: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: width * index,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.offsetWidth;
    const index = Math.round(scrollLeft / width);
    setActiveIndex(index);
  };

  return (
    <div className="min-h-screen text-primary-text">
      <div className="pt-4 sm:pt-8 px-4 md:px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-15 items-start">
        <nav className="block md:hidden pt-2">
          <Breadcrumb items={breadcrumbItems} />
        </nav>

        <div className="flex flex-col items-center w-full">
          <div className="w-full flex flex-col items-center md:py-6">
            <div className="flex flex-col w-full">
              {/* MOBILE VIEW */}
              <div className="md:hidden relative">
                <div
                  ref={scrollRef}
                  onScroll={handleScroll}
                  className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                >
                  {product.images.map((img, idx) => (
                    <div key={idx} className="min-w-full snap-center flex justify-center">
                      <img
                        src={img}
                        alt={product.name}
                        className="w-full max-w-[350px] object-contain"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-3 mt-4 pb-4">
                  {product.images.map((_, idx) => (
                    <button key={idx} onClick={() => handleDotClick(idx)} className="p-1">
                      <div className={`w-1.5 h-1.5 rounded-full transition-all ${activeIndex === idx ? "bg-black scale-125" : "bg-gray-200"}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* DESKTOP VIEW */}
              <div className="hidden md:flex flex-col gap-4">
                {product.images.map((img, idx) => (
                  <div key={idx}>
                    <img src={img} alt={product.name} className="w-full object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sticky top-20">
          <nav className="hidden md:block mb-2">
            <Breadcrumb items={breadcrumbItems} />
          </nav>
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[11px] text-primary-text-gray uppercase mb-1 tracking-widest">{product.category}</p>
              <h1 className="text-2xl md:text-4xl font-light tracking-tight">{product.name}</h1>
              {isOutOfStock && <span className="text-red-500 text-[10px] uppercase font-bold">Out of Stock</span>}
            </div>
            <p className="text-xl md:text-2xl font-light">₹{product.price.toLocaleString()}</p>
          </div>

          <div className="space-y-6 text-[13px] text-primary-text-gray border-b border-gray-100 pb-4">
            <div><span className="block text-primary-text uppercase mb-1 font-medium">Material</span><p className="font-light">{product.material}</p></div>
            <div><span className="block text-primary-text uppercase mb-1 font-medium">Dimensions</span><p className="font-light">{product.dimension}</p></div>
            <div><span className="block text-primary-text uppercase mb-1 font-medium">Weight</span><p className="font-light">{product.weight}</p></div>
            <div className="pt-2"><span className="block text-primary-text uppercase mb-1 font-medium">Editor's notes</span><p className="text-primary-text-gray">{product.editors_note}</p></div>
          </div>

          <div className="mt-4 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-widest text-primary-text-gray">Quantity</span>
              <div className={`flex items-center border border-gray-200 rounded-sm ${isOutOfStock ? "opacity-50" : ""}`}>
                <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={isOutOfStock}>
                  <Minus size={14} />
                </Button>
                <span className="w-10 text-center text-[13px] border-x border-gray-200">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)} disabled={isOutOfStock}>
                  <Plus size={14} />
                </Button>
              </div>
            </div>

            <Button
              className={`w-full py-7 rounded-none text-[12px] uppercase tracking-widest font-medium transition-all ${isOutOfStock ? "bg-gray-300" : "bg-black text-white hover:bg-zinc-800"}`}
              onClick={handleAddToBag}
              disabled={isOutOfStock || isUpdating}
            >
              {isUpdating ? "Updating Bag..." : isOutOfStock ? "Out of Stock" : "Add to Bag"}
            </Button>
          </div>

          <div className="mt-12">
            <Accordion title="Description" content={product.description} defaultOpen />
            <Accordion title="Care & Cleaning" content={
              <ul className="space-y-2 font-light">
                <li>• Clean with a soft, dry cloth</li>
                <li>• Avoid contact with perfumes and lotions</li>
                <li>• Store in the provided jewelry pouch</li>
              </ul>
            } />
          </div>
        </div>
      </div>
    </div>
  );
};

const Accordion = ({ title, content, defaultOpen = false }: any) => (
  <details className="group border-b border-gray-200" open={defaultOpen}>
    <summary className="flex items-center justify-between py-4 cursor-pointer list-none">
      <span className="text-xs uppercase font-medium">{title}</span>
      <ChevronDown size={16} className="text-primary-text-gray group-open:rotate-180 transition-transform" />
    </summary>
    <div className="pb-6 text-[13px] text-primary-text-gray leading-relaxed font-light">{content}</div>
  </details>
);

export default ProductDetails;