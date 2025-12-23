"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

const NAVBAR_HEIGHT = 50;

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main style={{ paddingTop: NAVBAR_HEIGHT }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default ShopLayout;
