import React from "react";
import { Outlet } from "react-router-dom";
import AuthImage from "../../../../src/assets/authimage.jpg";

export default function AuthLayout({ children }) {
  return (
    <>
    <div className="min-h-screen bg-[#f6ede4] p-4 md:p-4 ">
      <div className="mx-auto grid px-20 min-h-[calc(100vh-2rem)] max-w-[1500px] gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        {/* Left image panel */}
        <aside className="relative hidden overflow-hidden rounded-2xl lg:block hover:scale-105 transition-transform duration-500">
          <img
            src={AuthImage}
            alt="Signature collection"
            className="absolute inset-0 h-full w-full object-cover "
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider opacity-90">
              The Signature Collection
            </p>
            <h2 className="font-serif text-3xl leading-tight">
              Objects of permanence, chosen
            </h2>
          </div>
        </aside>

        {/* Right content panel */}
        <main className="flex items-center rounded-2xl bg-white px-6 py-10 sm:px-12 lg:px-14">
          <div className="w-full">{children ?? <Outlet />}</div>
        </main>
      </div>
    </div>
    </>
  );
}