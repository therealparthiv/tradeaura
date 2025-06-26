import React from "react";

function Hero() {
  return (
    <div className="container p-5">
      <div className="row text-center">
        <div className="col">
          <img
            src="media\images\homeHero.png"
            alt="Hero Image"
            className="mb-5"
            style={{
              width: "100%",
              height: "100vh", // limit height to viewport
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <h1 className="mt-5">Invest in Everything</h1>
          <p> Trade Aura </p>
          <button
            className="p-2 btn btn-primary fs-5"
            style={{ width: "20%", margin: "0 auto" }}>
            Signup Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
