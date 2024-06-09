import {
  Box,
  Radio,
  Select,
  SimpleGrid,
  Stack,
  TextInput,
  Title
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { stOntarioInitials } from "~/utils/schemas";
import StepperFormLayout from "../../StepperFormLayout";

type StOntarioStepSixProps = {
  form: UseFormReturnType<typeof stOntarioInitials>;
};

type ArticleOptions_type = "Standard $0.00" | "Advanced $49" | "Custom $99";

export interface CustomEventTarget extends EventTarget {
  blur: () => void;
  focus: () => void;
}

function SharePriceForStandard({ form }: StOntarioStepSixProps) {
  return (
    <StepperFormLayout>
      <Stack gap="lg">
        <Title order={4}>{`Share Price (Standard Share Structure)`}</Title>
        <TextInput
          leftSection={"$"}
          label="Write initial share price (commonly $1)"
          placeholder="1.00"
          type="number"
          min={1}
          onWheel={(e) => {
            (e.target as CustomEventTarget).blur();
            e.stopPropagation();
            setTimeout(() => {
              (e.target as CustomEventTarget).focus();
            }, 0);
          }}
          onKeyDownCapture={(e) => {
            if (
              e.key === "ArrowUp" ||
              e.key === "ArrowDown" ||
              e.key === "+" ||
              e.key === "-"
            ) {
              e.stopPropagation();
              e.preventDefault();
            }
          }}
          {...form.getInputProps(`sharePrice.initialSharePrice`)}
        />
      </Stack>
    </StepperFormLayout>
  );
}

function SharePriceForAdvanced({ form }: StOntarioStepSixProps) {
  return (
    <StepperFormLayout>
      <Stack gap="xl">
        <Title order={4}>{`Share Price (Advanced Share Structure)`}</Title>
        <TextInput
          leftSection={"$"}
          label="Enter price of class A voting share"
          placeholder="1.00"
          type="number"
          min={1}
          onWheel={(e) => {
            (e.target as CustomEventTarget).blur();
            e.stopPropagation();
            setTimeout(() => {
              (e.target as CustomEventTarget).focus();
            }, 0);
          }}
          onKeyDownCapture={(e) => {
            if (
              e.key === "ArrowUp" ||
              e.key === "ArrowDown" ||
              e.key === "+" ||
              e.key === "-"
            ) {
              e.stopPropagation();
              e.preventDefault();
            }
          }}
          {...form.getInputProps(`sharePrice.priceOfClassAvotingShare`)}
        />
        <Radio.Group
          label="Will it issue class B non-voting share?"
          defaultValue="NO"
          {...form.getInputProps("sharePrice.isClassBnonVotingShareIssued")}
        >
          <Radio value="YES" mt="xs" label="Yes" />
          <Radio value="NO" my="xs" label="No" />
        </Radio.Group>
        {form.values.sharePrice.isClassBnonVotingShareIssued === "YES" ? (
          <TextInput
            leftSection={"$"}
            label="Enter price of class B non-voting share"
            placeholder="1.00"
            type="number"
            min={1}
            onWheel={(e) => {
              (e.target as CustomEventTarget).blur();
              e.stopPropagation();
              setTimeout(() => {
                (e.target as CustomEventTarget).focus();
              }, 0);
            }}
            onKeyDownCapture={(e) => {
              if (
                e.key === "ArrowUp" ||
                e.key === "ArrowDown" ||
                e.key === "+" ||
                e.key === "-"
              ) {
                e.stopPropagation();
                e.preventDefault();
              }
            }}
            {...form.getInputProps(`sharePrice.priceOfClassBnonVotingShare`)}
          />
        ) : (
          <></>
        )}
      </Stack>
    </StepperFormLayout>
  );
}

const textMap: { [key: number]: string } = {
  0: "First",
  1: "Second",
  2: "Third",
  3: "Fourth",
  4: "Fifth"
};

function SharePriceForCustom({ form }: StOntarioStepSixProps) {
  const fields = form.values.sharePrice.shareClassDetails.map((item, index) => (
    <Box key={item.key}>
      <Title order={6} mt="lg" mb="xs">
        {textMap[index] ? textMap[index] : ""} Share Class Details
      </Title>

      <Box>
        <SimpleGrid cols={4}>
          <Select
            label="Share Class"
            placeholder="Select one"
            data={["Class A", "Class B", "Class C"]}
            {...form.getInputProps(
              `sharePrice.shareClassDetails.${index}.class`
            )}
          />
          <Select
            label="Share Preference"
            placeholder="Select one"
            data={["Common"]}
            {...form.getInputProps(
              `sharePrice.shareClassDetails.${index}.preference`
            )}
          />
          <Select
            label="Voting Rights"
            placeholder="Select one"
            data={["Voting"]}
            {...form.getInputProps(
              `sharePrice.shareClassDetails.${index}.votingRights`
            )}
          />
          <TextInput
            leftSection={"$"}
            label="Initial Price"
            placeholder="1.00"
            type="number"
            min={1}
            onWheel={(e) => {
              (e.target as CustomEventTarget).blur();
              e.stopPropagation();
              setTimeout(() => {
                (e.target as CustomEventTarget).focus();
              }, 0);
            }}
            onKeyDownCapture={(e) => {
              if (
                e.key === "ArrowUp" ||
                e.key === "ArrowDown" ||
                e.key === "+" ||
                e.key === "-"
              ) {
                e.stopPropagation();
                e.preventDefault();
              }
            }}
            {...form.getInputProps(
              `sharePrice.shareClassDetails.${index}.initialPrice`
            )}
          />
        </SimpleGrid>
      </Box>
    </Box>
  ));

  return (
    <StepperFormLayout>
      <Stack gap="lg">
        <Title order={4}>Custom Share Price and Details</Title>
        <Select
          label="How Many Class Share for this Corporation ?"
          placeholder="Select one"
          value={form.values.sharePrice.numOfClassShare}
          data={["1", "2", "3", "4", "5"]}
          onChange={(value) => {
            const val = Number(value);
            form.values.sharePrice.shareClassDetails = [];
            // form.insertListItem("sharePrice.shareClassDetails", null);
            for (let i = 0; i < val; i++) {
              form.insertListItem("sharePrice.shareClassDetails", {
                // eslint-disable-next-line
                // @ts-ignore
                ...stOntarioInitials[`sharePrice`].shareClassDetails[0]
              });
            }

            form.setFieldValue("sharePrice.numOfClassShare", val);
          }}
        />

        {fields}
      </Stack>
    </StepperFormLayout>
  );
}

const StOntario_sharePrice = ({ form }: StOntarioStepSixProps) => {
  const ArticleOptions: ArticleOptions_type = form.values
    .articleOfIncorporation as ArticleOptions_type;

  if (ArticleOptions === "Standard $0.00") {
    return <SharePriceForStandard form={form} />;
  } else if (ArticleOptions === "Advanced $49") {
    return <SharePriceForAdvanced form={form} />;
  } else if (ArticleOptions === "Custom $99") {
    return <SharePriceForCustom form={form} />;
  }
};

export default StOntario_sharePrice;
