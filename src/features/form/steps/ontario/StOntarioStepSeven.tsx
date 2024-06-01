import {
  ActionIcon,
  Box,
  Button,
  FileButton,
  Flex,
  Group,
  NumberInput,
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
import { randomId } from "@mantine/hooks";

type StOntarioStepSevenProps = {
  form: UseFormReturnType<typeof stOntarioInitials>;
};

const StOntarioStepSeven = ({ form }: StOntarioStepSevenProps) => {
  const fields = form.values.stepSeven.invidualShareholder.map(
    (item, index) => (
      <Box key={item.key}>
        {index > 0 && (
          <Group justify="space-between" align="center">
            <Title order={6} mt="lg" mb="xs">
              {textMap[index]}
            </Title>
            <ActionIcon
              color="red"
              variant="subtle"
              onClick={() =>
                form.removeListItem("stepSeven.invidualShareholder", index)
              }
            >
              <IconTrash size="1rem" />
            </ActionIcon>
          </Group>
        )}

        <SimpleGrid cols={2}>
          <TextInput
            label="First Name"
            {...form.getInputProps(
              `stepSeven.invidualShareholder.${index}.firstName`
            )}
          />
          <TextInput
            label="Middle Name"
            {...form.getInputProps(
              `stepSeven.invidualShareholder.${index}.middleName`
            )}
          />
          <TextInput
            label="Last Name"
            {...form.getInputProps(
              `stepSeven.invidualShareholder.${index}.lastName`
            )}
          />

          <TextInput
            label="Address"
            description="Same as Organization address Or, Provide Complete Address"
            {...form.getInputProps(
              `stepSeven.invidualShareholder.${index}.address`
            )}
          />
          <TextInput
            label="Number of share"
            {...form.getInputProps(
              `stepSeven.invidualShareholder.${index}.numberOfShare`
            )}
          />
        </SimpleGrid>
      </Box>
    )
  );

  return (
    <StepperFormLayout>
      <Stack gap="lg">
        {form.values.articleOfIncorporation === "standard" && (
          <>
            <NumberInput
              label="Price of per share"
              {...form.getInputProps("stepSeven.priceOfPerShare")}
            />
          </>
        )}

        {form.values.articleOfIncorporation === "advanced" && (
          <>
            <TextInput
              label="Price of Class A Share"
              {...form.getInputProps("stepSeven.priceOfAShare")}
            />
            <TextInput
              label="Price of Class B Share"
              {...form.getInputProps("stepSeven.priceOfBShare")}
            />
          </>
        )}

        {form.values.articleOfIncorporation === "custom" && (
          <>
            <TextInput
              label="Custom Article text"
              {...form.getInputProps("stepSeven.customArticleText")}
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
                  form.setFieldValue(
                    "stepSeven.customArticleAttachment",
                    files
                  );
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
                {form.values.stepSeven.customArticleAttachment.map(
                  (file, index) => (
                    <p key={index}>
                      {index + 1}. {file.name}
                    </p>
                  )
                )}
              </SimpleGrid>
            </Box>
          </>
        )}

        <Radio.Group
          label="Shareholder of Corporation"
          {...form.getInputProps("stepSeven.shareholderOfCorporation")}
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
        </Radio.Group>

        {form.values.stepSeven.shareholderOfCorporation === "all" && (
          <Box>
            {form.values.directors.map((dir) => {
              return (
                <Box key={dir.label}>
                  <Title order={6}>{dir.label}</Title>

                  {Object.keys(dir).map((el) => {
                    const value = dir[el as keyof FormData["values"]];
                    // if (el === "individual" || el === "corporation") return;
                    if (!(directorKeyMap[el] && value)) return;
                    return (
                      <RenderInfo
                        key={el}
                        label={directorKeyMap[el]}
                        value={dir[el as keyof FormData["values"]]}
                      />
                    );
                  })}
                  {/* 
                  <RenderInfo label="First Name" value={dir.firstName} />
                  <RenderInfo label="Middle Name" value={dir.middleName} />
                  <RenderInfo label="Last Name" value={dir.lastName} /> */}
                </Box>
              );
            })}
          </Box>
        )}

        {form.values.stepSeven.shareholderOfCorporation === "individual" && (
          <Box>
            {fields.slice(0, 1)}

            <Box mt="xl">
              <Title order={4}>Additional Shareholder</Title>
              {fields.slice(1)}

              <Button
                mt="lg"
                disabled={fields.length === 5}
                leftSection={<IconPlus size={16} />}
                onClick={() =>
                  form.insertListItem("stepSeven.invidualShareholder", {
                    ...stOntarioInitials["stepSeven"].invidualShareholder[0],
                    label: "Additional",
                    key: randomId()
                  })
                }
              >
                Add more Shareholder
              </Button>
            </Box>
          </Box>
        )}
      </Stack>
    </StepperFormLayout>
  );
};

export default StOntarioStepSeven;

const textMap: { [key: number]: string } = {
  1: "2nd Shareholder's Information",
  2: "3rd Shareholder's Information",
  3: "4th Shareholder's Information",
  4: "5th Shareholder's Information"
};

const directorKeyMap: { [key: string]: string } = {
  firstName: "First Name",
  middleName: "Middle Name",
  lastName: "Last Name",
  phone: "Phone Number",
  email: "Email",
  address: "Address",
  city: "City",
  postalCode: "Postal Code",
  province: "Ontario Corporation",
  suite: "Suite",
  residencyStatus: "Residency Status"
  // isDirectorAnIncorporator: "YES",
  // isHaveMoreIncorporator: "YES"
  // individual: {
  //   firstName: "First Name",
  //   middleName: "Middle Name",
  //   lastName: "Last Name"
  // },
  // corporation: {
  //   name: "Name",
  //   ocn: "OCN"
  // }
};

export function RenderInfo({ label, value }: { label: string; value: string }) {
  return (
    <Flex align="center" gap="xs">
      <Title order={6}>{label}:</Title>
      <Text size="md">{value}</Text>
    </Flex>
  );
}
