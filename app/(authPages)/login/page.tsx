"use client";

import React from "react";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import FormikInput from "@/components/form/FormikInput";
import { useLoginMutation } from "@/redux/apis/authApi";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const Login: React.FC = () => {
  const router = useRouter();
  const [login] = useLoginMutation();

  const handleSubmit = async (
    values: any,
    { setSubmitting, setErrors }: any
  ) => {
    try {
      const data = await login(values).unwrap();

      localStorage.setItem("token", data.token);
      router.push("/home");
    } catch (err: any) {
      setErrors({ password: err.data?.message || "Something went wrong" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#FBF9F6] px-6">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] bg-size-[40px_40px] opacity-[0.05]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-4xl font-light tracking-tight text-[#1A1A1A]">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm font-light tracking-wide text-stone-500">
            Please enter your credentials to access your collection
          </p>
        </div>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-6">
              <FormikInput name="email" label="Email Address" type="email" />
              <FormikInput name="password" label="Password" type="password" />
              <Button
                type="submit"
                className="mt-4 h-14 w-full bg-[#1A1A1A]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
