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
    <nav className="my-5 text-sm text-primary-text-gray">
      <ol className="flex items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              {index !== 0 && <span className="text-primary-text-gray">{">"}</span>}

              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-primary-text-gray hover:text-primary-text"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-primary-text font-semibold">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
