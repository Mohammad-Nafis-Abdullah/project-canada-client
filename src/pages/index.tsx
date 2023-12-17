import { Box, Button } from "@mantine/core";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <h1 className="bg-red-600">Hello world!</h1>
      <Button color="red">send me</Button>
    </div>
  );
}
