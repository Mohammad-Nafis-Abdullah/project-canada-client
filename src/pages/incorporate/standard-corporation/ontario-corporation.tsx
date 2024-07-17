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
  Title
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconCloudUpload } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { ZodSchema } from "zod";
import FormLayout from "~/features/form/Layout";
import StepperFormLayout from "~/features/form/StepperFormLayout";
import StOntarioStepCost from "~/features/form/steps/ontario/StOntarioStepCost";
import StOntarioStepFive from "~/features/form/steps/ontario/StOntarioStepFive";
import StOntarioStepFour from "~/features/form/steps/ontario/StOntarioStepFour";
import StOntarioStepInfo from "~/features/form/steps/ontario/StOntarioStepInfo";
import StOntarioStepSeven from "~/features/form/steps/ontario/StOntarioStepSeven";
import StOntarioStepSix from "~/features/form/steps/ontario/StOntarioStepSix";
import StOntarioSupplies from "~/features/form/steps/ontario/StOntarioSupplies";
import StOntario_sharePrice from "~/features/form/steps/ontario/StOntario_sharePrice";
import PackageCard from "~/features/package/PackageCard";
import { province } from "~/utils/const";
import {
  legalSuffixOptions,
  ontarioSchema,
  otherRegSchema,
  sharePriceSchema,
  shareSchema,
  stOntarioInitials
} from "~/utils/schemas";

export type TPackage = {
  id: string;
  code: "essential" | "premium" | "ultimate";
  name: string;
  price: string;
  offers: Array<string>;
};

