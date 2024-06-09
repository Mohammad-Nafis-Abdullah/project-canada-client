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
import { ontarioPackages } from "~/pages/incorporate/standard-corporation/ontario-corporation";
import { stOntarioInitials } from "~/utils/schemas";

const labelMap: { [key: string]: string } = {
  gstHstReg: "GST/HST Registration",
  payrollReg: "Payroll Registration",
  importExportReg: "Import/Export Registration",
  dividendAccReg: "Dividend Account Registration",
  initialReturn: "Initial Return",
  wsib: "WSIB",
  domainReg: "Domain Registration",
  emailReg: "Email Registration",
  corporateSeal: "Corporate Seal",
  PhysicalMinuteBook: "Physical minute book",
  oneYearServiceSupport: "One year service support",
  annualReturn: "Annual Return"
};

function RenderRow({
  title,
  value
}: {
  title: string;
  value: string | undefined;
}) {
  return (
    <Flex align="center" gap="xs">
      <Text size="md" style={{ fontWeight: 500 }}>
        {labelMap[title] ? labelMap[title] : title}:
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
    package: {
      name: ontarioPkg?.name,
      price: ontarioPkg?.price
    },
    articleOfIncorporation: form.values.articleOfIncorporation,
    craRegistration: {
      ...form.values.craRegistration
    },
    otherRegistration: {
      ...form.values.otherRegistration
    },
    suppliesAndServices: {
      ...form.values.suppliesAndServices
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
