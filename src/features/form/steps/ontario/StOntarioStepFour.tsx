import {
  ActionIcon,
  Box,
  Button,
  Group,
  Radio,
  Select,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  TextInput,
  Title
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import {
  residencyStatus,
  stAlbertaInitials,
  stOntarioInitials
} from "~/utils/schemas";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { pageFourFaqs } from "~/utils/faqs";
import StepperFormLayout from "../../StepperFormLayout";

type StOntarioStepFourProps = {
  form: UseFormReturnType<typeof stOntarioInitials>;
};

const StOntarioStepFour = ({ form }: StOntarioStepFourProps) => {
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
            label="Is this director an Incorporator ?"
            {...form.getInputProps(
              `directors.${index}.isDirectorAnIncorporator`
            )}
          >
            <Radio value="director" mt="xs" label="Director" />
            <Radio value="incorporator" my="xs" label="Representative" />
          </Radio.Group>

          <Radio.Group
            label="Do you have more Incorporator ?"
            {...form.getInputProps(`directors.${index}.isHaveMoreIncorporator`)}
          >
            <Radio value="YES" mt="xs" label="Yes" />
            <Radio value="NO" my="xs" label="No" />
          </Radio.Group>
        </Stack>

        {item.isHaveMoreIncorporator === "YES" && (
          <>
            <Title mt="xl" order={6}>
              Individual
            </Title>
            <Stack>
              <TextInput
                label="First Name"
                {...form.getInputProps(
                  `directors.${index}.individual.firstName`
                )}
              />
              <TextInput
                label="Middle Name"
                {...form.getInputProps(
                  `directors.${index}.individual.middleName`
                )}
              />
              <TextInput
                label="Last Name"
                {...form.getInputProps(
                  `directors.${index}.individual.lastName`
                )}
              />
            </Stack>

            <Title mt="lg" order={6}>
              Corporation
            </Title>
            <Stack>
              <TextInput
                label="Corporation Name"
                {...form.getInputProps(`directors.${index}.corporation.name`)}
              />
              <TextInput
                label="OCN(Ontario Corporation Number)"
                {...form.getInputProps(`directors.${index}.corporation.ocn`)}
              />
            </Stack>
          </>
        )}
      </Box>
    </Box>
  ));

  return (
    <StepperFormLayout>
      <Stack gap="lg">
        <Radio.Group
          label="Are you a director or Representative?"
          {...form.getInputProps("isDirectorOrRepresentative")}
        >
          <Radio value="director" mt="xs" label="Director" />
          <Radio value="representative" my="xs" label="Representative" />
        </Radio.Group>

        {form.values.isDirectorOrRepresentative === "representative" && (
          <>
            <Box>
              <Title order={6}>
                Will be contacted if further information needed
              </Title>
              <SimpleGrid cols={2}>
                <TextInput
                  label="First Name"
                  {...form.getInputProps("representative.firstName")}
                />
                <TextInput
                  label="Middle Name"
                  {...form.getInputProps("representative.middleName")}
                />
                <TextInput
                  label="Last Name"
                  {...form.getInputProps("representative.lastName")}
                />
                <TextInput
                  label="Contact Number"
                  {...form.getInputProps("representative.phone")}
                />
                <TextInput
                  label="Address"
                  description="Same as Organization address Or, Provide Complete Address"
                  {...form.getInputProps("representative.address")}
                />
              </SimpleGrid>
            </Box>
          </>
        )}

        {form.values.isDirectorOrRepresentative === "director" && (
          <>
            {fields.slice(0, 1)}

            <Box>
              <Title order={4}>Additional Director</Title>
              {fields.slice(1)}

              <Button
                mt="lg"
                disabled={fields.length === 2}
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
          </>
        )}
      </Stack>
    </StepperFormLayout>
  );
};

export default StOntarioStepFour;

const textMap: { [key: number]: string } = {
  1: "2nd Director's Information"
};
