"use client";

import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

import Loader from "@/components/common/loader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwt.decode(token);
    setUser(decoded);
  }, []);

  if (!user) return <Loader />;

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default ProtectedLayout;
