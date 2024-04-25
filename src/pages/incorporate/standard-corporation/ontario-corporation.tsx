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
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconCloudUpload } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import FormLayout from "~/features/form/Layout";
import StepperFormLayout from "~/features/form/StepperFormLayout";
import StOntarioStepFive from "~/features/form/steps/ontario/StOntarioStepFive";
import StOntarioStepFour from "~/features/form/steps/ontario/StOntarioStepFour";
import StOntarioStepSeven from "~/features/form/steps/ontario/StOntarioStepSeven";
import StOntarioStepSix from "~/features/form/steps/ontario/StOntarioStepSix";
import PackageCard from "~/features/package/PackageCard";
import {
  legalSuffixOptions,
  ontarioSchema,
  stOntarioInitials,
} from "~/utils/schemas";

const TOTAL_STEPS = 8;

export default function AlbertaCorporationRoute() {
  const [active, setActive] = useState(0);
  const [selectPackage, setSelectPackage] = useState<string>(
    ontarioPackages[0].id
  );

  const handlePrevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  const handleStepChange = (nextStep: number) => {
    console.log(form.errors);

    const isOutOfBounds =
      nextStep > TOTAL_STEPS || form.validate().hasErrors || nextStep < 0;

    if (isOutOfBounds) {
      return;
    }

    setActive(nextStep);
  };

  const form = useForm<typeof stOntarioInitials>({
    initialValues: {
      ...stOntarioInitials,
    },

    validate:
      active !== TOTAL_STEPS ? zodResolver(ontarioSchema[active]) : undefined,
  });

  const handleSubmit = form.onSubmit(async (values) => {
    console.log(form.errors);
    console.log(values);
  });

  useEffect(() => {
    if (selectPackage) {
      form.setFieldValue("packageId", selectPackage);
    }
    // eslint-disable-next-line
  }, [selectPackage]);

  return (
    <FormLayout name="Ontario Standard Corporation Form">
      <Box py="lg" component="form" onSubmit={handleSubmit}>
        <Title order={6}>
          Application for Ontario Corporation Registration
        </Title>
        <Stepper mt="lg" size="sm" active={active} color="primary">
          <Stepper.Step label="Choose Package">
            <SimpleGrid cols={3} spacing="sm" maw={1040} mx="auto">
              {ontarioPackages.map((item) => (
                <PackageCard
                  key={item.id}
                  {...item}
                  selectPackage={selectPackage}
                  setSelectPackage={setSelectPackage}
                />
              ))}
            </SimpleGrid>
          </Stepper.Step>

          <Stepper.Step label="Intention">
            <StepperFormLayout>
              <Stack gap="lg">
                <Radio.Group
                  label="Intention of your Corporation"
                  {...form.getInputProps("intentionOfCorporation")}
                >
                  <Radio
                    value="numbered"
                    mt="xs"
                    label="Numbered (12345678 Canada Inc.)"
                  />
                  <Radio value="named" my="xs" label="Named (ABCD Society)" />
                </Radio.Group>

                {form.values.intentionOfCorporation === "named" && (
                  <>
                    <TextInput
                      label="Proposed Business name"
                      {...form.getInputProps("proposedBusinessName")}
                    />
                    <Select
                      label="Select a legal suffix"
                      placeholder="Select one"
                      data={legalSuffixOptions}
                      {...form.getInputProps("legalSuffix")}
                    />
                    <Radio.Group
                      label="NUANS/Name Reservation Report"
                      {...form.getInputProps("haveNuansReport")}
                    >
                      <Radio
                        value="YES"
                        mt="xs"
                        label="YES, I have NUANS/Name Reservation"
                      />
                      <Radio
                        value="NO"
                        my="xs"
                        label="NO, I don't have NUANS/Name Reservation"
                      />
                    </Radio.Group>

                    {form.values.haveNuansReport === "YES" ? (
                      <Box>
                        <Text
                          component="label"
                          size="md"
                          mb="xs"
                          display="block"
                        >
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
                    ) : (
                      <Box>
                        <Button>Payment for NUANS</Button>
                      </Box>
                    )}
                  </>
                )}
              </Stack>
            </StepperFormLayout>
          </Stepper.Step>

          <Stepper.Step label="Business Activity">
            <StepperFormLayout>
              <Stack gap="lg">
                <TextInput
                  label="Business activity"
                  {...form.getInputProps("businessActivity")}
                />

                <Box>
                  <Title order={6}>
                    Corporation&apos;s Registered Address:
                  </Title>
                  <SimpleGrid cols={2}>
                    <TextInput
                      label="Street number & name"
                      {...form.getInputProps("corporation.address")}
                    />
                    <TextInput
                      label="Apt/Unit/Suite Number (If available)"
                      {...form.getInputProps("corporation.apartment")}
                    />
                    <TextInput
                      label="City"
                      {...form.getInputProps("corporation.city")}
                    />
                    <TextInput
                      label="Postal Code"
                      {...form.getInputProps("corporation.postalCode")}
                    />
                  </SimpleGrid>
                </Box>
              </Stack>
            </StepperFormLayout>
          </Stepper.Step>

          <Stepper.Step label="Director">
            <StOntarioStepFour form={form} />
          </Stepper.Step>

          <Stepper.Step label="Article">
            <StOntarioStepFive form={form} />
          </Stepper.Step>

          <Stepper.Step label="By Laws & Minute Book">
            <StOntarioStepSix form={form} />
          </Stepper.Step>

          {form.values.isBylawsAndMinuteBook === "YES" && (
            <Stepper.Step label="Share">
              <StOntarioStepSeven form={form} />
            </Stepper.Step>
          )}

          <Stepper.Step label="CRA Registration">
            <StepperFormLayout>
              <Radio.Group
                label="GST/HST Registration"
                {...form.getInputProps("craRegistration.gstHstReg")}
              >
                <Radio value="Yes $39.00" mt="xs" label="Yes $39.00" />
                <Radio value="No $0.00" my="xs" label="No $0.00" />
              </Radio.Group>

              <Radio.Group
                label="Payroll Registration"
                {...form.getInputProps("craRegistration.payrollReg")}
              >
                <Radio value="Yes $39.00" mt="xs" label="Yes $39.00" />
                <Radio value="No $0.00" my="xs" label="No $0.00" />
              </Radio.Group>

              <Radio.Group
                label="Import/Export Registration"
                {...form.getInputProps("craRegistration.importExportReg")}
              >
                <Radio value="Yes $39.00" mt="xs" label="Yes $39.00" />
                <Radio value="No $0.00" my="xs" label="No $0.00" />
              </Radio.Group>

              <Radio.Group
                label="Dividend Account Registration"
                {...form.getInputProps("craRegistration.dividendAccReg")}
              >
                <Radio value="Yes $39.00" mt="xs" label="Yes $39.00" />
                <Radio value="No $0.00" my="xs" label="No $0.00" />
              </Radio.Group>
            </StepperFormLayout>
          </Stepper.Step>

          <Stepper.Step label="Other Registration">
            <StepperFormLayout>
              <Radio.Group
                label="Initial Return"
                {...form.getInputProps("otherRegistration.initialReturn")}
              >
                <Radio value="Yes $39.00" mt="xs" label="Yes $39.00" />
                <Radio value="No $0.00" my="xs" label="No $0.00" />
              </Radio.Group>

              <Radio.Group
                label="WSIB"
                {...form.getInputProps("otherRegistration.wsib")}
              >
                <Radio value="Yes $99.00" mt="xs" label="Yes $99.00" />
                <Radio value="No $0.00" my="xs" label="No $0.00" />
              </Radio.Group>

              <Radio.Group
                label="Domain Registration"
                {...form.getInputProps("otherRegistration.domainReg")}
              >
                <Radio value="Yes $39.00" mt="xs" label="Yes $39.00" />
                <Radio value="No $0.00" my="xs" label="No $0.00" />
              </Radio.Group>

              <Radio.Group
                label="Email Registration"
                {...form.getInputProps("otherRegistration.emailReg")}
              >
                <Radio value="Yes $39.00" mt="xs" label="Yes $39.00" />
                <Radio value="No $0.00" my="xs" label="No $0.00" />
              </Radio.Group>
            </StepperFormLayout>
          </Stepper.Step>

          <Stepper.Step label="Supplies & Services">
            <StepperFormLayout>
              <Radio.Group
                label="Corporate Seal"
                {...form.getInputProps("suppliesAndServices.corporateSeal")}
              >
                <Radio value="Yes $39.00" mt="xs" label="Yes $39.00" />
                <Radio value="No $0.00" my="xs" label="No $0.00" />
              </Radio.Group>

              <Radio.Group
                label="Physical minute book"
                {...form.getInputProps(
                  "suppliesAndServices.PhysicalMinuteBook"
                )}
              >
                <Radio value="Yes $49.00" mt="xs" label="Yes $49.00" />
                <Radio value="No $0.00" my="xs" label="No $0.00" />
              </Radio.Group>

              <Radio.Group
                label="One year Service support"
                {...form.getInputProps(
                  "suppliesAndServices.oneYearServiceSupport"
                )}
              >
                <Radio value="Yes $99.00" mt="xs" label="Yes $99.00" />
                <Radio value="No $0.00" my="xs" label="No $0.00" />
              </Radio.Group>

              <Radio.Group
                label="Annual Return"
                {...form.getInputProps("suppliesAndServices.annualReturn")}
              >
                <Radio value="Yes $149.00" mt="xs" label="Yes $149.00" />
                <Radio value="No $0.00" my="xs" label="No $0.00" />
              </Radio.Group>
            </StepperFormLayout>
          </Stepper.Step>

          <Stepper.Completed>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet a
            vitae perspiciatis illum tempore repudiandae similique culpa labore
            eius voluptate, expedita ex ipsa exercitationem cumque. Nesciunt
            unde deserunt accusamus illo.
          </Stepper.Completed>
        </Stepper>

        {/* {active !== TOTAL_STEPS && ( */}
        <Group justify="center" mt="xl">
          <Button variant="default" onClick={handlePrevStep}>
            Back
          </Button>

          <Button
            onClick={() => handleStepChange(active + 1)}
            type={active !== TOTAL_STEPS ? "button" : "submit"}
          >
            Next step
          </Button>
        </Group>
        {/* )} */}
      </Box>
    </FormLayout>
  );
}

