"use client";

import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Loader from "@/components/common/loader";
import UserHomePage from "@/modules/home/user/UserHomePage";
import AdminHomePage from "@/modules/home/admin/AdminHomePage";

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded: any = jwt.decode(token);
    if (!decoded) return;

    setUser(decoded);
  }, []);

  if (!user) return <Loader />;

  if (user.isadmin) {
    return <AdminHomePage />;
  }

  return <UserHomePage />;
};

export default Dashboard;
