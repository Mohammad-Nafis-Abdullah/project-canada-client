import { Accordion, Box, Grid, Title } from "@mantine/core";
import { PropsWithChildren } from "react";
import classes from "./form.module.css";

type StepperFormLayoutProps = PropsWithChildren<{
  faqs?: Array<{ question: string; answer: string }>;
  title: string;
}>;

const StepperFormLayout = ({
  children,
  title,
  faqs
}: StepperFormLayoutProps) => {
  const items = faqs?.map((item, idx) => (
    <Accordion.Item key={idx} value={idx.toString()}>
      <Accordion.Control>{item.question}</Accordion.Control>
      <Accordion.Panel>{item.answer}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Box mt="lg">
      <Title order={3} style={{ color: "var(--mantine-color-primary-6)" }}>
        {title}
      </Title>
      <Grid gutter="xl" mt="md">
        <Grid.Col
          span={8}
          style={{ borderRight: "1px solid var(--mantine-color-gray-2)" }}
        >
          {children}
        </Grid.Col>
        <Grid.Col span={4}>
          {faqs && (
            <Accordion
              variant="contained"
              defaultValue="0"
              classNames={{ label: classes.accordion_label }}
            >
              {items}
            </Accordion>
          )}
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default StepperFormLayout;
