import React from "react";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-stone-50 px-4">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=2000"
          alt="Luxury Jewelry Background"
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-linear-to-b from-stone-50/50 via-transparent to-stone-50/80" />
      </div>

      <main className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-12 space-y-4">
          <h1 className="font-serif text-5xl tracking-tight text-stone-900 md:text-7xl">
            Welcome to LINEA
          </h1>
          <p className="text-lg font-light italic tracking-wide text-stone-600 md:text-xl">
            Exquisite jewelry for every occasion
          </p>
        </div>

        <div className="flex flex-row gap-6">
          <Link
            href="/login"
            className="w-36 rounded-full bg-[#1A1A1A] py-3 text-sm font-medium text-white shadow-lg transition-all duration-300  hover:shadow-blue-200/50"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="w-36 rounded-full bg-[#1A1A1A] py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:shadow-green-200/50"
          >
            Register
          </Link>
        </div>
      </main>

      <footer className="absolute bottom-8 z-10">
        <div className="h-px w-24 bg-stone-300" />
      </footer>
    </div>
  );
};

export default Home;