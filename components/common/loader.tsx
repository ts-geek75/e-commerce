import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center  p-8">
      <div className="relative flex items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-[#C5A059]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-10 w-10 animate-pulse rounded-full border border-stone-200" />
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center space-y-2">
        <span className="font-serif text-xl tracking-[0.4em] text-[#1A1A1A]">
          LINEA
        </span>
        <div className="h-px w-12 animate-grow-shrink bg-[#C5A059]/40" />

      </div>
    </div>
  );
};

export default Loader;