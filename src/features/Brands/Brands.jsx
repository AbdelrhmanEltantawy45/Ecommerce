import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import { getBrands } from "../../app/Context/Redux/ProductSlice";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Brands() {
  const [isLoading, setIsLoading] = useState(true);

  let { brands } = useSelector((state) => state.productRed);
  let dispatch = useDispatch();

  async function getdata() {
    await dispatch(getBrands());
    setIsLoading(false);
  }

  useEffect(() => {
    getdata();
  }, []);

  return (
    <main className="min-h-screen bg-[#f6ede4] pt-16">
      <section className="mx-auto max-w-screen-xl px-4 py-10">
        {/* Page header */}
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-rose-400">
            The houses we carry
          </p>
          <h1 className="font-serif text-3xl font-bold text-emerald-950 md:text-5xl">
            All brands
          </h1>
          <p className="mt-3 max-w-xl text-slate-600">
            Discover the makers behind every carefully chosen piece.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {brands?.map((brand) => (
              <Link
                key={brand._id}
                to={`/brandDetails/${brand._id}`}
                className="group block"
              >
                <Card className="overflow-hidden rounded-2xl border-stone-200 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex h-36 items-center justify-center bg-[#fbf8f3] p-6 sm:h-44">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex items-center justify-between border-t border-stone-200 px-4 py-3">
                    <h3 className="line-clamp-1 font-serif text-base font-bold text-emerald-950">
                      {brand.name}
                    </h3>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-rose-400" />
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