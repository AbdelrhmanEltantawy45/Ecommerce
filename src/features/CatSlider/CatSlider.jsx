import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AutoScroll from "embla-carousel-auto-scroll";
import { Link } from "react-router-dom";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function CatSlider() {
  function getCatSlider() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { data, isLoading } = useQuery({
    queryKey: ["catSlider"],
    queryFn: getCatSlider,
  });

  const categories = data?.data.data ?? [];


  const loopedCategories = [...categories, ...categories];

  return (
    <section className="mx-auto max-w-screen-xl px-4 py-8">
      {/* Heading */}
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-rose-400">
            Browse
          </p>
          <h2 className="font-serif text-2xl font-bold text-emerald-950 md:text-3xl">
            Shop by category
          </h2>
        </div>
        <Link
          to="/categories"
          className="hidden text-sm font-semibold text-rose-400 hover:underline sm:block"
        >
          View all
        </Link>
      </div>

      {isLoading ? (
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="flex shrink-0 basis-1/3 flex-col items-center gap-3 sm:basis-1/4 md:basis-1/5 lg:basis-[14.2857%]"
            >
              <Skeleton className="aspect-square w-full rounded-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      ) : (
        <Carousel
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
          }}
          plugins={[
            AutoScroll({
              speed: 1,
              startDelay: 0,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className="relative"
        >
          <CarouselContent className="-ml-3 sm:-ml-4">
            {loopedCategories.map((cat, i) => (
              <CarouselItem
                key={`${cat._id}-${i}`}
                className="basis-1/3 pl-3 sm:basis-1/4 sm:pl-4 md:basis-1/5 lg:basis-[14.2857%]"
              >
                <Link
                  to={`/categoriesdetails/${cat._id}`}
                  className="group/cat flex flex-col items-center text-center"
                >
                  <div className="aspect-square w-full overflow-hidden rounded-full border-2 border-stone-200 bg-white p-1 transition-all duration-300 group-hover/cat:border-rose-300 group-hover/cat:shadow-md">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      draggable={false}
                      className="h-full w-full rounded-full object-cover transition-transform duration-500 group-hover/cat:scale-110"
                    />
                  </div>
                  <p className="mt-3 line-clamp-1 text-sm font-medium text-emerald-950 transition-colors group-hover/cat:text-rose-400">
                    {cat.name}
                  </p>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

       
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#f6ede4] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#f6ede4] to-transparent" />
        </Carousel>
      )}
    </section>
  );
}