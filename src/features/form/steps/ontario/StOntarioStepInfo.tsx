import { Box, Paper, Stack, Text, Title } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { ontarioPackages } from "~/pages/incorporate/standard-corporation/ontario-corporation";
import { stOntarioInitials } from "~/utils/schemas";
import { RenderRow } from "./StOntarioStepCost";
import { removeEmptyValue } from "~/lib/removeEmpty";

export const friendlyNames: Record<string, string> = {
  packageId: "Package ID",
  intentionOfCorporation: "Intention of Corporation",
  proposedBusinessName: "Proposed Business Name",
  legalSuffix: "Legal Suffix",
  haveNuansReport: "Have NUANS Report",
  nuansReport: "NUANS Report",
  businessActivity: "Business Activity",
  province: "Province",
  address: "Address",
  city: "City",
  postalCode: "Postal Code",
  apartment: "Apartment",
  directors: "Directors",
  label: "Label",
  key: "Key",
  firstName: "First Name",
  middleName: "Middle Name",
  lastName: "Last Name",
  phone: "Phone",
  email: "Email",
  isCompleteAddress: "Is Complete Address",
  suite: "Suite",
  residencyStatus: "Residency Status",
  isDirectorAnIncorporator: "Is Director an Incorporator",
  individual: "Individual",
  corporation: "Corporation",
  name: "Name",
  ocn: "OCN",
  incorporators: "Incorporators",
  articleOfIncorporation: "Article of Incorporation",
  rights: "Rights",
  restriction: "Restriction",
  otherProvisions: "Other Provisions",
  isBylawsAndMinuteBook: "Bylaws and Minute Book",
  officerOfCorporations: "Officers of Corporations",
  designation: "Designation",
  initialSharePrice: "Initial Share Price",
  priceOfClassAvotingShare: "Price of Class A Voting Share",
  isClassBnonVotingShareIssued: "Is Class B Non-Voting Share Issued",
  priceOfClassBnonVotingShare: "Price of Class B Non-Voting Share",
  numOfClassShare: "Number of Class Share",
  shareClassDetails: "Share Class Details",
  class: "Class",
  preference: "Preference",
  votingRights: "Voting Rights",
  initialPrice: "Initial Price",
  share: "Share",
  sharePrice: "Share Price",
  priceOfAShare: "Price of A Share",
  priceOfBShare: "Price of B Share",
  priceOfPerShare: "Price of Per Share",
  customArticleText: "Custom Article Text",
  customArticleAttachment: "Custom Article Attachment",
  shareholderOfCorporation: "Shareholder of Corporation",
  invidualShareholder: "Individual Shareholder",
  numberOfShare: "Number of Share"
  // craRegistration: "CRA Registration",
  // gstHstReg: "GST/HST Registration",
  // payrollReg: "Payroll Registration",
  // importExportReg: "Import/Export Registration",
  // dividendAccReg: "Dividend Account Registration",
  // otherRegistration: "Other Registration",
  // initialReturn: "Initial Return",
  // wsib: "WSIB",
  // domainReg: "Domain Registration",
  // emailReg: "Email Registration",
  // suppliesAndServices: "Supplies and Services",
  // corporateSeal: "Corporate Seal",
  // PhysicalMinuteBook: "Physical Minute Book",
  // oneYearServiceSupport: "One Year Service Support",
  // annualReturn: "Annual Return"
};

interface RenderObjectProps {
  values: Record<string, any>;
}

export const RenderObject = ({ values }: RenderObjectProps) => {
  values = removeEmptyValue(values);

  const renderValue = (key: string, value: any) => {
    const friendlyName = friendlyNames[key] || key;

    if (!friendlyNames[key]) return null;

    if (Array.isArray(value) && value.length !== 0) {
      return (
        <Box key={key}>
          <Title order={5}>{friendlyName}</Title>
          {value.map((item, index) => (
            <Box key={index} mb="md">
              {typeof item === "object" ? (
                <RenderObject values={item} />
              ) : (
                <Text size="md">{item}</Text>
              )}
            </Box>
          ))}
        </Box>
      );
    }

    if (typeof value === "object" && value !== null) {
      return (
        <div key={key}>
          <Title order={5}>{friendlyName}</Title>
          <RenderObject values={value} />
        </div>
      );
    }

    return (
      <Text size="md" key={key}>
        <strong>{friendlyName}:</strong> {value.toString()}
      </Text>
    );
  };

  return (
    <Box>
      {Object.entries(values).map(([key, value]) => renderValue(key, value))}
    </Box>
  );
};

type StOntarioStepInfoProps = {
  form: UseFormReturnType<typeof stOntarioInitials>;
};

const StOntarioStepInfo = ({ form }: StOntarioStepInfoProps) => {
  const ontarioPkg = ontarioPackages.find(
    (item) => item.id === form.values.packageId
  );

  const { packageId, ...rest } = form.values;

  let intent = null;
  if (form.values.intentionOfCorporation === "named") {
    intent =
      form.values.intent.haveNuansReport === "YES"
        ? {
            "Proposed Business Name": form.values.intent.proposedBusinessName,
            "Legal Suffix": form.values.intent.legalSuffix,
            "Nuans Report": form.values.intent.nuansReport[0].name
          }
        : {
            "Proposed Business Name": form.values.intent.proposedBusinessName,
            "Legal Suffix": form.values.intent.legalSuffix
          };
  }

  if (form.values.sharePrice.isClassBnonVotingShareIssued === "NO") {
    form.values.sharePrice = {
      ...form.values.sharePrice,
      initialSharePrice: "1.00",
      priceOfClassAvotingShare: "1.00",
      priceOfClassBnonVotingShare: "",
      numOfClassShare: "1"
    };
  }

  const obj = {
    ...rest,
    intent
  };

  return (
    <>
      <Title
        order={3}
        mt="xl"
        style={{
          textAlign: "center"
        }}
      >
        Information Summary
      </Title>
      <Paper maw={960} mx="auto" shadow="lg" p="xl">
        <Stack gap="xs">
          <RenderRow
            title="Package"
            value={`${ontarioPkg?.name} ${ontarioPkg?.price}`}
          />

          <RenderObject values={obj} />
        </Stack>
      </Paper>
    </>
  );
};

export default StOntarioStepInfo;

const textMap: { [key: number]: string } = {
  0: "1st",
  1: "2nd",
  2: "3rd",
  3: "4th",
  4: "5th",
  5: "6th"
};
