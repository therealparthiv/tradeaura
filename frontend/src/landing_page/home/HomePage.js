import React from "react";
import Hero from "./Hero";
import Stats from "./Stats";
import OpenAccount from "../OpenAccount";
import ProductsPreview from "./ProductsPreview";
import Education from "./Education"; // This component will be updated with Groww info

function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ProductsPreview />
      <Education />
      <OpenAccount />
    </>
  );
}
export default HomePage;