const ontarioPackages = [
  {
    id: "6c6e231d-99ad-464a-9247-0e26205a3047",
    name: "Essential",
    price: "$399",
    offers: [
      "Ready in 3 Business Days",
      "Article of incorporation",
      "Certificate of incorporation",
      "NUANS/ Name approval",
      "Company key",
      "Business Number",
      "Corporation Tax ID",
    ],
  },
  {
    id: "1ffb2517-71b8-4142-ab63-04bb6bbc1c5a",
    name: "Premium",
    price: "$599",
    offers: [
      "Ready in 1 Business Days",
      "Article of incorporation",
      "Certificate of incorporation",
      "NUANS/ Name approval",
      "Electronic Minute Book",
      "Company key",
      "Business Number",
      "Corporation Tax ID",
      "Link Business with CRA",
    ],
  },
  {
    id: "83365464-4216-4f73-b3e1-55b2b72438eb",
    name: "Ultimate",
    price: "$799",
    offers: [
      "Ready in 2 business Hours",
      "Article of incorporation",
      "Certificate of incorporation",
      "NUANS/ Name approval",
      "Electronic & Physical By-Laws & Minute Book",
      "Company key",
      "Business Number",
      "Corporation Tax ID",
      "GST/HST Registration",
      "Link Business with CRA",
      "Business Logo",
    ],
  },
];
