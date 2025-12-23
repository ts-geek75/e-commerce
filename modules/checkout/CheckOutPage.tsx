import React from "react";
import { Loader } from "@/components/common";
import { useGetProfileQuery } from "@/redux/apis/authApi"; 
import CheckoutForm from "./form/CheckOutForm";
import OrderSummary from "./OrderSummary";

const Checkout: React.FC = () => {

  const { data: initialData, isLoading } = useGetProfileQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="sm:w-11/12 md:w-full md:p-3 px-4 py-10 text-primary-text">
      <div className="flex flex-col-reverse md:flex-row gap-8 md:py-8 lg:max-w-5xl lg:mx-auto">
        <div className="w-full md:w-2/3">
          <CheckoutForm initialData={initialData} />
        </div>
        <div className="w-full md:w-1/3">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
