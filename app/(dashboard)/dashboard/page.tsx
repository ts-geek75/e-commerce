"use client";

import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import AdminDashboard from "@/modules/dashboard/admin/AdminDashboard";
import UserDashboard from "@/modules/dashboard/user/UserDashboard";

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded: any = jwt.decode(token);
    if (!decoded) return;

    setUser(decoded);
  }, []);

  if (!user) return <p>Loading...</p>;

  if (user.isadmin) {
    return <AdminDashboard />;
  }

  return <UserDashboard />;
};

export default Dashboard;
