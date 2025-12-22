"use client";

import React from "react";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

import { Button } from "@/components/ui/button";
import FormikInput from "@/components/form/FormikInput";

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const Register: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (
    values: RegisterFormValues,
    { setSubmitting, setErrors }: any
  ) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) return setErrors({ password: data.message });

      router.push("/login");
    } catch (err: any) {
      setErrors({ password: err.message || "Something went wrong" });
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
            Create Account
          </h2>
          <p className="mt-2 text-sm font-light tracking-wide text-stone-500">
            Join the LINEA inner circle for exclusive access
          </p>
        </div>

        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-6">
              <div className="space-y-4">
                <FormikInput
                  name="username"
                  label="Username"
                  placeholder="Your Name"
                />
                <FormikInput
                  name="email"
                  label="Email Address"
                  placeholder="name@example.com"
                  type="email"
                />
                <FormikInput
                  name="password"
                  label="Password"
                  placeholder="••••••••"
                  type="password"
                />
              </div>

              <Button
                type="submit"
                className="mt-4 h-14 w-full bg-[#1A1A1A] text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:bg-[#C5A059] hover:shadow-xl hover:shadow-[#C5A059]/20"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </Button>
            </Form>
          )}
        </Formik>

        <div className="mt-8 text-center">
          <Button
            variant="link"
            onClick={() => router.push("/login")}
            className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 decoration-stone-300 transition-colors hover:text-[#C5A059]"
          >
            Already have an account? Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
