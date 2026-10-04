import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

import NotFoundImg from "./../../assets/404.jpg";

import { Button } from "@/components/ui/button";

export default function Notfound() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#f6ede4] pt-16">
      <section className="mx-auto grid max-w-screen-xl items-center gap-10 px-4 py-12 md:py-20 lg:grid-cols-2">
        {/* Text */}
        <div className="text-center lg:text-left">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-rose-400">
            Error 404
          </p>

          <h1 className="font-serif text-7xl font-bold leading-none text-emerald-950 md:text-9xl">
            404
          </h1>

          <h2 className="mt-6 font-serif text-2xl font-bold text-emerald-950 md:text-4xl">
            This page has gone missing
          </h2>

          <p className="mx-auto mt-4 max-w-md text-slate-600 lg:mx-0">
            The page you're looking for doesn't exist or may have been moved.
            Let's get you back to something beautiful.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Button
              asChild
              className="h-12 rounded-lg bg-emerald-950 px-6 font-semibold text-white hover:bg-emerald-900"
            >
              <Link to="/" className="flex items-center">
                <Home className="mr-2 h-4 w-4 text-white" />
                <p className="text-white"> Back to home</p>
              </Link>
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              className="h-12 rounded-lg border-stone-300 bg-white px-6 font-semibold text-slate-700 hover:bg-[#fbf8f3]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Go back
            </Button>
          </div>
        </div>

        {/* Image */}
        <div className="overflow-hidden rounded-3xl">
          <img
            src={NotFoundImg}
            alt="Page not found"
            className="h-full max-h-[420px] w-full rounded-2xl object-contain"
          />
        </div>
      </section>
    </main>
  );
}