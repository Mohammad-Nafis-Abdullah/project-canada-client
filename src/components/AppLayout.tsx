import { Box } from "@mantine/core";
import { PropsWithChildren } from "react";
import { Header } from "~/features/home/navbar/Header";

const AppLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Box>
      <Header />

      {children}
    </Box>
  );
};

export default AppLayout;
