"use client";
import BlurText from "./BlurText";
import ProductsCard from "./GroupingCard";
import ImageSwapper from "./ImageSwapper";



export default function MainPage() {
  return (
    <div className="mb-[40px] ">
      <ImageSwapper  />
      <BlurText />
      <ProductsCard />
    </div>
  );
}
