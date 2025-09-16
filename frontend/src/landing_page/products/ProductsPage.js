import React from "react";
import Hero from "./Hero";
import ProductSection from "./ProductSection";

function ProductsPage() {
  return (
    <>
      <Hero />
      <ProductSection
        imageURL="/media/images/mf_groww.webp"
        productName="Mutual Funds"
        productDescription="Explore over 5000+ direct mutual funds. Invest with SIP or lumpsum and enjoy 0% commission."
        isImageLeft={true}
      />
      <ProductSection
        imageURL="/media/images/growwLogo.svg"
        productName="Stocks"
        productDescription="A simple and fast trading platform. Trade on NSE & BSE with an intuitive interface and advanced charts."
        isImageLeft={false}
      />
      <ProductSection
        imageURL="/media/images/us_stocks_groww.png"
        productName="US Stocks"
        productDescription="Diversify your portfolio by investing in the US market. Buy and sell shares of companies like Apple, Google, and Amazon."
        isImageLeft={true}
      />
    </>
  );
}

export default ProductsPage;
