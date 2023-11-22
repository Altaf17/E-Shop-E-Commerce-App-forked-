import { useState, useEffect } from "react";
import { sliderData } from "./Slider-Data";
import { AiOutlineArrowLeft } from "react-icons/ai/index";
import { AiOutlineArrowRight } from "react-icons/ai/index";
import "./Slider.scss";
const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
      };
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide, slideInterval, autoScroll]);

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
  return (
    <div className="slider">
      <AiOutlineArrowLeft className=" arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className=" arrow next" onClick={nextSlide} />
      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;
        return (
          <div
            className={index === currentSlide ? "slide current " : "slide"}
            key={index}
          >
            {index === currentSlide && (
              <>
                <img src={image} alt="sliderImg" />
                <div className="content">
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr />
                  <a href="#product">
                    <button
                      className="--btn --btn-primary"
                      onClick={scrollToProduct}
                    >
                      Shop Now
                    </button>
                  </a>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
