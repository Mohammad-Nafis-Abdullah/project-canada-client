import React from "react";

import slide1 from "/images/slider-1.jpg";
import slide2 from "/images/slider-2.jpg";
import slide3 from "/images/slider-3.jpg";

const sliderImages = [slide1, slide2, slide3];

const TopSlider = () => {
  return <div className="h-[calc(100vh-100px)] overflow-hidden relative"></div>;
};

export default TopSlider;
