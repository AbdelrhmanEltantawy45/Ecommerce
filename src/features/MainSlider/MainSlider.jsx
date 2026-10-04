import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { Link } from "react-router-dom";
import { RotateCcw, ShieldCheck, Truck } from "lucide-react";

import slider3 from "./../../assets/slider-2 (1).jpeg";
import slider4 from "./../../assets/slider-image-1 (1).jpeg";
import slider5 from "./../../assets/slider-image-2 (1).jpeg";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const slides = [
  {
    src: slider3,
    title: "Fresh picks, delivered to your door",
    text: "A carefully chosen selection, packed with care.",
    cta: "Shop now",
    to: "/product",
  },
  {
    src: slider4,
    title: "Objects of permanence, chosen",
    text: "Pieces made to last, selected for quality.",
    cta: "Explore collection",
    to: "/categories",
  },
  {
    src: slider5,
    title: "Exclusive offers for members",
    text: "Early access to new arrivals and special prices.",
    cta: "Discover more",
    to: "/product",
  },
];

const perks = [
  { icon: Truck, title: "Fast delivery", text: "Right to your door" },
  { icon: ShieldCheck, title: "Secure payment", text: "Protected checkout" },
  { icon: RotateCcw, title: "Easy returns", text: "Hassle-free process" },
];

export default function MainSlider() {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api]);

  const slide = slides[current];

  return (
    <section className="mx-auto max-w-screen-xl px-4 py-6 md:py-8">
      {/* Hero */}
      <div className="relative">
        <Carousel
          setApi={setApi}
          opts={{ loop: true }}
          plugins={[
            Autoplay({ delay: 5000, stopOnInteraction: false }),
            Fade(),
          ]}
          className="group"
        >
          <CarouselContent className="ml-0">
            {slides.map((s, i) => (
              <CarouselItem key={i} className="pl-0">
                <img
                  src={s.src}
                  alt={s.title}
                  className="h-[300px] w-full rounded-2xl object-cover sm:h-[400px] lg:h-[500px]"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-4 hidden border-0 bg-white/90 text-emerald-950 opacity-0 shadow-sm transition-opacity hover:bg-white group-hover:opacity-100 md:inline-flex" />
          <CarouselNext className="right-4 hidden border-0 bg-white/90 text-emerald-950 opacity-0 shadow-sm transition-opacity hover:bg-white group-hover:opacity-100 md:inline-flex" />
        </Carousel>

        {/* Content card */}
        <div className="pointer-events-none absolute inset-x-4 bottom-4 sm:inset-x-auto sm:bottom-8 sm:left-8 lg:bottom-10 lg:left-10">
          <div className="pointer-events-auto max-w-sm rounded-xl bg-white p-5 shadow-lg sm:p-7">
            <h2 className="text-xl font-bold leading-snug text-emerald-950 sm:text-2xl">
              {slide.title}
            </h2>
            <p className="mt-2 text-sm text-slate-600">{slide.text}</p>

            <div className="mt-5 flex items-center justify-between gap-4">
              <Button
                asChild
                className="h-10 rounded-lg bg-emerald-950 px-5 text-sm font-semibold text-white hover:bg-emerald-900"
              >
                <Link className="text-rose-300 " to={slide.to}>{slide.cta}</Link>
              </Button>

              <div className="flex gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => api?.scrollTo(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      current === i
                        ? "w-5 bg-emerald-950"
                        : "w-1.5 bg-stone-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Perks */}
      <ul className="mt-6 grid gap-4 rounded-2xl border border-stone-200 bg-white p-5 sm:grid-cols-3">
        {perks.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f6ede4] text-emerald-950">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-emerald-950">{title}</p>
              <p className="text-xs text-slate-500">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}