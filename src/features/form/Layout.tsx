import { Box, Container, Title } from "@mantine/core";
import { PropsWithChildren } from "react";
import AppLayout from "~/components/AppLayout";
import ShowBreadcrumbs from "~/components/breadCrumbs";

interface FormLayoutProps {
  name: string;
}

const FormLayout = ({ children, name }: PropsWithChildren<FormLayoutProps>) => {
  return (
    <AppLayout>
      <Container size="xl">
        <Box mt="xl">
          <Title order={2} mb="sm">
            {name}
          </Title>
          <ShowBreadcrumbs />
        </Box>
        {children}
      </Container>
    </AppLayout>
  );
};

export default FormLayout;
