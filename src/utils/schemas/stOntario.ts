import { ZodSchema, z } from "zod";
import { REQUIRED_ERROR } from "../errors";
import { randomId } from "@mantine/hooks";

export const residencyStatus: [string, ...string[]] = [
  "PR",
  "Citizen",
  "Non Resident"
];

export const stOntarioInitials = {
  packageId: "",

  intentionOfCorporation: "Numbered (12345678 Canada Inc.)",
  intent: {
    proposedBusinessName: "",
    legalSuffix: "",
    haveNuansReport: "NO",
    nuansReport: [] as File[]
  },

  businessActivity: "",
  corporation: {
    province: "Ontario Corporation",
    address: "",
    city: "",
    postalCode: "",
    apartment: ""
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
      isCompleteAddress: "",
      address: "",
      city: "",
      postalCode: "",
      province: "Ontario Corporation",
      suite: "",
      residencyStatus: "",
      isDirectorAnIncorporator: "NO",
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

  articleOfIncorporation: "",
  rights: "Not Applicable",
  restriction: "None",
  otherProvisions: "None",

  incorporators: [],

  isBylawsAndMinuteBook: "YES",
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

  mandatoryInitialReturn: {
    wantToFileInitialReturn: "Yes $79.00"
  },

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

  craRegistration: {
    gstHstReg: "",
    payrollReg: "",
    importExportReg: "",
    dividendAccReg: ""
  },

  otherRegistration: {
    initialReturn: "",
    wsib: "",
    domainReg: "",
    emailReg: ""
  },

  suppliesAndServices: {
    corporateSeal: "",
    PhysicalMinuteBook: "",
    oneYearServiceSupport: "",
    annualReturn: ""
  }
};

export const ontarioFormSchema = z.object({
  packageId: z.string(),

  intentionOfCorporation: z.enum(["Numbered (12345678 Canada Inc.)", "named"], {
    errorMap: () => ({ message: REQUIRED_ERROR })
  }),

  intent: z.object({
    proposedBusinessName: z.string().optional(),
    legalSuffix: z.string().optional(),
    haveNuansReport: z.enum(["YES", "NO"], {
      errorMap: () => ({ message: REQUIRED_ERROR })
    }),
    nuansReport: z.any().array().optional()
  }),

  businessActivity: z.string().optional(),
  corporation: z.object({
    address: z.string().optional(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
    apartment: z.string().optional(),
    province: z.string().optional()
  }),

  directors: z.array(
    z.object({
      firstName: z.string().optional(),
      middleName: z.string().optional(),
      lastName: z.string().optional(),
      phone: z.string().optional(),
      isCompleteAddress: z.string().optional(),
      address: z.string().optional(),
      city: z.string().optional(),
      suite: z.string().optional(),
      province: z.string().optional(),
      postalCode: z.string().optional(),
      email: z.string().max(0).or(z.string().email()),
      residencyStatus: z.string().optional(),
      isDirectorAnIncorporator: z.enum(["YES", "NO"], {
        errorMap: () => ({ message: REQUIRED_ERROR })
      }),
      individual: z.object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional()
      }),
      corporation: z.object({
        name: z.string().optional(),
        ocn: z.string().optional()
      })
    })
  ),

  incorporators: z.array(
    z.object({
      firstName: z.string().optional(),
      middleName: z.string().optional(),
      lastName: z.string().optional(),
      phone: z.string().optional(),
      isCompleteAddress: z.string().optional(),
      address: z.string().optional(),
      city: z.string().optional(),
      suite: z.string().optional(),
      province: z.string().optional(),
      postalCode: z.string().optional(),
      email: z.string().max(0).or(z.string().email()),
      residencyStatus: z.string().optional(),
      individual: z.object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional()
      }),
      corporation: z.object({
        name: z.string().optional(),
        ocn: z.string().optional()
      })
    })
  ),

  articleOfIncorporation: z.string().optional(),
  rights: z.string().optional(),
  restriction: z.string().optional(),
  otherProvisions: z.string().optional(),

  sharePrice: z.object({
    initialSharePrice: z.string().optional(),
    priceOfClassAvotingShare: z.string().optional(),
    isClassBnonVotingShareIssued: z.enum(["YES", "NO"], {
      errorMap: () => ({ message: REQUIRED_ERROR })
    }),
    numOfClassShare: z.string().optional(),
    priceOfClassBnonVotingShare: z.string().optional(),
    shareClassDetails: z.array(
      z.object({
        class: z.string().optional(),
        preference: z.string().optional(),
        votingRights: z.string().optional(),
        initialPrice: z.string().optional()
      })
    )
  }),

  isBylawsAndMinuteBook: z.enum(["YES", "NO"], {
    errorMap: () => ({ message: REQUIRED_ERROR })
  }),
  officerOfCorporations: z.array(
    z.object({
      firstName: z.string().optional(),
      middleName: z.string().optional(),
      lastName: z.string().optional(),
      designation: z.string().optional()
    })
  ),

  share: z.object({
    priceOfAShare: z.string().optional(),
    priceOfBShare: z.string().optional(),
    priceOfPerShare: z.number().int({ message: "Invalid number" }).min(1),
    customArticleText: z.string().optional(),
    customArticleAttachment: z.any().array().optional(),
    shareholderOfCorporation: z.string().optional(),
    invidualShareholder: z.array(
      z.object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
        address: z.string().optional(),
        shareClass: z.string().optional(),
        numberOfShare: z.string().optional()
      })
    )
  }),

  craRegistration: z.object({
    gstHstReg: z.string().optional(),
    payrollReg: z.string().optional(),
    importExportReg: z.string().optional(),
    dividendAccReg: z.string().optional()
  }),

  otherRegistration: z.object({
    initialReturn: z.string().optional(),
    wsib: z.string().optional(),
    domainReg: z.string().optional(),
    emailReg: z.string().optional()
  }),

  suppliesAndServices: z.object({
    corporateSeal: z.string().optional(),
    PhysicalMinuteBook: z.string().optional().nullable(),
    oneYearServiceSupport: z.string().optional(),
    annualReturn: z.string().optional()
  }),

  mandatoryInitialReturn: z.object({
    wantToFileInitialReturn: z.enum(["Yes $79.00", "No $0.00"], {
      errorMap: () => ({ message: REQUIRED_ERROR })
    })
  })
});
