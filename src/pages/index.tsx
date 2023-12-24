import { Box, Button, Flex } from "@mantine/core";
import { Inter } from "next/font/google";
import { Header } from "~/components/Header";
import TopSlider from "~/features/banner/Slider";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Header />
      <TopSlider />
    </>
  );
}
