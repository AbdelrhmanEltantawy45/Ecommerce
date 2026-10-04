import React from "react";
import FeatureProducts from "../../../FeatureProducts/FeatureProducts";
import MainSlider from "../../../MainSlider/MainSlider";
import CatSlider from "../../../CatSlider/CatSlider";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6ede4] pt-16">
      <MainSlider />
      <CatSlider />
      <FeatureProducts />
    </main>
  );
}