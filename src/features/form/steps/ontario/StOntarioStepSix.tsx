import {
  ActionIcon,
  Alert,
  Box,
  Button,
  Group,
  List,
  Radio,
  Select,
  SimpleGrid,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconInfoCircle, IconPlus, IconTrash } from "@tabler/icons-react";
import { stOntarioInitials } from "~/utils/schemas";
import StepperFormLayout from "../../StepperFormLayout";

type StOntarioStepSixProps = {
  form: UseFormReturnType<typeof stOntarioInitials>;
};

const textMap: { [key: number]: string } = {
  1: "2nd",
  2: "3rd",
  3: "4th",
  4: "5th",
  5: "6th",
};

const StOntarioStepSix = ({ form }: StOntarioStepSixProps) => {
  const fields = form.values.officerOfCorporations.map((item, index) => (
    <Box key={item.key + index}>
      {index > 0 && (
        <Group justify="space-between" align="center">
          <Title order={6} mb={"xs"} mt={"xl"}>
            {textMap[index]} Officer&apos;s Information
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
        {/* <Title order={4} mb={"md"} mt={"lg"}>{`Officer's Information`}</Title> */}
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
              "Program Manager",
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
                disabled={fields.length === 6}
                leftSection={<IconPlus size={16} />}
                onClick={() =>
                  form.insertListItem("officerOfCorporations", {
                    ...stOntarioInitials["officerOfCorporations"][0],
                    label: "Additional",
                  })
                }
              >
                Add more Officers
              </Button>
            </Box>
          </Box>
        )}

        {form.values.isBylawsAndMinuteBook === "NO" && (
          <Alert
            variant="light"
            color="red"
            title="ATTENTION"
            icon={<IconInfoCircle />}
          >
            You&apos;re skipping the following information as you didn&apos;t
            select MinuteBook & Bylaws.
            <List listStyleType="decimal">
              <List.Item>Shareholder(s)</List.Item>
              <List.Item>Share Number(s) & Price(s)</List.Item>
              <List.Item>Officer(s) & Officer(s) Designation</List.Item>
            </List>
          </Alert>
        )}
      </Stack>
    </StepperFormLayout>
  );
};

export default StOntarioStepSix;
