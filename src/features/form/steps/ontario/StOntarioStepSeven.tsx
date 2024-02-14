import {
  ActionIcon,
  Box,
  Button,
  FileButton,
  Group,
  Radio,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconCloudUpload, IconPlus, IconTrash } from "@tabler/icons-react";
import { stOntarioInitials } from "~/utils/schemas";
import StepperFormLayout from "../../StepperFormLayout";

type StOntarioStepSevenProps = {
  form: UseFormReturnType<typeof stOntarioInitials>;
};

const StOntarioStepSeven = ({ form }: StOntarioStepSevenProps) => {
  const fields = form.values.invidualShareholder.map((item, index) => (
    <Box key={item.key}>
      {index > 0 && (
        <Group justify="space-between" align="center">
          <Title order={6} mt="lg" mb="xs">
            {textMap[index]}
          </Title>
          <ActionIcon
            color="red"
            variant="subtle"
            onClick={() => form.removeListItem("invidualShareholder", index)}
          >
            <IconTrash size="1rem" />
          </ActionIcon>
        </Group>
      )}

      <SimpleGrid cols={2}>
        <TextInput
          label="First Name"
          {...form.getInputProps(`invidualShareholder.${index}.firstName`)}
        />
        <TextInput
          label="Middle Name"
          {...form.getInputProps(`invidualShareholder.${index}.middleName`)}
        />
        <TextInput
          label="Last Name"
          {...form.getInputProps(`invidualShareholder.${index}.lastName`)}
        />

        <TextInput
          label="Address"
          description="Same as Organization address Or, Provide Complete Address"
          {...form.getInputProps(`invidualShareholder.${index}.address`)}
        />
        <TextInput
          label="Number of share"
          {...form.getInputProps(`invidualShareholder.${index}.numberOfShare`)}
        />
      </SimpleGrid>
    </Box>
  ));

  return (
    <StepperFormLayout>
      <Stack gap="lg">
        {(form.values.articleOfIncorporation === "standard" ||
          form.values.articleOfIncorporation === "advanced") && (
          <>
            <TextInput
              label="Price of Class A Share"
              {...form.getInputProps("priceOfAShare")}
            />
            <TextInput
              label="Price of Class B Share"
              {...form.getInputProps("priceOfBShare")}
            />
          </>
        )}

        {form.values.articleOfIncorporation === "custom" && (
          <>
            <TextInput
              label="Custom Article text"
              {...form.getInputProps("customArticleText")}
            />

            <Text size="lg">Or,</Text>

            <Box>
              <Text component="label" size="md" mb="xs" display="block">
                Attachment
              </Text>
              <FileButton
                accept=".docx, .doc, .pdf"
                multiple
                onChange={(files) => {
                  form.setFieldValue("customArticleAttachment", files);
                }}
              >
                {(props) => (
                  <Button
                    color="primary"
                    variant="outline"
                    leftSection={<IconCloudUpload size={18} />}
                    {...props}
                  >
                    Upload file
                  </Button>
                )}
              </FileButton>
              {form.errors.customArticleAttachment && (
                <Text size="sm" style={{ color: "red" }}>
                  {form.errors.customArticleAttachment}
                </Text>
              )}
              <SimpleGrid cols={2} mt="sm" spacing={3}>
                {form.values.customArticleAttachment.map((file, index) => (
                  <p key={index}>
                    {index + 1}. {file.name}
                  </p>
                ))}
              </SimpleGrid>
            </Box>
          </>
        )}

        <Radio.Group
          label="Shareholder of Corporation"
          {...form.getInputProps("shareholderOfCorporation")}
        >
          <Radio
            value="all"
            mt="xs"
            label="All the Directors are shareholder"
          />
          <Radio
            value="individual"
            my="xs"
            label="I want to add individual shareholder."
          />

          {form.values.shareholderOfCorporation === "individual" && (
            <Box>
              {fields.slice(0, 1)}

              <Box mt="xl">
                <Title order={4}>Additional Shareholder</Title>
                {fields.slice(1)}

                <Button
                  mt="lg"
                  disabled={fields.length === 2}
                  leftSection={<IconPlus size={16} />}
                  onClick={() =>
                    form.insertListItem("invidualShareholder", {
                      ...stOntarioInitials["invidualShareholder"][0],
                      label: "Additional"
                    })
                  }
                >
                  Add more Shareholder
                </Button>
              </Box>
            </Box>
          )}
        </Radio.Group>
      </Stack>
    </StepperFormLayout>
  );
};

export default StOntarioStepSeven;

const textMap: { [key: number]: string } = {
  1: "2nd Director's Information"
};
