import React from "react";
import "./ProductsPage.css"; // Import the new CSS

function ProductSection({
  imageURL,
  productName,
  productDescription,
  isImageLeft,
}) {
  const sectionClassName = isImageLeft
    ? "product-section"
    : "product-section image-right";

  return (
    <section className={sectionClassName}>
      <div className="text-container">
        <h2>{productName}</h2>
        <p>{productDescription}</p>
      </div>
      <div className="image-container">
        <img src={imageURL} alt={productName} />
      </div>
    </section>
  );
}

export default ProductSection;
