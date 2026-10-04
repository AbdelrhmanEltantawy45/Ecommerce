import React from "react";
import FeatureProducts from "../FeatureProducts/FeatureProducts";

export default function Products() {
  return (
    <main className="min-h-screen bg-[#f6ede4] pt-16">
      {/* Page header */}
      <section className="mx-auto max-w-screen-xl px-4 pt-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-rose-400">
          Our collection
        </p>
        <h1 className="font-serif text-3xl font-bold text-emerald-950 md:text-5xl">
          All products
        </h1>
        <p className="mt-3 max-w-xl text-slate-600">
          Browse every carefully chosen piece in the boutique.
        </p>
      </section>

      <FeatureProducts showHeading={false} />
    </main>
  );
}