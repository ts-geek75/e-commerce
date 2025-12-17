import React from "react";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";

import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-stone-200 bg-[#FBF9F6]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 items-center justify-between px-4 md:h-20 md:px-8">
        <div className="flex flex-1 items-center md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="text-[#1A1A1A] hover:bg-transparent"
          >
            {isOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </Button>
        </div>

        <div className="hidden flex-1 items-center gap-8 md:flex">
          <Link
            href="/products"
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] transition-colors hover:text-[#C5A059]"
          >
            Shop
          </Link>
          <Link
            href="/new"
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] transition-colors hover:text-[#C5A059]"
          >
            New In
          </Link>
          <Link
            href="/about"
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] transition-colors hover:text-[#C5A059]"
          >
            About
          </Link>
        </div>

        <div className="flex shrink-0 items-center">
          <Link
            href="/home"
            className="font-serif text-xl tracking-[0.3em] text-[#1A1A1A] md:text-3xl"
          >
            LINEA
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end gap-1 md:gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-stone-700 hover:bg-transparent hover:text-[#C5A059]"
          >
            <Search size={18} strokeWidth={1.5} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden text-stone-700 hover:bg-transparent hover:text-[#C5A059] sm:flex"
          >
            <Heart size={18} strokeWidth={1.5} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-stone-700 hover:bg-transparent hover:text-[#C5A059]"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
          </Button>
        </div>
      </div>

      <div
        className={`absolute left-0 top-16 w-full border-b border-stone-200 bg-[#FBF9F6] transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-4 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-8 py-12">
          <Link
            href="/products"
            onClick={toggleMenu}
            className="text-sm font-bold uppercase tracking-[0.3em] text-[#1A1A1A]"
          >
            Shop
          </Link>
          <Link
            href="/new"
            onClick={toggleMenu}
            className="text-sm font-bold uppercase tracking-[0.3em] text-[#1A1A1A]"
          >
            New In
          </Link>
          <Link
            href="/about"
            onClick={toggleMenu}
            className="text-sm font-bold uppercase tracking-[0.3em] text-[#1A1A1A]"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;