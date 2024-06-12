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
  intentionOfCorporation: "Numbered (12345678 Canada Inc.)",
  intent: {
    proposedBusinessName: "",
    legalSuffix: "",
    haveNuansReport: "NO",
    nuansReport: [] as File[]
  },

  // step - 3
  businessActivity: "",
  corporation: {
    province: "Ontario Corporation",
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
      province: "Ontario Corporation",
      suite: "",
      residencyStatus: "",
      isDirectorAnIncorporator: "NO",
      isHaveMoreIncorporator: "NO",
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
  rights: "Not Applicable",
  restriction: "None",
  otherProvisions: "None",

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

  // share price for step - 5
  sharePrice: {
    initialSharePrice: "1.00",
    priceOfClassAvotingShare: "1.00",
    isClassBnonVotingShareIssued: "NO",
    priceOfClassBnonVotingShare: "1.00",
    numOfClassShare: "1",
    shareClassDetails: [
      {
        key: randomId(),
        class: "Class A",
        preference: "Common",
        votingRights: "Voting",
        initialPrice: "1.00"
      }
    ]
  },

  // step - 7
  share: {
    priceOfAShare: "",
    priceOfBShare: "",
    priceOfPerShare: 1,
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
        shareClass: "",
        numberOfShare: ""
      }
    ]
  },

  // step - 8
  craRegistration: {
    gstHstReg: "",
    payrollReg: "",
    importExportReg: "",
    dividendAccReg: ""
  },

  // step - 9
  otherRegistration: {
    initialReturn: "",
    wsib: "",
    domainReg: "",
    emailReg: ""
  },

  // step - 10
  suppliesAndServices: {
    corporateSeal: "",
    PhysicalMinuteBook: "",
    oneYearServiceSupport: "",
    annualReturn: ""
  }
};

const packageSchema = z.object({
  packageId: z.string().min(1, REQUIRED_ERROR)
});

const intentSchema = z
  .object({
    intentionOfCorporation: z.enum(
      ["Numbered (12345678 Canada Inc.)", "named"],
      {
        errorMap: () => ({ message: REQUIRED_ERROR })
      }
    ),

    intent: z.object({
      proposedBusinessName: z.string(),
      legalSuffix: z.string().optional(),
      haveNuansReport: z.enum(["YES", "NO"], {
        errorMap: () => ({ message: REQUIRED_ERROR })
      }),
      nuansReport: z.any().array()
    })
  })
  .refine(
    (data) =>
      data.intentionOfCorporation === "named"
        ? data.intent.proposedBusinessName.length > 0
        : data.intent.proposedBusinessName.length === 0,
    {
      message: REQUIRED_ERROR,
      path: ["intent.proposedBusinessName"]
    }
  );

const businessActivitySchema = z.object({
  businessActivity: z.string(),
  corporation: z.object({
    address: z.string(),
    city: z.string(),
    postalCode: z.string(),
    apartment: z.string(),
    province: z.string()
  })
});

const directorSchema = z.object({
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
      isDirectorAnIncorporator: z.enum(["YES", "NO"], {
        errorMap: () => ({ message: REQUIRED_ERROR })
      }),
      isHaveMoreIncorporator: z.enum(["YES", "NO"], {
        errorMap: () => ({ message: REQUIRED_ERROR })
      }),
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

const articleSchema = z.object({
  articleOfIncorporation: z.string().min(1, REQUIRED_ERROR),
  rights: z.string().min(1, REQUIRED_ERROR),
  restriction: z.string().min(1, REQUIRED_ERROR),
  otherProvisions: z.string().min(1, REQUIRED_ERROR)
});

const sharePriceSchema = z.object({
  sharePrice: z.object({
    initialSharePrice: z.string().min(1, REQUIRED_ERROR),
    priceOfClassAvotingShare: z.string().min(1, REQUIRED_ERROR),
    isClassBnonVotingShareIssued: z.enum(["YES", "NO"], {
      errorMap: () => ({ message: REQUIRED_ERROR })
    }),
    numOfClassShare: z.string().min(1),
    priceOfClassBnonVotingShare: z.string().min(1, REQUIRED_ERROR),
    shareClassDetails: z.array(
      z.object({
        class: z.string().min(1),
        preference: z.string().min(1),
        votingRights: z.string().min(1),
        initialPrice: z.string().min(1)
      })
    )
  })
});

const minutebookSchema = z.object({
  isBylawsAndMinuteBook: z.enum(["YES", "NO"], {
    errorMap: () => ({ message: REQUIRED_ERROR })
  }),
  officerOfCorporations: z.array(
    z.object({
      firstName: z.string(),
      middleName: z.string(),
      lastName: z.string(),
      designation: z.string()
    })
  )
});

const shareSchema = z.object({
  share: z.object({
    priceOfAShare: z.string(),
    priceOfBShare: z.string(),
    priceOfPerShare: z.number().int({ message: "Invalid number" }).min(1),
    customArticleText: z.string(),
    customArticleAttachment: z.any().array(),
    shareholderOfCorporation: z.string(),
    invidualShareholder: z.array(
      z.object({
        firstName: z.string(),
        middleName: z.string(),
        lastName: z.string(),
        address: z.string(),
        shareClass: z.string(),
        numberOfShare: z.string()
      })
    )
  })
});

const craRegSchema = z.object({
  craRegistration: z.object({
    gstHstReg: z.string().min(1, REQUIRED_ERROR),
    payrollReg: z.string().min(1, REQUIRED_ERROR),
    importExportReg: z.string().min(1, REQUIRED_ERROR),
    dividendAccReg: z.string().min(1, REQUIRED_ERROR)
  })
});

const otherRegSchema = z.object({
  otherRegistration: z.object({
    initialReturn: z.string().min(1, REQUIRED_ERROR),
    wsib: z.string().min(1, REQUIRED_ERROR),
    domainReg: z.string().min(1, REQUIRED_ERROR),
    emailReg: z.string().min(1, REQUIRED_ERROR)
  })
});

const suppliesAndServicesSchema = z.object({
  suppliesAndServices: z.object({
    corporateSeal: z.string().min(1, REQUIRED_ERROR),
    PhysicalMinuteBook: z.string().min(1, REQUIRED_ERROR),
    oneYearServiceSupport: z.string().min(1, REQUIRED_ERROR),
    annualReturn: z.string().min(1, REQUIRED_ERROR)
  })
});

export const ontarioSchema: { [key: number]: ZodSchema } = {
  0: packageSchema,
  1: intentSchema,
  2: businessActivitySchema,
  3: directorSchema,
  4: articleSchema,
  5: minutebookSchema,
  6: sharePriceSchema,
  7: shareSchema,
  8: craRegSchema,
  9: otherRegSchema,
  10: suppliesAndServicesSchema
};
