import {
  Box,
  Button,
  FileButton,
  Group,
  Radio,
  Select,
  SimpleGrid,
  Stack,
  Stepper,
  Text,
  TextInput,
  Textarea,
  Title
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconCloudUpload } from "@tabler/icons-react";
import { useState } from "react";
import FormLayout from "~/features/form/Layout";
import StepperFormLayout from "~/features/form/StepperFormLayout";
import StAlbertStepFour from "~/features/form/steps/StAlbertStepFour";
import StAlbertStepSeven from "~/features/form/steps/StAlbertStepSeven";
import { pageTwoFaqs } from "~/utils/faqs";
import { albertaSchema, stAlbertaInitials } from "~/utils/schemas";

export default function AlbertaCorporationRoute() {
  const [active, setActive] = useState(0);

  const handlePrevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  const handleStepChange = (nextStep: number) => {
    const isOutOfBounds =
      nextStep > 7 || form.validate().hasErrors || nextStep < 0;

    if (isOutOfBounds) {
      return;
    }

    setActive(nextStep);
  };

  const form = useForm<typeof stAlbertaInitials>({
    initialValues: {
      ...stAlbertaInitials
    },

    // validate: zodResolver(stepOneSchema)
    validate: active <= 6 ? zodResolver(albertaSchema[active]) : undefined
  });

  const handleSubmit = form.onSubmit(async (values) => {
    console.log(values);
  });

  return (
    <FormLayout name="Alberta Corporation">
      <Box py="xl" component="form" onSubmit={handleSubmit}>
        <Stepper size="sm" active={active} color="primary">
          <Stepper.Step label="Corporation Name">
            <StepperFormLayout title="Corporation Name">
              <Stack gap="lg">
                <Radio.Group
                  label="Is this a named or numbered corporation?"
                  {...form.getInputProps("corporationType")}
                >
                  <Radio
                    value="numbered"
                    mt="xs"
                    label="Numbered Corporation"
                  />
                  <Radio value="named" my="xs" label="Named Corporation" />
                </Radio.Group>

                {form.values.corporationType === "named" && (
                  <>
                    <Box>
                      <Text component="label" size="md" mb="xs" display="block">
                        Please add your NUANS report
                      </Text>
                      <FileButton
                        accept=".docx, .doc, .pdf"
                        multiple
                        onChange={(files) => {
                          form.setFieldValue("nuansReport", files);
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
                      {form.errors.nuansReport && (
                        <Text size="sm" style={{ color: "red" }}>
                          {form.errors.nuansReport}
                        </Text>
                      )}
                      <SimpleGrid cols={2} mt="sm" spacing={3}>
                        {form.values.nuansReport.map((file, index) => (
                          <p key={index}>
                            {index + 1}. {file.name}
                          </p>
                        ))}
                      </SimpleGrid>
                    </Box>

                    <TextInput
                      label="Enter the proposed name of this corporation."
                      {...form.getInputProps("proposedNameOfCorporation")}
                    />
                  </>
                )}

                <Select
                  label="Select a legal suffix"
                  placeholder="Select one"
                  data={[
                    "Ltd.",
                    "Inc.",
                    "Corp.",
                    "Limited",
                    "Incorporation",
                    "Corporation"
                  ]}
                  {...form.getInputProps("legalSuffix")}
                />

                <Textarea
                  label="Major activities of this corporation (briefly)"
                  autosize
                  minRows={4}
                  {...form.getInputProps("majorActivities")}
                />
              </Stack>
            </StepperFormLayout>
          </Stepper.Step>

          <Stepper.Step label="Corporation's Address">
            <StepperFormLayout faqs={pageTwoFaqs} title="Corporation's Address">
              <Stack gap="lg">
                <Box>
                  <Title order={6}>Enter the corporation&apos;s address:</Title>
                  <SimpleGrid cols={2}>
                    <TextInput
                      label="Street Address"
                      {...form.getInputProps("corporation.address")}
                    />
                    <TextInput
                      label="Suite/Unit"
                      {...form.getInputProps("corporation.suite")}
                    />
                    <TextInput
                      label="City"
                      {...form.getInputProps("corporation.city")}
                    />
                    <TextInput
                      label="Province"
                      {...form.getInputProps("corporation.province")}
                    />
                    <TextInput
                      label="Postal Code"
                      {...form.getInputProps("corporation.postalCode")}
                    />
                  </SimpleGrid>
                </Box>

                <Box>
                  <Title order={6}>Enter Records Office address:</Title>
                  <SimpleGrid cols={2}>
                    <TextInput
                      label="Street Address"
                      {...form.getInputProps("office.address")}
                    />
                    <TextInput
                      label="Suite/Unit"
                      {...form.getInputProps("office.suite")}
                    />
                    <TextInput
                      label="City"
                      {...form.getInputProps("office.city")}
                    />
                    <TextInput
                      label="Province"
                      {...form.getInputProps("office.province")}
                    />
                    <TextInput
                      label="Postal Code"
                      {...form.getInputProps("office.postalCode")}
                    />
                  </SimpleGrid>
                </Box>
              </Stack>
            </StepperFormLayout>
          </Stepper.Step>

          <Stepper.Step label="Agent for Service">
            <StepperFormLayout title="Agent for Service (Must be Alberta Resident)">
              <Text size="md">
                <strong>Note:</strong> Every Alberta corporation must appoint an
                Agent for Service who must reside in Alberta. This individual
                would be the primary point of all communications from the
                government. This could be the primary director or any other
                director who resides in Alberta. If all directors are
                non-Alberta residents, you can appoint an Alberta attorney or
                take the service we offer.
              </Text>

              <Stack gap="lg" mt="lg">
                <Box>
                  <Title order={6}>Enter your information:</Title>
                  <SimpleGrid cols={2}>
                    <TextInput
                      label="First Name"
                      {...form.getInputProps("personal.firstName")}
                    />
                    <TextInput
                      label="Middle Name"
                      {...form.getInputProps("personal.middleName")}
                    />
                    <TextInput
                      label="Last Name"
                      {...form.getInputProps("personal.lastName")}
                    />
                    <TextInput
                      label="Phone"
                      {...form.getInputProps("personal.phone")}
                    />
                    <TextInput
                      label="Email Address"
                      {...form.getInputProps("personal.email")}
                    />
                  </SimpleGrid>
                </Box>

                <Box>
                  <Title order={6}>Complete address:</Title>
                  <SimpleGrid cols={2}>
                    <TextInput
                      label="Street Address"
                      {...form.getInputProps("personal.address")}
                    />
                    <TextInput
                      label="Suite/Unit"
                      {...form.getInputProps("personal.suite")}
                    />
                    <TextInput
                      label="City"
                      {...form.getInputProps("personal.city")}
                    />
                    <TextInput
                      label="Province"
                      {...form.getInputProps("personal.province")}
                    />
                    <TextInput
                      label="Postal Code"
                      {...form.getInputProps("personal.postalCode")}
                    />
                  </SimpleGrid>
                </Box>

                <Box>
                  <Text size="md">Valid Alberta Photo ID or Passport</Text>
                  <FileButton
                    accept=".png, .jpg, .jpeg"
                    multiple
                    onChange={(files) => {
                      form.setFieldValue(
                        "personal.photoPassport",
                        files as File[]
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
                  {form.errors["personal.photoPassport"] && (
                    <Text size="sm" style={{ color: "red" }}>
                      {form.errors["personal.photoPassport"]}
                    </Text>
                  )}
                  <SimpleGrid cols={2} mt="sm" spacing={3}>
                    {form.values.personal.photoPassport.map((file, index) => (
                      <p key={index}>
                        {index + 1}. {file.name}
                      </p>
                    ))}
                  </SimpleGrid>
                </Box>
                <Text size="md">
                  <strong>Note:</strong> If you don&apos;t have an &quot;Agent
                  for Service&quot; in this province, please choose our agent
                  for service.
                </Text>
              </Stack>
            </StepperFormLayout>
          </Stepper.Step>

          <Stepper.Step label="Director List">
            <StAlbertStepFour form={form} />
          </Stepper.Step>

          <Stepper.Step label="Share Structure">
            <StepperFormLayout title="Share Structure">
              <Stack gap="lg">
                <TextInput
                  label="Enter the price of class A voting share: $1.00 (Recommended)"
                  {...form.getInputProps("classAVotingPrice")}
                />
                <Radio.Group
                  label="Will it issue a class B voting share?"
                  {...form.getInputProps("isIssueClassBVoting")}
                >
                  <Radio value="YES" mt="xs" label="YES" />
                  <Radio value="NO" my="xs" label="NO" />
                </Radio.Group>
                <Radio.Group
                  label="Will it issue a class C non-voting share?"
                  {...form.getInputProps("isIssueClassCNonVoting")}
                >
                  <Radio value="YES" mt="xs" label="YES" />
                  <Radio value="NO" my="xs" label="NO" />
                </Radio.Group>
              </Stack>
            </StepperFormLayout>
          </Stepper.Step>

          <Stepper.Step label="Share Holder">
            <StepperFormLayout title="Share Holder">
              <Stack gap="lg">
                <Radio.Group
                  label="Is the 'Primary Director' a shareholder?"
                  {...form.getInputProps("isIssueClassBVoting")}
                >
                  <Radio value="YES" mt="xs" label="YES" />
                  <Radio value="NO" my="xs" label="NO" />
                </Radio.Group>
                {/* <Radio.Group
                  label="Which one shares for 1st shareholder ?"
                  {...form.getInputProps("isIssueClassCNonVoting")}
                >
                  <Radio value="A" mt="xs" label="Number of A" />
                  <Radio value="B" mt="xs" label="Number of B" />
                  <Radio value="C" mt="xs" label="Number of C" />
                </Radio.Group> */}
              </Stack>
            </StepperFormLayout>
          </Stepper.Step>

          <Stepper.Step label="Corporation's Officer(s)">
            <StAlbertStepSeven form={form} />
          </Stepper.Step>

          <Stepper.Completed>
            {Object.keys(form.values).map((item, idx) => {
              return (
                <Box key={idx}>
                  <Group>
                    <Title order={6}>{item}</Title>
                  </Group>
                </Box>
              );
            })}
          </Stepper.Completed>
        </Stepper>

        {active}
        <Group justify="center" mt="xl">
          {active !== 0 && (
            <Button variant="default" onClick={handlePrevStep}>
              Back
            </Button>
          )}
          <Button
            onClick={() => handleStepChange(active + 1)}
            type={active === 7 ? "submit" : "button"}
          >
            {active === 7 ? "Submit" : "Next step"}
          </Button>
        </Group>
      </Box>
    </FormLayout>
  );
}
