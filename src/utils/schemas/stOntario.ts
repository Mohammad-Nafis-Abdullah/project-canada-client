import { ZodSchema, string, z } from "zod";
import { REQUIRED_ERROR } from "../errors";
import { randomId } from "@mantine/hooks";

export const stOntarioInitials = {
  packageId: "",
  intentionOfCorporation: "numbered",
  businessName: ""
};

const stepOneSchema = z.object({
  packageId: z.string().min(1, REQUIRED_ERROR)
});

const stepTwoSchema = z.object({
  intentionOfCorporation: z.enum(["numbered", "named"]),
  proposedBusinessName: z.string().min(1, REQUIRED_ERROR),
  legalSuffix: z.enum([
    "INC.",
    "CORP.",
    "LTD.",
    "Incorporation",
    "CORPORATION",
    "Limited"
  ]),
  haveNuansReport: z.enum(["YES", "NO"]).default("YES")
});

export const ontarioSchema: { [key: number]: ZodSchema } = {
  0: stepOneSchema,
  1: stepTwoSchema
};
