import {
  ActionIcon,
  Box,
  Button,
  Group,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  TextInput,
  Title
} from "@mantine/core";
import StepperFormLayout from "../StepperFormLayout";
import { UseFormReturnType } from "@mantine/form";
import { stAlbertaInitials } from "~/utils/schemas";
import { IconTrash } from "@tabler/icons-react";

type StAlbertStepFiveProps = {
  form: UseFormReturnType<typeof stAlbertaInitials>;
};

const StAlbertStepFive = ({ form }: StAlbertStepFiveProps) => {
  const fields = form.values.directors.map((item, index) => (
    <Box key={item.key}>
      {index > 0 && (
        <Group justify="space-between" align="center">
          <Title order={6} mt="lg" mb="xs">
            {textMap[index]}
          </Title>
          <ActionIcon
            color="red"
            variant="subtle"
            onClick={() => form.removeListItem("directors", index)}
          >
            <IconTrash size="1rem" />
          </ActionIcon>
        </Group>
      )}
      <Box>
        <SimpleGrid cols={2}>
          <TextInput
            label="First Name"
            {...form.getInputProps(`directors.${index}.firstName`)}
          />
          <TextInput
            label="Middle Name"
            {...form.getInputProps(`directors.${index}.middleName`)}
          />
          <TextInput
            label="Last Name"
            {...form.getInputProps(`directors.${index}.lastName`)}
          />
          <TextInput
            label="Phone"
            {...form.getInputProps(`directors.${index}.phone`)}
          />
          <TextInput
            label="Email Address"
            {...form.getInputProps(`directors.${index}.email`)}
          />
        </SimpleGrid>

        <Box mt="lg">
          <Title order={6}>Complete address:</Title>
          <SimpleGrid cols={2}>
            <TextInput
              label="Street Address"
              {...form.getInputProps(`directors.${index}.address`)}
            />
            <TextInput
              label="Suite/Unit"
              {...form.getInputProps(`directors.${index}.suite`)}
            />
            <TextInput
              label="City"
              {...form.getInputProps(`directors.${index}.city`)}
            />
            <TextInput
              label="Province"
              {...form.getInputProps(`directors.${index}.province`)}
            />
            <TextInput
              label="Postal Code"
              {...form.getInputProps(`directors.${index}.postalCode`)}
            />
            <TextInput
              label="Po Box"
              {...form.getInputProps(`directors.${index}.poBox`)}
            />
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  ));

  return (
    <StepperFormLayout title="Director List">
      <Stack gap="lg">
        <Title order={4}>Primary Director</Title>
        {fields.slice(0, 1)}

        <Box>
          <Title order={4}>Additional Director</Title>
          <Text size="md">Do you want to add more directors?</Text>

          {fields.slice(1)}

          <Button
            mt="lg"
            disabled={fields.length === 4}
            onClick={() =>
              form.insertListItem(
                "directors",
                stAlbertaInitials["directors"][0]
              )
            }
          >
            Add more directors
          </Button>
        </Box>
      </Stack>

      {fields.length === 4 && (
        <Text size="md" mt="sm">
          <strong>Note:</strong> If you want to add more than 4 directors, you
          may need to place a customized order. For now, you can place an order
          with these five directors and afterwards, give us a call to convert it
          into a customized order.
        </Text>
      )}
    </StepperFormLayout>
  );
};

export default StAlbertStepFive;

const textMap: { [key: number]: string } = {
  1: "2nd Director's Information",
  2: "3rd Director's Information",
  3: "4th Director's Information"
};
