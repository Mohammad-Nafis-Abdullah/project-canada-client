import { ZodSchema, z } from "zod";
import { REQUIRED_ERROR } from "../errors";
import { randomId } from "@mantine/hooks";

export const stAlbertaInitials = {
  corporationType: "numbered",
  legalSuffix: "",
  majorActivities: "",
  nuansReport: [] as File[],
  proposedNameOfCorporation: "",
  corporation: {
    address: "",
    city: "",
    postalCode: "",
    province: "Alberta",
    suite: ""
  },
  office: {
    address: "",
    city: "",
    postalCode: "",
    province: "Alberta",
    suite: ""
  },
  personal: {
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    province: "Alberta",
    suite: "",
    photoPassport: [] as File[]
  },
  directors: [
    {
      label: "Primary",
      key: randomId(),
      firstName: "",
      middleName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      province: "Alberta",
      suite: "",
      poBox: ""
    }
  ],
  classAVotingPrice: "",
  isIssueClassBVoting: "YES",
  isIssueClassCNonVoting: "YES",
  isPrimaryDirectorShareHolder: "YES",
  isPrimaryDirectorOfficer: "",
  officers: [
    {
      fullName: "",
      label: "Primary",
      key: randomId(),
      president: "",
      ceo: "",
      vp: "",
      other: ""
    }
  ]
};

export const stepOneSchema = z
  .object({
    corporationType: z.string().min(1, REQUIRED_ERROR),
    legalSuffix: z.string().min(1, REQUIRED_ERROR),
    majorActivities: z.string().min(1, REQUIRED_ERROR),
    proposedNameOfCorporation: z.string(),
    nuansReport: z.any().array()
  })
  .refine(
    (data) =>
      data.corporationType === "named"
        ? data.nuansReport.length > 0
        : data.nuansReport.length === 0,
    {
      message: REQUIRED_ERROR,
      path: ["nuansReport"]
    }
  );

const stepTwoSchema = z.object({
  corporation: z.object({
    address: z.string().min(1, REQUIRED_ERROR),
    city: z.string().min(1, REQUIRED_ERROR),
    suite: z.string().min(1, REQUIRED_ERROR),
    province: z.string().min(1, REQUIRED_ERROR),
    postalCode: z.string().min(1, REQUIRED_ERROR)
  }),

  office: z.object({
    address: z.string().min(1, REQUIRED_ERROR),
    city: z.string().min(1, REQUIRED_ERROR),
    suite: z.string().min(1, REQUIRED_ERROR),
    province: z.string().min(1, REQUIRED_ERROR),
    postalCode: z.string().min(1, REQUIRED_ERROR)
  })
});

const stepThreeSchema = z.object({
  personal: z.object({
    firstName: z.string().min(1, REQUIRED_ERROR),
    middleName: z.string(),
    lastName: z.string().min(1, REQUIRED_ERROR),
    phone: z.string(),
    email: z.string().email("Invalid email"),
    address: z.string().min(1, REQUIRED_ERROR),
    city: z.string().min(1, REQUIRED_ERROR),
    suite: z.string().min(1, REQUIRED_ERROR),
    province: z.string().min(1, REQUIRED_ERROR),
    postalCode: z.string().min(1, REQUIRED_ERROR),
    photoPassport: z.any().array().min(1, REQUIRED_ERROR)
  })
});

const stepFourSchema = z.object({
  directors: z.array(
    z.object({
      firstName: z.string().min(1, REQUIRED_ERROR),
      middleName: z.string(),
      lastName: z.string().min(1, REQUIRED_ERROR),
      phone: z.string(),
      email: z.string().email("Invalid email"),
      address: z.string().min(1, REQUIRED_ERROR),
      city: z.string().min(1, REQUIRED_ERROR),
      suite: z.string().min(1, REQUIRED_ERROR),
      province: z.string().min(1, REQUIRED_ERROR),
      postalCode: z.string().min(1, REQUIRED_ERROR),
      poBox: z.string().min(1, REQUIRED_ERROR)
    })
  )
});

const stepFiveSchema = z.object({
  classAVotingPrice: z.string().min(1, REQUIRED_ERROR),
  isIssueClassBVoting: z.enum(["YES", "NO"]),
  isIssueClassCNonVoting: z.enum(["YES", "NO"])
});

const stepSixSchema = z.object({
  isPrimaryDirectorShareHolder: z.enum(["YES", "NO"])
});

const stepSevenSchema = z.object({
  isPrimaryDirectorOfficer: z.enum(["YES", "NO"])
});

export const albertaSchema: { [key: number]: ZodSchema } = {
  0: stepOneSchema,
  1: stepTwoSchema,
  2: stepThreeSchema,
  3: stepFourSchema,
  4: stepFiveSchema,
  5: stepSixSchema,
  6: stepSevenSchema
};
