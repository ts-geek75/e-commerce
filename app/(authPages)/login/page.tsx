"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const Login: React.FC = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) return setError(data.message);
    localStorage.setItem("token", data.token);
    router.push("/home");
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="name@example.com"
                onChange={handleChange}
                required
                className="h-12 border-b border-stone-200 bg-transparent text-sm font-light transition-colors focus:border-[#C5A059] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                onChange={handleChange}
                required
                className="h-12 border-b border-stone-200 bg-transparent text-sm font-light transition-colors focus:border-[#C5A059] focus:outline-none"
              />
            </div>
          </div>

          {error && (
            <p className="text-center text-xs font-medium tracking-wide text-red-500">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="mt-4 h-14 w-full bg-[#1A1A1A] text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:bg-[#C5A059] hover:shadow-xl hover:shadow-[#C5A059]/20"
          >
            Sign In
          </Button>
        </form>

        <div className="mt-8 text-center">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 transition-colors hover:bg-transparent hover:text-[#C5A059]"
          >
            Return to Store
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;