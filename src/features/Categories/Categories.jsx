import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import { getCategories } from "../../app/Context/Redux/ProductSlice";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Categories() {
  let { categories } = useSelector((state) => state.productRed);
 
  const [isLoading, setIsLoading] = useState(true);
  let dispatch = useDispatch();

  async function getdatacat() {
    await dispatch(getCategories());
    setIsLoading(false);
  }

  useEffect(() => {
    getdatacat();
  }, []);

  return (
    <main className="min-h-screen bg-[#f6ede4] pt-16">
      <section className="mx-auto max-w-screen-xl px-4 py-10">
        {/* Page header */}
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-rose-400">
            Browse
          </p>
          <h1 className="font-serif text-3xl font-bold text-emerald-950 md:text-5xl">
            All categories
          </h1>
          <p className="mt-3 max-w-xl text-slate-600">
            Explore the boutique by category and find what you're looking for.
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/5] w-full rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories?.map((cat) => (
              <Link
                key={cat._id}
                to={`/categoriesdetails/${cat._id}`}
                className="group block"
              >
                <Card className="relative overflow-hidden rounded-3xl border-stone-200 bg-white p-0 shadow-sm transition-shadow hover:shadow-xl">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/10 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white sm:p-6">
                    <div>
                      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-rose-200">
                        Category
                      </p>
                      <h3 className="font-serif text-2xl font-bold leading-tight">
                        {cat.name}
                      </h3>
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-emerald-950 transition-colors group-hover:bg-rose-300">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}