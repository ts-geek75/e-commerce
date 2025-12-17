"use client";

import React from "react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<Props> = ({ items }) => {
  return (
    <nav className="my-5 text-sm text-gray-600">
      <ol className="flex items-center gap-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index !== 0 && <span>{'>'}</span>}

            {item.href ? (
              <Link href={item.href} className="hover:text-black">
                {item.label}
              </Link>
            ) : (
              <span className="text-black">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
