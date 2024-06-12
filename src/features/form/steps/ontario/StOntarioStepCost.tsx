import {
  Box,
  Flex,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { LABELMAP } from "~/lib/summaries/ontarioSummaries";
import { ontarioPackages } from "~/pages/incorporate/standard-corporation/ontario-corporation";
import { stOntarioInitials } from "~/utils/schemas";

export function RenderRow({
  title,
  value
}: {
  title: string;
  value: string | undefined;
}) {
  return (
    <Flex align="center" gap="xs">
      <Text size="md" style={{ fontWeight: 500 }}>
        {LABELMAP[title] ? LABELMAP[title] : title}:
      </Text>
      <Text size="md" style={{ fontWeight: 800 }}>
        {value || 0}
      </Text>
    </Flex>
  );
}

type StOntarioStepCostProps = {
  form: UseFormReturnType<typeof stOntarioInitials>;
};

const StOntarioStepCost = ({ form }: StOntarioStepCostProps) => {
  const ontarioPkg = ontarioPackages.find(
    (item) => item.id === form.values.packageId
  );

  const obj = {
    ...form.values,
    package: {
      name: ontarioPkg?.name,
      price: ontarioPkg?.price
    }
  };

  return (
    <>
      <Title
        order={3}
        mt="xl"
        style={{
          textAlign: "center"
        }}
      >
        Price Summary
      </Title>
      <Paper maw={960} mx="auto" shadow="lg" p="xl">
        <Stack gap="xs">
          <RenderRow
            title="Package"
            value={`${obj.package.name} ${obj.package.price}`}
          />

          <RenderRow
            title="Article of Incorpation"
            value={`${obj.articleOfIncorporation}`}
          />

          <SimpleGrid cols={3} spacing="xl" mt="xl">
            <Box>
              <Title order={6}>CRA Registration</Title>
              <Stack mt="xs" gap="xs">
                {Object.entries(obj.craRegistration).map(([key, value]) => {
                  return <RenderRow key={key} title={key} value={value} />;
                })}
              </Stack>
            </Box>

            <Box>
              <Title order={6}>Other Registration</Title>
              <Stack mt="xs" gap="xs">
                {Object.entries(obj.otherRegistration).map(([key, value]) => {
                  return <RenderRow key={key} title={key} value={value} />;
                })}
              </Stack>
            </Box>

            <Box>
              <Title order={6}>Supplies and Services</Title>
              <Stack mt="xs" gap="xs">
                {Object.entries(obj.suppliesAndServices).map(([key, value]) => {
                  return <RenderRow key={key} title={key} value={value} />;
                })}
              </Stack>
            </Box>
          </SimpleGrid>
        </Stack>
      </Paper>
    </>
  );
};

export default StOntarioStepCost;
