import {
  Accordion,
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

type StOntarioStepSixProps = {
  form: UseFormReturnType<typeof stOntarioInitials>;
};

const StOntarioStepSix = ({ form }: StOntarioStepSixProps) => {
  const fields = form.values.officerOfCorporations.map((item, index) => (
    <Box key={item.key}>
      {index > 0 && (
        <Group justify="space-between" align="center">
          <Title order={6} mt="lg" mb="xs">
            {textMap[index]}
          </Title>
          <ActionIcon
            color="red"
            variant="subtle"
            onClick={() => form.removeListItem("officerOfCorporations", index)}
          >
            <IconTrash size="1rem" />
          </ActionIcon>
        </Group>
      )}
      <Box>
        <SimpleGrid cols={2}>
          <TextInput
            label="First Name"
            {...form.getInputProps(`officerOfCorporations.${index}.firstName`)}
          />
          <TextInput
            label="Middle Name"
            {...form.getInputProps(`officerOfCorporations.${index}.middleName`)}
          />
          <TextInput
            label="Last Name"
            {...form.getInputProps(`officerOfCorporations.${index}.lastName`)}
          />

          <Select
            label="Designation"
            placeholder="Select one"
            data={[
              "President",
              "VP",
              "Secretary",
              "Treasurer",
              "Chief Financial Officer (CFO)",
              "Program Manager"
            ]}
            {...form.getInputProps(
              `officerOfCorporations.${index}.designation`
            )}
          />
        </SimpleGrid>
      </Box>
    </Box>
  ));

  return (
    <StepperFormLayout>
      <Stack gap="lg">
        <Radio.Group
          label="Do you want Bylaws & Minute Book"
          {...form.getInputProps("isBylawsAndMinuteBook")}
        >
          <Radio value="YES" mt="xs" label="Yes" />
          <Radio value="NO" my="xs" label="No" />
        </Radio.Group>

        {form.values.isBylawsAndMinuteBook === "YES" && (
          <Box>
            {fields.slice(0, 1)}

            <Box mt="xl">
              <Title order={4}>Additional Officer</Title>
              {fields.slice(1)}

              <Button
                mt="lg"
                disabled={fields.length === 2}
                leftSection={<IconPlus size={16} />}
                onClick={() =>
                  form.insertListItem("officerOfCorporations", {
                    ...stOntarioInitials["officerOfCorporations"][0],
                    label: "Additional"
                  })
                }
              >
                Add more Officers
              </Button>
            </Box>
          </Box>
        )}
      </Stack>
    </StepperFormLayout>
  );
};

export default StOntarioStepSix;

const textMap: { [key: number]: string } = {
  1: "2nd Officer's Information"
};
