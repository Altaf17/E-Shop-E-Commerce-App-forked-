import React, { useEffect } from "react";
import Slider from "../../Components/slider/Slider";
import "./Home.module.scss";
import Products from "../../Components/Products/Products";
const Home = () => {
  const url = window.location.href;

  const scrollToProduct = () => {
    if (url.includes("#products")) {
      window.scrollTo({
        top: 700,
        behavior: "smooth"
      });
      return;
    }
  };

  useEffect(() => {
    scrollToProduct();
  }, []);
  return (
    <>
      <Slider />
      <Products />
    </>
  );
};

export default Home;
