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
import { useEffect, useState } from "react";
import { randomId } from "@mantine/hooks";

type StOntarioStepIncorporateProps = {
  form: UseFormReturnType<typeof stOntarioInitials>;
};

const textMap: { [key: number]: string } = {
  1: "2nd",
  2: "3rd",
  3: "4th",
  4: "5th"
};

const incorporatorInitial = {
  label: "Primary",
  key: randomId(),
  firstName: "",
  middleName: "",
  lastName: "",
  phone: "",
  email: "",
  isCompleteAddress: "",
  address: "",
  city: "",
  postalCode: "",
  province: "Ontario Corporation",
  suite: "",
  residencyStatus: "",
  individual: {
    firstName: "",
    middleName: "",
    lastName: ""
  },
  corporation: {
    name: "",
    ocn: ""
  }
};

const StOntarioStepIncorporate = (props: StOntarioStepIncorporateProps) => {
  const { form } = props;

  const fields = form.values.incorporators.map(
    (item: typeof incorporatorInitial, index) => (
      <Box key={item.key}>
        {index > 0 && (
          <Group justify="space-between" align="center">
            <Title order={6} mt="lg" mb="xs">
              {textMap[index]} Incorporator&apos;s Information
            </Title>
            <ActionIcon
              color="red"
              variant="subtle"
              onClick={() => form.removeListItem("incorporators", index)}
            >
              <IconTrash size="1rem" />
            </ActionIcon>
          </Group>
        )}
        <Box>
          <SimpleGrid cols={2}>
            <TextInput
              label="First Name"
              {...form.getInputProps(`incorporators.${index}.firstName`)}
            />
            <TextInput
              label="Middle Name"
              {...form.getInputProps(`incorporators.${index}.middleName`)}
            />
            <TextInput
              label="Last Name"
              {...form.getInputProps(`incorporators.${index}.lastName`)}
            />
            <Select
              label="Residency Status"
              placeholder="Select one"
              data={residencyStatus}
              {...form.getInputProps(`incorporators.${index}.residencyStatus`)}
            />
            <TextInput
              label="Contact Number"
              {...form.getInputProps(`incorporators.${index}.phone`)}
            />
            <TextInput
              label="Email Address"
              {...form.getInputProps(`incorporators.${index}.email`)}
            />
          </SimpleGrid>

          <Stack mt="lg">
            <Radio.Group
              label="Address"
              {...form.getInputProps(
                `incorporators.${index}.isCompleteAddress`
              )}
            >
              <Radio
                value="corporation"
                mt="xs"
                label="Same as business address"
              />
              <Radio
                value="complete"
                my="xs"
                label="Provide complete address"
              />
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
                    {...form.getInputProps(`incorporators.${index}.address`)}
                  />
                  <TextInput
                    label="Suite/Unit"
                    {...form.getInputProps(`incorporators.${index}.suite`)}
                  />
                  <TextInput
                    label="City"
                    {...form.getInputProps(`incorporators.${index}.city`)}
                  />

                  <Select
                    label="Province"
                    placeholder="Select one"
                    data={province}
                    {...form.getInputProps(`incorporators.${index}.province`)}
                  />
                  <TextInput
                    label="Postal Code"
                    {...form.getInputProps(`incorporators.${index}.postalCode`)}
                  />
                </SimpleGrid>
              </>
            )}
          </Stack>
        </Box>
      </Box>
    )
  );

  return (
    <StepperFormLayout>
      <Stack gap="lg">
        <Title order={4}>Incorporators</Title>

        {fields.slice(0, 1)}

        <Box>
          <Title order={4}>Additional Incorporators</Title>
          {fields.slice(1)}

          <Button
            mt="lg"
            disabled={fields.length === 5}
            leftSection={<IconPlus size={16} />}
            onClick={() =>
              form.insertListItem("incorporators", {
                ...incorporatorInitial,
                label:
                  form.values.incorporators.length === 0
                    ? "Primary"
                    : "Additional"
              })
            }
          >
            Add more incorporators
          </Button>
        </Box>
      </Stack>
    </StepperFormLayout>
  );
};

export default StOntarioStepIncorporate;
