import { Box, Button } from "@mantine/core";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Box>
      <Button>Hello World</Button>
    </Box>
  );
}
