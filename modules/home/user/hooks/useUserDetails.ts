"use client";

import React, { useEffect, useState } from "react";

interface UserDetails {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

const useUserDetails = () => {
  const [data, setData] = useState<UserDetails>({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await fetch("/api/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const result = await res.json();

        if (res.ok && result.user) {
          setData({
            email: result.user.email || "",
            firstName: result.user.first_name || "",
            lastName: result.user.last_name || "",
            phone: result.user.phone || "",
            address: result.user.address || "",
            city: result.user.city || "",
            postalCode: result.user.postal_code || "",
            country: result.user.country || "",
          });
        }
      } catch {
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  return { data, loading };
};

export default useUserDetails;
