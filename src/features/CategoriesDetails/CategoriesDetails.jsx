import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoriesDetails() {
  const [catDetails, setCatDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  let { id } = useParams();

  async function getCategoriesDetails() {
    setIsLoading(true);
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
      .then((response) => {
        setCatDetails(response?.data?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

 
  useEffect(() => {
    getCategoriesDetails();
  }, [id]);

  return (
    <main className="min-h-screen bg-[#f6ede4] pt-16">
      <div className="mx-auto max-w-screen-xl px-4 py-8 md:py-10">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-1 text-sm text-slate-600">
          <Link to="/" className="hover:text-emerald-950">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/categories" className="hover:text-emerald-950">
            Categories
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-emerald-950">{catDetails?.name}</span>
        </nav>

        {isLoading ? (
          <div className="grid gap-8 rounded-3xl bg-white p-4 md:grid-cols-2 md:p-8">
            <Skeleton className="aspect-square w-full rounded-2xl" />
            <div className="space-y-4 self-center">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-12 w-40 rounded-lg" />
            </div>
          </div>
        ) : (
          <div className="grid items-center gap-8 overflow-hidden rounded-3xl border border-stone-200 bg-white p-4 shadow-sm md:grid-cols-2 md:p-8 lg:gap-14">
            {/* Image */}
            <div className="aspect-square overflow-hidden rounded-2xl bg-[#fbf8f3]">
              <img
                src={catDetails?.image}
                alt={catDetails?.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Info */}
            <div>
              <Badge className="rounded-full bg-rose-100 px-3 text-xs font-semibold uppercase tracking-wide text-rose-500 hover:bg-rose-100">
                Category
              </Badge>

              <h1 className="mt-4 text-4xl font-bold leading-tight text-emerald-950 md:text-5xl">
                {catDetails?.name}
              </h1>

              <p className="mt-5 max-w-md leading-relaxed text-slate-600">
                A curated selection of pieces from our {catDetails?.name}{" "}
                collection, chosen for quality and made to last.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  className="h-12 rounded-lg bg-emerald-950 px-6 font-semibold text-white hover:bg-emerald-900"
                >
                  <Link to="/product" className="text-white">Shop the collection</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-lg border-stone-300 bg-white px-6 font-semibold text-slate-700 hover:bg-[#fbf8f3]"
                >
                  <Link to="/categories" className="flex items-center text-slate-700">
                    <ArrowLeft className="mr-2 h-4 w-4 " /> 
                    <p>All categories</p>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}