import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Radio,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { residencyStatus, stOntarioInitials } from "~/utils/schemas";
import StepperFormLayout from "../../StepperFormLayout";
import { province } from "~/utils/const";

export const standardProvince = [
  "Ontario Corporation",
  "BC Corporation",
  "Alberta Corporation",
  "Federal Corporation",
  "Quebec Corporation",
  "SK Corporation",
  "NB Corporation",
  "Manitoba Corporation",
  "NL Corporation",
  "NS Corporation",
  "PEI Corporation"
];

type StOntarioStepDirectorProps = {
  form: UseFormReturnType<typeof stOntarioInitials>;
};

const textMap: { [key: number]: string } = {
  1: "2nd",
  2: "3rd",
  3: "4th",
  4: "5th"
};

const StOntarioStepDirector = ({ form }: StOntarioStepDirectorProps) => {
  const fields = form.values.directors.map((item, index) => (
    <Box key={item.key}>
      {index > 0 && (
        <Group justify="space-between" align="center">
          <Title order={6} mt="lg" mb="xs">
            {textMap[index]} Director&apos;s Information
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
          <Select
            label="Residency Status"
            placeholder="Select one"
            data={residencyStatus}
            {...form.getInputProps(`directors.${index}.residencyStatus`)}
          />
          <TextInput
            label="Contact Number"
            {...form.getInputProps(`directors.${index}.phone`)}
          />
          <TextInput
            label="Email Address"
            {...form.getInputProps(`directors.${index}.email`)}
          />
        </SimpleGrid>

        <Stack mt="lg">
          <Radio.Group
            label="Address"
            {...form.getInputProps(`directors.${index}.isCompleteAddress`)}
          >
            <Radio
              value="corporation"
              mt="xs"
              label="Same as business address"
            />
            <Radio value="complete" my="xs" label="Provide complete address" />
          </Radio.Group>

          {item.isCompleteAddress === "corporation" && (
            <Box>
              {Object.keys(form.values.corporation).map((corp) => {
                const value =
                  form.values.corporation[corp as keyof FormData["values"]];

                const keyMap: { [key: string]: string } = {
                  address: "Address",
                  city: "City",
                  postalCode: "Postal Code",
                  apartment: "Appartment"
                };
                if (keyMap[corp as string] && value) {
                  return (
                    <Flex key={corp} align="center" gap="xs">
                      <Title order={6}>{keyMap[corp as string]}:</Title>
                      <Text size="md">{value}</Text>
                    </Flex>
                  );
                }
              })}
            </Box>
          )}

          {item.isCompleteAddress === "complete" && (
            <>
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

                <Select
                  label="Province"
                  placeholder="Select one"
                  data={province}
                  {...form.getInputProps(`directors.${index}.province`)}
                />
                <TextInput
                  label="Postal Code"
                  {...form.getInputProps(`directors.${index}.postalCode`)}
                />
              </SimpleGrid>
            </>
          )}
        </Stack>

        <Stack mt="lg">
          <Radio.Group
            label="Is this director an Incorporator ?"
            // {...form.getInputProps(
            //   `directors.${index}.isDirectorAnIncorporator`
            // )}
            value={item.isDirectorAnIncorporator}
            onChange={(value) => {
              if (value === "YES") {
                const { isDirectorAnIncorporator, ...rest } = item;
                form.insertListItem("incorporators", {
                  ...item,
                  label:
                    form.values.incorporators.length === 0
                      ? "Primary"
                      : "Additional"
                });
              }

              form.setFieldValue(
                `directors.${index}.isDirectorAnIncorporator`,
                value
              );
            }}
          >
            <Radio value="YES" mt="xs" label="YES" />
            <Radio value="NO" my="xs" label="NO" />
          </Radio.Group>
        </Stack>
      </Box>
    </Box>
  ));

  return (
    <StepperFormLayout>
      <Stack gap="lg">
        <Title order={4}>Director</Title>
        {fields.slice(0, 1)}

        <Box>
          <Title order={4}>Additional Director</Title>
          {fields.slice(1)}

          <Button
            mt="lg"
            disabled={fields.length === 5}
            leftSection={<IconPlus size={16} />}
            onClick={() =>
              form.insertListItem("directors", {
                ...stOntarioInitials["directors"][0],
                label: "Additional"
              })
            }
          >
            Add more directors
          </Button>
        </Box>
      </Stack>
    </StepperFormLayout>
  );
};

export default StOntarioStepDirector;
