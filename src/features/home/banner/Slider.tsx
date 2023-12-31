import React from "react";
import { Carousel } from "@mantine/carousel";
import { Box, Image, Paper, rem } from "@mantine/core";
import QuickBusinessWizardForm from "./QuickBannerWizerdForm";

const sliderImages = [
  "/images/slider-1.jpg",
  "/images/slider-2.jpeg",
  "/images/slider-3.jpeg"
];

const TopSlider = () => {
  return (
    <Box pos="relative">
      <Carousel
        withControls={false}
        withIndicators
        loop
        height={`calc(100vh - ${rem(100)})`}
        dragFree
        slideGap="md"
        align="start"
      >
        {sliderImages.map((slider, idx) => (
          <Carousel.Slide key={idx}>
            <Image src={slider} alt={`slider image - ${idx + 1}`} />
          </Carousel.Slide>
        ))}

        {/* ...other slides */}
      </Carousel>

      <Paper
        shadow="sm"
        radius={"md"}
        className="absolute -bottom-5 right-5 overflow-hidden"
      >
        <QuickBusinessWizardForm />
      </Paper>
    </Box>
  );
};

export default TopSlider;
