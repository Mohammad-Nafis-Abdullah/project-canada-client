import { Box, Flex, Stack, Text, Title } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { ontarioPackages } from "~/pages/incorporate/standard-corporation/ontario-corporation";
import { stOntarioInitials } from "~/utils/schemas";

type StOntarioStepCompleteProps = {
  form: UseFormReturnType<typeof stOntarioInitials>;
};

const StOntarioStepComplete = ({ form }: StOntarioStepCompleteProps) => {
  const ontarioPkg = ontarioPackages.find(
    (item) => item.id === form.values.packageId
  );

  const obj = {
    package: {
      name: ontarioPkg?.name,
      price: ontarioPkg?.price,
    },
    articleOfIncorporation: form.values.articleOfIncorporation,
    craRegistration: {
      ...form.values.craRegistration,
    },
    otherRegistration: {
      ...form.values.otherRegistration,
    },
    suppliesAndServices: {
      ...form.values.suppliesAndServices,
    },
  };

  return (
    <Box>
      <Stack gap="xs">
        <RenderRow
          title="Package"
          value={`${obj.package.name} ${obj.package.price}`}
        />

        <RenderRow
          title="Article of Incorpation"
          value={`${obj.articleOfIncorporation}`}
        />

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
      </Stack>
    </Box>
  );
};

export default StOntarioStepComplete;

function RenderRow({
  title,
  value,
}: {
  title: string;
  value: string | undefined;
}) {
  return (
    <Flex align="center" gap="xs">
      <Text size="md" style={{ fontWeight: 500 }}>
        {title}:
      </Text>
      <Text size="md" style={{ fontWeight: 800 }}>
        {value}
      </Text>
    </Flex>
  );
}
