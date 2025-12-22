"use client"
import React from "react";

import { Loader } from "@/components/common";
import useUserDetails from "../home/user/hooks/useUserDetails";
import CheckoutForm from "./form/CheckOutForm";
import OrderSummary from "./OrderSummary";

const Checkout: React.FC = () => {
  const { data: initialData, loading } = useUserDetails()

  if (loading) return <Loader />;

  return (
    <div className="sm:w-11/12 md:w-full md:p-3 px-4 py-10 text-primary-text">
      <div className="flex flex-col-reverse md:flex-row gap-8 md:py-8 lg:max-w-5xl lg:mx-auto">
        <CheckoutForm initialData={initialData}/>
        <div className="w-full md:w-1/3">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