export default function AlbertaCorporationRoute() {
  const [totalSteps, setTotalSteps] = useState(12);
  const [schema, setSchema] = useState(ontarioSchema);

  const [active, setActive] = useState(0);
  const [selectPackage, setSelectPackage] = useState<TPackage>(
    ontarioPackages[0]
  );

  const handlePrevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  const nextStep = () => {
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < totalSteps ? current + 1 : current;
    });
  };

  const form = useForm<typeof stOntarioInitials>({
    initialValues: {
      ...stOntarioInitials
    },

    validate: schema[active]
      ? zodResolver(schema[active] as ZodSchema)
      : undefined
  });

  const handleSubmit = form.onSubmit(async (values) => {
    console.log(values);
  });

  useEffect(() => {
    if (selectPackage) {
      form.setFieldValue("packageId", selectPackage.id);
    }
    // eslint-disable-next-line
  }, [selectPackage]);

  useEffect(() => {
    if (selectPackage.code === "ultimate") {
      if (
        (totalSteps === 11 || totalSteps === 12) &&
        (schema[8] === otherRegSchema || schema[9] === otherRegSchema)
      ) {
        const res = schema.filter((item) => item !== otherRegSchema);
        setSchema(res);
      }
    } else {
      if (totalSteps === 13 && active === 0) {
        setSchema(ontarioSchema);
      }
    }

    // eslint-disable-next-line
  }, [active, totalSteps, form.values.isBylawsAndMinuteBook]);

  useEffect(() => {
    if (totalSteps <= 12 && schema[7] === shareSchema && active === 5) {
      const allow = [shareSchema, sharePriceSchema];
      // @ts-ignore
      const res = schema.filter((item) => !allow.includes(item as ZodSchema));
      setSchema(res);
    } else {
      if (totalSteps >= 12 && active === 5) {
        setSchema(ontarioSchema);
      }
    }
    // eslint-disable-next-line
  }, [active, totalSteps]);

  useEffect(() => {
    if (active === 0) {
      if (selectPackage.code === "ultimate") {
        setTotalSteps(11);
      } else {
        setTotalSteps(12);
      }
    }
  }, [selectPackage, active]);

  useEffect(() => {
    if (active === 5) {
      if (form.values.isBylawsAndMinuteBook === "YES") {
        if (selectPackage.code === "ultimate") {
          setTotalSteps(12);
        } else setTotalSteps(13);
      } else {
        if (selectPackage.code === "ultimate") {
          setTotalSteps(10);
        } else setTotalSteps(11);
      }
    }
    // eslint-disable-next-line
  }, [form.values.isBylawsAndMinuteBook, active]);

  return (
    <FormLayout name="Ontario Standard Corporation Form">
      <Box py="lg" component="form" onSubmit={handleSubmit}>
        <Title order={6}>
          Application for Ontario Corporation Registration
        </Title>
        <Stepper mt="lg" size="sm" active={active} color="primary">
          {/* step - Choose Package */}
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

          {/* step - Intention */}
          <Stepper.Step label="Intention">
            <StepperFormLayout>
              <Stack gap="lg">
                <Radio.Group
                  label="Intention of your Corporation"
                  {...form.getInputProps("intentionOfCorporation")}
                >
                  <Radio
                    label="Numbered (12345678 Canada Inc.)"
                    mt="xs"
                    value="Numbered (12345678 Canada Inc.)"
                  />
                  <Radio
                    value="named"
                    my="xs"
                    label="Named (ABCD Corporation)"
                  />
                </Radio.Group>

                {form.values.intentionOfCorporation === "named" && (
                  <>
                    <TextInput
                      label="Proposed Business name"
                      {...form.getInputProps("intent.proposedBusinessName")}
                    />
                    <Select
                      label="Select a legal suffix"
                      placeholder="Select one"
                      data={legalSuffixOptions}
                      {...form.getInputProps("intent.legalSuffix")}
                    />
                    <Radio.Group
                      label="NUANS/Name Reservation Report"
                      {...form.getInputProps("intent.haveNuansReport")}
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

                    {form.values.intent.haveNuansReport === "YES" && (
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
                            form.setFieldValue("intent.nuansReport", files);
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
                          {form.values.intent.nuansReport.map((file, index) => (
                            <p key={index}>
                              {index + 1}. {file.name}
                            </p>
                          ))}
                        </SimpleGrid>
                      </Box>
                    )}
                  </>
                )}
              </Stack>
            </StepperFormLayout>
          </Stepper.Step>

          {/* step - Business Activity */}
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
                    <Select
                      label="Province"
                      placeholder="Select one"
                      data={province}
                      {...form.getInputProps("corporation.province")}
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

          {/* step - Director */}
          <Stepper.Step label="Director">
            <StOntarioStepFour form={form} />
          </Stepper.Step>

          {/* step - Article */}
          <Stepper.Step label="Article">
            <StOntarioStepFive form={form} />
          </Stepper.Step>

          {/* step - By Laws & Minute Book */}
          <Stepper.Step label="By Laws & Minute Book">
            <StOntarioStepSix form={form} />
          </Stepper.Step>

          {/* step - Ontario Mandatory Initial Return */}
          <Stepper.Step label="Ontario Mandatory Initial Return">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione
            nostrum, id recusandae officia modi voluptates unde excepturi. Ipsam
            totam consectetur at inventore modi nulla? Quae corporis esse fugiat
            perspiciatis unde.
          </Stepper.Step>

          {/* step - Share Price */}
          {form.values.isBylawsAndMinuteBook === "YES" && (
            <Stepper.Step label="Share Price">
              <StOntario_sharePrice form={form} />
            </Stepper.Step>
          )}

          {/* step - Share */}
          {form.values.isBylawsAndMinuteBook === "YES" && (
            <Stepper.Step label="Share">
              <StOntarioStepSeven form={form} />
            </Stepper.Step>
          )}

          {/* step - CRA Registration */}
          <Stepper.Step label="CRA Registration">
            <StepperFormLayout>
              {selectPackage.code !== "ultimate" && (
                <Radio.Group
                  label="GST/HST Registration"
                  {...form.getInputProps("craRegistration.gstHstReg")}
                >
                  <Radio value="Yes $39.00" mt="xs" label="Yes $39.00" />
                  <Radio value="No $0.00" my="xs" label="No $0.00" />
                </Radio.Group>
              )}

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

          {/* step - Other Registration */}
          {selectPackage.code !== "ultimate" && (
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
          )}

          {/* step - Supplies & Services */}
          <Stepper.Step label="Supplies & Services">
            <StOntarioSupplies form={form} selectPackage={selectPackage} />
          </Stepper.Step>

          {/* step - Cost Summary */}
          <Stepper.Step label="Cost Summary">
            <StOntarioStepCost form={form} />
          </Stepper.Step>

          {/* step - Information Summary */}
          <Stepper.Step label="Information Summary">
            <StOntarioStepInfo form={form} />
          </Stepper.Step>

          <Stepper.Completed>
            <Group justify="center" mt="xl">
              <Button type="submit">submit</Button>
            </Group>
          </Stepper.Completed>
        </Stepper>

        <Group justify="center" mt="xl">
          {active !== 0 && (
            <Button variant="default" onClick={handlePrevStep}>
              Back
            </Button>
          )}
          {active !== totalSteps && (
            <Button onClick={nextStep}>Next step</Button>
          )}
        </Group>
      </Box>
    </FormLayout>
  );
}

export const ontarioPackages: TPackage[] = [
  {
    id: "6c6e231d-99ad-464a-9247-0e26205a3047",
    code: "essential",
    name: "Essential",
    price: "$399",
    offers: [
      "Ready in 3 Business Days",
      "Article of incorporation",
      "Certificate of incorporation",
      "NUANS/ Name approval",
      "Company key",
      "Business Number",
      "Corporation Tax ID"
    ]
  },
  {
    id: "1ffb2517-71b8-4142-ab63-04bb6bbc1c5a",
    code: "premium",
    name: "Premium",
    price: "$599",
    offers: [
      "Ready in 1 Business Days",
      "Article of incorporation",
      "Certificate of incorporation",
      "NUANS/ Name approval",
      "Company key",
      "Business Number",
      "Corporation Tax ID",
      "Electronic Minute Book",
      "Link Business with CRA"
    ]
  },
  {
    id: "83365464-4216-4f73-b3e1-55b2b72438eb",
    code: "ultimate",
    name: "Ultimate",
    price: "$799",
    offers: [
      "Ready in 2 business Hours",
      "Article of incorporation",
      "Certificate of incorporation",
      "NUANS/ Name approval",
      "Company key",
      "Business Number",
      "Corporation Tax ID",
      "Electronic & Physical By-Laws & Minute Book",
      "Link Business with CRA",
      "GST/HST Registration",
      "Business Logo"
    ]
  }
];
