"use client";

import React, { useRef, useState } from "react";
import { useGetProducts } from "../hooks";
import { Breadcrumb, Loader } from "@/components/common";
import { Minus, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image_url: string;
  images: string[];
  material: string;
  dimensions: string;
  weight: string;
  editors_note: string;
  description: string;
}

interface Props {
  productId: string;
}

const ProductDetails: React.FC<Props> = ({ productId }) => {
  const { products, loading } = useGetProducts(undefined, productId);
  const product = products[0];

  const [quantity, setQuantity] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);

  if (loading) return <Loader />;
  if (!product) return <div>Product not found</div>;

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
  const breadcrumbItems = [
    { label: "Home", href: "/home" },
    { label: product.category,    href: `/products?category=${product.category}`, },
    { label: product.name, href: "#" },
  ];

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.offsetWidth;
    const index = Math.round(scrollLeft / width);
    setActiveIndex(index);
  };

  return (
    <div className="min-h-screen text-primary-text">
      <div className=" pt-16 md:pt-20 px-4 md:px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-24 items-start">
        <nav className="block md:hidden pt-2">
          <Breadcrumb items={breadcrumbItems} />
        </nav>

        <div className="flex flex-col items-center w-full">
          <div className="w-full flex flex-col items-center md:py-8">
          
            {/* Left Column: Image Section */}
            <div className="flex flex-col w-full">
              {/* MOBILE VIEW: Horizontal Carousel */}
              <div className="md:hidden relative">
                <div
                  ref={scrollRef}
                  onScroll={handleScroll}
                  style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
                  className="flex overflow-x-auto snap-x snap-mandatory " 
                >
                  {product.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="min-w-full snap-center flex justify-center"
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${idx}`}
                        className="w-full max-w-[350px] object-contain "
                      />
                    </div>
                  ))}
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-3 mt-4 pb-4">
                  {product.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDotClick(idx)}
                      className="p-1" 
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          activeIndex === idx
                            ? "bg-black scale-125"
                            : "bg-gray-200"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* DESKTOP VIEW: Vertical Scrolling Stack */}
              <div className="hidden md:flex flex-col gap-4">
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    >
                    <img
                      src={img}
                      alt={`${product.name} ${idx}`}
                      className="w-full object-contain"
                    />
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
              <p className="text-[11px] text-primary-text-gray uppercase mb-1 tracking-widest">
                {product.category}
              </p>
              <h1 className="text-2xl md:text-4xl font-light tracking-tight">
                {product.name}
              </h1>
            </div>
            <p className="text md:text-2xl font-light">
              ₹{product.price.toLocaleString()}
            </p>
          </div>

          {/* Core Specs */}
          <div className="space-y-6 text-[13px] text-primary-text-gray border-b border-gray-100 pb-4">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <span className="block text-primary-text uppercase mb-1 font-medium tracking-tight">
                  Material
                </span>
                <p className="font-light">{product.material}</p>
              </div>
              <div>
                <span className="block text-primary-text uppercase mb-1 font-medium tracking-tight">
                  Dimensions
                </span>
                <p className="font-light">{product.dimension}</p>
              </div>
              <div>
                <span className="block text-primary-text uppercase mb-1 font-medium tracking-tight">
                  Weight
                </span>
                <p className="font-light">{product.weight}</p>
              </div>
            </div>
            <div className="pt-2">
              <span className="block text-primary-text uppercase mb-1 font-medium tracking-tight">
                Editor's notes
              </span>
              <p className=" text-primary-text-gray ">{product.editors_note}</p>
            </div>
          </div>

          {/* Quantity & CTA */}
          <div className="mt-4 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-widest text-primary-text-gray">
                Quantity
              </span>
              <div className="flex items-center border border-gray-200 rounded-sm">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus size={14} strokeWidth={1} />
                </Button>
                <span className="w-10 text-center text-[13px] border-x border-gray-200">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-none"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={14} strokeWidth={1} />
                </Button>
              </div>
            </div>

            <Button className="w-full bg-[#1a1a1a] text-white py-7 rounded-none text-[12px] uppercase tracking-[0.25em] font-medium hover:bg-black transition-all">
              Add to Bag
            </Button>
          </div>

          {/* Accordions */}
          <div className="mt-12 ">
            <details className="group border-b border-t border-gray-200" open>
              <summary className="flex items-center justify-between py-4 cursor-pointer list-none">
                <span className="text-xs uppercase ">Description</span>
                <ChevronDown
                  size={16}
                  className="text-primary-text-gray group-open:hidden"
                />
                <ChevronUp
                  size={16}
                  className="text-primary-text-gray hidden group-open:block"
                />
              </summary>
              <div className="pb-6 text-[13px] text-primary-text-gray leading-relaxed font-light">
                <p>{product.description}</p>
              </div>
            </details>

            <details className="group border-b border-gray-200">
              <summary className="flex items-center justify-between py-4 cursor-pointer list-none">
                <span className="text-xs uppercase ">Care & Cleaning</span>
                <ChevronDown
                  size={16}
                  className="text-primary-text-gray group-open:hidden"
                />
                <ChevronUp
                  size={16}
                  className="text-primary-text-gray hidden group-open:block"
                />
              </summary>
              <div className="pb-6 text-[13px] text-primary-text-gray leading-relaxed space-y-4">
                <ul className="space-y-2 font-light">
                  <li className="flex gap-2">
                    <span>•</span> Clean with a soft, dry cloth after each wear
                  </li>
                  <li className="flex gap-2">
                    <span>•</span> Avoid contact with perfumes, lotions, and
                    cleaning products
                  </li>
                  <li className="flex gap-2">
                    <span>•</span> Store in the provided jewelry pouch when not
                    wearing
                  </li>
                  <li className="flex gap-2">
                    <span>•</span> Remove before swimming, exercising, or
                    showering
                  </li>
                </ul>
                <p className="pt-2 font-light">
                  For professional cleaning, visit your local jeweler or contact
                  our customer service team.
                </p>
              </div>
            </details>
           
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
