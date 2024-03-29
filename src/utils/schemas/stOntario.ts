import { ZodSchema, z } from "zod";
import { REQUIRED_ERROR } from "../errors";
import { randomId } from "@mantine/hooks";

export const residencyStatus: [string, ...string[]] = [
  "PR",
  "Citizen",
  "Non Resident"
];

export const stOntarioInitials = {
  // step - 1
  packageId: "",

  // step - 2
  intentionOfCorporation: "numbered",
  proposedBusinessName: "",
  legalSuffix: "",
  haveNuansReport: "YES",
  nuansReport: [] as File[],

  // step - 3
  businessActivity: "",
  corporation: {
    address: "",
    city: "",
    postalCode: "",
    apartment: ""
  },

  // step - 4
  directors: [
    {
      label: "Primary",
      key: randomId(),
      firstName: "",
      middleName: "",
      lastName: "",
      phone: "",
      email: "",
      isCompleteAddress: "",
      address: "",
      city: "",
      postalCode: "",
      province: "Ontario",
      suite: "",

      residencyStatus: "",
      isDirectorAnIncorporator: "director",
      isHaveMoreIncorporator: "YES",
      individual: {
        firstName: "",
        middleName: "",
        lastName: ""
      },
      corporation: {
        name: "",
        ocn: ""
      }
    }
  ],

  // step - 5
  articleOfIncorporation: "",

  // step - 6
  isBylawsAndMinuteBook: "",
  officerOfCorporations: [
    {
      label: "Primary",
      key: randomId(),
      firstName: "",
      middleName: "",
      lastName: "",
      designation: ""
    }
  ],

  // step - 7
  priceOfAShare: "",
  priceOfBShare: "",
  customArticleText: "",
  customArticleAttachment: [] as File[],
  shareholderOfCorporation: "",
  invidualShareholder: [
    {
      label: "Primary",
      key: randomId(),
      firstName: "",
      middleName: "",
      lastName: "",
      address: "",
      numberOfShare: ""
    }
  ],

  // step - 8
  craRegistration: "",
  otherRegistration: "",
  supplies: "",
  yearlyService: ""
};

const stepOneSchema = z.object({
  packageId: z.string().min(1, REQUIRED_ERROR)
});

const stepTwoSchema = z
  .object({
    intentionOfCorporation: z.enum(["numbered", "named"]),
    proposedBusinessName: z.string(),
    legalSuffix: z.string().optional(),
    haveNuansReport: z.enum(["YES", "NO"]).default("YES"),
    nuansReport: z.any().array()
  })
  .refine(
    (data) =>
      data.intentionOfCorporation === "named"
        ? data.proposedBusinessName.length > 0
        : data.proposedBusinessName.length === 0,
    {
      message: REQUIRED_ERROR,
      path: ["proposedBusinessName"]
    }
  );

const stepThreeSchema = z.object({
  businessActivity: z.string(),
  corporation: z.object({
    address: z.string(),
    city: z.string(),
    postalCode: z.string(),
    apartment: z.string()
  })
});

const stepFourSchema = z.object({
  directors: z.array(
    z.object({
      firstName: z.string(),
      middleName: z.string(),
      lastName: z.string(),
      phone: z.string(),
      isCompleteAddress: z.string(),
      address: z.string(),
      city: z.string(),
      suite: z.string(),
      province: z.string(),
      postalCode: z.string(),
      email: z.string().max(0).or(z.string().email()),
      residencyStatus: z.string(),
      isDirectorAnIncorporator: z.enum(["YES", "NO"]),
      isHaveMoreIncorporator: z.enum(["YES", "NO"]),
      individual: z.object({
        firstName: z.string(),
        middleName: z.string(),
        lastName: z.string()
      }),
      corporation: z.object({
        name: z.string(),
        ocn: z.string()
      })
    })
  )
});

const stepFiveSchema = z.object({
  articleOfIncorporation: z.string()
});

const stepSixSchema = z.object({
  isBylawsAndMinuteBook: z.enum(["YES", "NO"]),
  officerOfCorporations: z.array(
    z.object({
      firstName: z.string(),
      middleName: z.string(),
      lastName: z.string(),
      designation: z.string()
    })
  )
});

const stepSevenSchema = z.object({
  priceOfAShare: z.string(),
  priceOfBShare: z.string(),
  customArticleText: z.string(),
  customArticleAttachment: z.any().array(),
  shareholderOfCorporation: z.string(),
  invidualShareholder: z.array(
    z.object({
      firstName: z.string(),
      middleName: z.string(),
      lastName: z.string(),
      address: z.string(),
      numberOfShare: z.string()
    })
  )
});

const stepEightSchema = z.object({
  craRegistration: z.string(),
  otherRegistration: z.string(),
  supplies: z.string(),
  yearlyService: z.string()
});

export const ontarioSchema: { [key: number]: ZodSchema } = {
  0: stepOneSchema,
  1: stepTwoSchema,
  2: stepThreeSchema,
  3: stepFourSchema,
  4: stepFiveSchema,
  5: stepSixSchema,
  6: stepSevenSchema,
  7: stepEightSchema
};
