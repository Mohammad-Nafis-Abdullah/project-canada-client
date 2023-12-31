import {
  Box,
  Button,
  Group,
  Radio,
  SimpleGrid,
  Stepper,
  TextInput,
  Title
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useEffect, useState } from "react";
import FormLayout from "~/features/form/Layout";
import StepperFormLayout from "~/features/form/StepperFormLayout";
import PackageCard from "~/features/package/PackageCard";
import { ontarioSchema, stOntarioInitials } from "~/utils/schemas/stOntario";

const TOTAL_STEPS = 2;

export default function AlbertaCorporationRoute() {
  const [active, setActive] = useState(0);
  const [selectPackage, setSelectPackage] = useState<string>(
    ontarioPackages[0].id
  );

  const handlePrevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  const handleStepChange = (nextStep: number) => {
    const isOutOfBounds =
      nextStep > TOTAL_STEPS || form.validate().hasErrors || nextStep < 0;

    if (isOutOfBounds) {
      return;
    }

    setActive(nextStep);
  };

  const form = useForm<typeof stOntarioInitials>({
    initialValues: {
      ...stOntarioInitials
    },

    validate:
      active <= TOTAL_STEPS ? zodResolver(ontarioSchema[active]) : undefined
  });

  const handleSubmit = form.onSubmit(async (values) => {
    console.log(values);
  });

  useEffect(() => {
    if (selectPackage) {
      form.setFieldValue("packageId", selectPackage);
    }
  }, [selectPackage]);

  return (
    <FormLayout name="Ontario Standard Corporation Form">
      <Box pt="lg" component="form" onSubmit={handleSubmit}>
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
                </>
              )}
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
            type={active + 1 === TOTAL_STEPS ? "submit" : "button"}
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
      "Corporation Tax ID"
    ]
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
      "Link Business with CRA"
    ]
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
      "Business Logo"
    ]
  }
];
