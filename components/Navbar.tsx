"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  Search,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ShoppingBag from "@/modules/cart/components/ShoppingCart";
// Import your favorites component here
import FavoritesSheet from "@/modules/favourite-products/FavouriteProducts"; 

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-stone-200 bg-[#FBF9F6]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 items-center justify-between px-4 md:h-20 md:px-8">
        
        {/* Mobile Toggle */}
        <div className="flex flex-1 items-center md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="text-primary-text hover:bg-transparent"
          >
            {isOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </Button>
        </div>

        {/* Desktop Links */}
        <div className="hidden flex-1 items-center gap-8 md:flex">
          <Link href="/products" className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-text transition-colors hover:text-[#C5A059]">
            Shop
          </Link>
          <Link href="/new" className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-text transition-colors hover:text-[#C5A059]">
            New In
          </Link>
          <Link href="/about" className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-text transition-colors hover:text-[#C5A059]">
            About
          </Link>
        </div>

        <div className="flex shrink-0 items-center">
          <Link href="/home" className="font-serif text-xl tracking-[0.3em] text-primary-text md:text-3xl">
            LINEA
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end gap-1 md:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSearch}
            className=" hover:bg-transparent hover:text-[#C5A059]"
          >
            {isSearchOpen ? <X size={20} strokeWidth={1.5} /> : <Search size={20} strokeWidth={1.5} />}
          </Button>
          <FavoritesSheet />
          <ShoppingBag />
        </div>
      </div>


      <div className={`absolute left-0 top-full w-full border-b border-stone-200 bg-[#FBF9F6] px-4 py-4 transition-all duration-300 ease-in-out ${isSearchOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-4 opacity-0"}`}>
        <form onSubmit={handleSearchSubmit} className="mx-auto max-w-3xl relative">
          <input
            type="text"
            placeholder="Search for jewelry"
            className="w-full bg-transparent border-b border-stone-300 py-2 text-sm font-light tracking-wide outline-none placeholder:text-stone-400 focus:border-[#C5A059]"
            autoFocus={isSearchOpen}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="absolute right-0 bottom-2 text-stone-500 hover:text-[#C5A059]">
            <Search size={14} strokeWidth={1.5} />
          </button>
        </form>
      </div>

      <div className={`absolute left-0 top-16 w-full border-b border-stone-200 bg-[#FBF9F6] transition-all duration-300 ease-in-out md:hidden ${isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-4 opacity-0"}`}>
        <div className="flex flex-col items-center gap-8 py-12">
          <Link href="/products" onClick={toggleMenu} className="text-sm font-bold uppercase tracking-[0.3em] text-primary-text">Shop</Link>
          <Link href="/new" onClick={toggleMenu} className="text-sm font-bold uppercase tracking-[0.3em] text-primary-text">New In</Link>
          <Link href="/about" onClick={toggleMenu} className="text-sm font-bold uppercase tracking-[0.3em] text-primary-text">About</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;