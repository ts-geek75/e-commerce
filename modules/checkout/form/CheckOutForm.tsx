"use client";

import React from "react";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckoutSchema } from "../schema/CheckoutSchema";
import FormikInput from "@/components/form/FormikInput";
import usePlaceOrder from "../hooks/usePlaceOrder";
import { CheckoutFormProps } from "@/types/CheckoutForm";

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  initialData,
  cartItems = [],
}) => {
  const { placeOrder } = usePlaceOrder();
  const router = useRouter(); 

  return (
    <div className="flex-1">
      <h2 className="text-xl mb-8 font-light">Customer Details</h2>

      <Formik
        initialValues={initialData}
        validationSchema={CheckoutSchema}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) =>
          placeOrder(values, setSubmitting, () => {
            router.push("/placed-order");
          })
        }
      >
        {({ isSubmitting }) => (
          <Form className="space-y-8">
            <FormikInput
              name="email"
              label="Email Address"
              type="email"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormikInput name="firstName" label="First Name" />
              <FormikInput name="lastName" label="Last Name" />
            </div>

            <FormikInput name="phone" label="Phone Number" />

            <hr className="border-gray-100 my-6" />
            <h2 className="text-xl mb-8 font-light">Shipping Address</h2>

            <FormikInput name="address" label="Address" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormikInput name="city" label="City" />
              <FormikInput name="postalCode" label="Postal Code" />
            </div>

            <FormikInput name="country" label="Country" />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 uppercase tracking-widest text-xs"
            >
              {isSubmitting ? "Processing..." : "Place Order"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CheckoutForm;