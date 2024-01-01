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

type StOntarioStepFiveProps = {
  form: UseFormReturnType<typeof stOntarioInitials>;
};

const StOntarioStepFive = ({ form }: StOntarioStepFiveProps) => {
  const articleOptions = [
    {
      label: "Standard. $0.00",
      value:
        "Used where one person is the only and entire shareholder. This structure does not allow giving shares without admin rights to friends or family members now or in future."
    },
    {
      label: "Advanced. $49",
      value:
        "Used commonly. It allows the owner(s) to own two types of shares: voting and non-voting. This share structure also allows friends or family members to own non-voting shares now or in future."
    },
    {
      label: "Custom. $99",
      value:
        "Used to personalize share structure based on preferences. This share structure allows to categorize shares into many types such as common, preferred, voting, non-voting etc. This also allows to put a custom clause in the articles of incorporation"
    }
  ];

  const items = articleOptions.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control>{item.label}</Accordion.Control>
      <Accordion.Panel>{item.value}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <StepperFormLayout>
      <Stack gap="lg">
        <Radio.Group
          label="Article of Incorporation"
          {...form.getInputProps("articleOfIncorporation")}
        >
          <Radio value="standard" mt="xs" label="Standard. $0.00" />
          <Radio value="advanced" my="xs" label="Advanced. $49" />
          <Radio value="custom" my="xs" label="Custom. $99" />
        </Radio.Group>

        <Accordion variant="contained">{items}</Accordion>
      </Stack>
    </StepperFormLayout>
  );
};

export default StOntarioStepFive;

const textMap: { [key: number]: string } = {
  1: "2nd Officer's Information"
};
