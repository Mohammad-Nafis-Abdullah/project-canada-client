import { Inter } from "next/font/google";
import TopSlider from "~/features/home/banner/Slider";
import { Header } from "~/features/home/navbar/Header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Header />
      <TopSlider />
    </>
  );
}
