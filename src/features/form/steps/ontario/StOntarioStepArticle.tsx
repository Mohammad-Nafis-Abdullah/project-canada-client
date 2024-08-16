import {
  Accordion,
  Box,
  Radio,
  Stack,
  Text,
  Textarea,
  Title
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { stOntarioInitials } from "~/utils/schemas";
import StepperFormLayout from "../../StepperFormLayout";

type StOntarioStepArticleProps = {
  form: UseFormReturnType<typeof stOntarioInitials>;
};

const StOntarioStepArticle = ({ form }: StOntarioStepArticleProps) => {
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
          <Radio value="Standard $0.00" mt="xs" label="Standard. $0.00" />
          <Radio value="Advanced $49" my="xs" label="Advanced. $49" />
          <Radio value="Custom $99" my="xs" label="Custom. $99" />
        </Radio.Group>

        <Accordion variant="contained">{items}</Accordion>

        {form.values.articleOfIncorporation === "Custom $99" && (
          <Box>
            <Stack gap="lg">
              <Title order={4}>Shares & Provisions: Enter your text</Title>
              <Textarea
                minRows={3}
                label="Rights, Privileges, Restrictions and Conditions"
                {...form.getInputProps("rights")}
              />
              <Text size="md">
                Rights, privileges, restrictions and conditions(if any)
                attaching to each class of shares and {"directors'"} authority
                with respect to any class of shares which may be issued in
                series. If there is only one class of shares, enter{" "}
                {"Not Applicable"}
              </Text>

              <Textarea
                minRows={3}
                label="Restriction on Share Transfers"
                {...form.getInputProps("restriction")}
              />
              <Text size="md">
                The issue, transfer or ownership of shares is/is not restricted
                and the restrictions (if any) are as follows. If none, enter{" "}
                {"None"}
              </Text>

              <Textarea
                minRows={3}
                label="Other Provisions"
                {...form.getInputProps("otherProvisions")}
              />
              <Text size="md">
                Other provisions, if any. Enter other provisions, or if no other
                provisions enter {"None"}
              </Text>
            </Stack>
          </Box>
        )}
      </Stack>
    </StepperFormLayout>
  );
};

export default StOntarioStepArticle;

const textMap: { [key: number]: string } = {
  1: "2nd Officer's Information"
};
