"use client";

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-lg font-semibold text-primary-text">
              Linea Jewelry Inc.
            </h2>
            <p className="mt-3 text-sm text-primary-text-gray">
              Minimalist jewelry crafted for the modern individual
            </p>

            <div className="mt-6 text-sm text-primary-text-gray">
              <p className="font-medium text-primary-text">Visit Us</p>
              <p className="mt-1">
                123 Madison Avenue
                <br />
                New York, NY 10016
              </p>
            </div>

            <div className="mt-4 text-sm text-primary-text-gray">
              <p className="font-medium text-primary-text">Contact</p>
              <p className="mt-1">+1 (212) 555-0123</p>
              <p>hello@lineajewelry.com</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-primary-text">Shop</h3>
            <ul className="mt-4 space-y-3 text-sm text-primary-text-gray">
              <li>New In</li>
              <li>Rings</li>
              <li>Earrings</li>
              <li>Bracelets</li>
              <li>Necklaces</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-primary-text">Support</h3>
            <ul className="mt-4 space-y-3 text-sm text-primary-text-gray">
              <li>Size Guide</li>
              <li>Care Instructions</li>
              <li>Returns</li>
              <li>Shipping</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-primary-text">Connect</h3>
            <ul className="mt-4 space-y-3 text-sm text-primary-text-gray">
              <li>Instagram</li>
              <li>Pinterest</li>
              <li>Newsletter</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-6 py-6 text-sm text-primary-text-gr md:flex-row">
          <p>© {new Date().getFullYear()} Linea. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
