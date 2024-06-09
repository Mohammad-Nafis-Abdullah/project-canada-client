import { Paper, Stack, Title } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { ontarioPackages } from "~/pages/incorporate/standard-corporation/ontario-corporation";
import { stOntarioInitials } from "~/utils/schemas";

type StOntarioStepCostProps = {
  form: UseFormReturnType<typeof stOntarioInitials>;
};

const StOntarioStepInfo = ({ form }: StOntarioStepCostProps) => {
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
        Information Summary
      </Title>
      <Paper maw={960} mx="auto" shadow="lg" p="xl">
        <Stack gap="xs"></Stack>
      </Paper>
    </>
  );
};

export default StOntarioStepInfo;
