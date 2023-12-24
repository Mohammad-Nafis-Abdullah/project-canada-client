export interface MENUS_SCHEMA {
  name: string;
  url: string;
  children: MENUS_SCHEMA[];
}

export type NAVBAR_SCHEMA = MENUS_SCHEMA[];

export const Navbar_data: NAVBAR_SCHEMA = [
  {
    name: "Incorporate",
    url: "incorporate",
    children: [
      {
        name: "Standard Corporation",
        url: "standard-corporation",
        children: [
          {
            name: "Ontario Corporation",
            url: "incorporate/standard-corporation/ontario-corporation",
            children: []
          },
          {
            name: "BC Corporation",
            url: "incorporate/standard-corporation/bc-corporation",
            children: []
          },
          {
            name: "Alberta Corporation",
            url: "incorporate/standard-corporation/alberta-corporation",
            children: []
          },
          {
            name: "Federal Corporation",
            url: "incorporate/standard-corporation/federal-corporation",
            children: []
          },
          {
            name: "Quebec Corporation",
            url: "incorporate/standard-corporation/quebec-corporation",
            children: []
          },
          {
            name: "SK Corporation",
            url: "incorporate/standard-corporation/sk-corporation",
            children: []
          },
          {
            name: "NB Corporation",
            url: "incorporate/standard-corporation/nb-corporation",
            children: []
          },
          {
            name: "Manitoba Corporation",
            url: "incorporate/standard-corporation/manitoba-corporation",
            children: []
          },
          {
            name: "NL Corporation",
            url: "incorporate/standard-corporation/nl-corporation",
            children: []
          },
          {
            name: "NS Corporation",
            url: "incorporate/standard-corporation/ns-corporation",
            children: []
          },
          {
            name: "PEI Corporation",
            url: "incorporate/standard-corporation/pei-corporation",
            children: []
          }
        ]
      },
      {
        name: "Professional Corp",
        url: "professional-corp",
        children: [
          {
            name: "Ontario Professional ",
            url: "ontario-professional",
            children: []
          },
          {
            name: "BC Professional ",
            url: "bc-professional",
            children: []
          },
          {
            name: "Alberta Professional ",
            url: "alberta-professional",
            children: []
          },
          {
            name: "Quebec Professional ",
            url: "quebec-professional",
            children: []
          },
          {
            name: "NB Professional ",
            url: "nb-professional",
            children: []
          },
          {
            name: "SK Professional ",
            url: "sk-professional",
            children: []
          },
          {
            name: "MB Professional ",
            url: "mb-professional",
            children: []
          },
          {
            name: "NL Professional ",
            url: "nl-professional",
            children: []
          },
          {
            name: "NS Professional ",
            url: "ns-professional",
            children: []
          },
          {
            name: "PEI Professional ",
            url: "pei-professional",
            children: []
          }
        ]
      },
      {
        name: "Special Corporations",
        url: "special-corporations",
        children: [
          { name: "Ontario PREC", url: "ontario-prec", children: [] },
          {
            name: "Ontario Co-operative",
            url: "ontario-co-operative",
            children: []
          },
          {
            name: "BC Co-operative",
            url: "bc-co-operative",
            children: []
          },
          {
            name: "BC Benefit Company",
            url: "bc-benefit-company",
            children: []
          },
          {
            name: "Extra Provincial",
            url: "extra-provincial",
            children: []
          },
          {
            name: "Shelf Corporations",
            url: "shelf-corporations",
            children: []
          }
        ]
      }
    ]
  },
  {
    name: "Non-Profit",
    url: "non-profit",
    children: [
      {
        name: "Federal Non-Profit",
        url: "federal-non-profit",
        children: []
      },
      {
        name: "Ontario Non-Profit",
        url: "ontario-non-profit",
        children: []
      },
      { name: "BS Society", url: "bs-society", children: [] },
      {
        name: "Alberta Non-Profit",
        url: "alberta-non-profit",
        children: []
      },
      {
        name: "Quebec Non-Profit",
        url: "quebec-non-profit",
        children: []
      },
      { name: "NB Non-Profit", url: "nb-non-profit", children: [] },
      { name: "NS Non-Profit", url: "ns-non-profit", children: [] },
      { name: "NL Non-Profit", url: "nl-non-profit", children: [] },
      { name: "PEI Non-Profit", url: "pei-non-profit", children: [] },
      { name: "SK Non-Profit", url: "sk-non-profit", children: [] },
      {
        name: "Manitoba Non-Profit",
        url: "manitoba-non-profit",
        children: []
      }
    ]
  },
  {
    name: "Registry",
    url: "registry",
    children: [
      {
        name: "Master Business License",
        url: "master-business-license",
        children: []
      },
      {
        name: "Sole Proprietorship",
        url: "sole-proprietorship",
        children: []
      },
      { name: "DBA/Operating As", url: "dba_operating-as", children: [] }
    ]
  },
  {
    name: "Partnership",
    url: "partnership",
    children: [
      {
        name: "General Partnership",
        url: "general-partnership",
        children: []
      },
      {
        name: "Limited Partnership (LP)",
        url: "limited-partnership-lp",
        children: []
      },
      {
        name: "Limited Liability Partnership (LLP)",
        url: "limited-liability-partnership-llp",
        children: []
      }
    ]
  },
  {
    name: "Search",
    url: "search",
    children: [
      { name: "NUANS® Report", url: "nuans-report", children: [] },
      {
        name: "Name Pre-Approval",
        url: "name-pre-approval",
        children: []
      },
      { name: "Name Pre Search", url: "name-pre-search", children: [] },
      {
        name: "Corporate Profile Report",
        url: "corporate-profile-report",
        children: []
      },
      { name: "Company Key", url: "company-key", children: [] },
      {
        name: "Certificate of Status",
        url: "certificate-of-status",
        children: []
      },
      {
        name: "Certificate & Article",
        url: "certificate-and-article",
        children: []
      },
      {
        name: "Other Corporate Records",
        url: "other-corporate-records",
        children: []
      }
    ]
  },
  {
    name: "Filing",
    url: "filing",
    children: [
      { name: "Notice of Change", url: "notice-of-change", children: [] },
      { name: "Annual Return", url: "annual-return", children: [] },
      { name: "Initial Return", url: "initial-return", children: [] }
    ]
  },
  {
    name: "Support",
    url: "support",
    children: [
      {
        name: "CRA & WCB",
        url: "cra-wcb",
        children: [
          { name: "CRA Accounts", url: "cra-accounts", children: [] },
          {
            name: "WCB All Provinces",
            url: "wcb-all-provinces",
            children: []
          },
          {
            name: "Charity Status",
            url: "charity-status",
            children: []
          }
        ]
      },
      {
        name: "Corporate Supplies",
        url: "corporate-supplies",
        children: [
          { name: "Minute Book", url: "minute-book", children: [] },
          {
            name: "1 Year Support",
            url: "one-year-support",
            children: []
          },
          {
            name: "Corporate Seal",
            url: "corporate-seal",
            children: []
          },
          {
            name: "Share Certificates",
            url: "share-certificates",
            children: []
          },
          {
            name: "Address Service",
            url: "address-service",
            children: []
          },
          {
            name: "Agent for Service",
            url: "agent-for-service",
            children: []
          }
        ]
      },
      { name: "Domain Name", url: "domain-name", children: [] },
      {
        name: "Logo Design Service",
        url: "logo-design-service",
        children: []
      },
      { name: "Legal Contracts", url: "legal-contracts", children: [] },
      {
        name: "Accounting Supports",
        url: "accounting-supports",
        children: []
      },
      { name: "Add in Package", url: "add-in-package", children: [] },
      {
        name: "Service Upgrade",
        url: "service-upgrade",
        children: [
          {
            name: "Service Speed Queue",
            url: "service-speed-queue",
            children: []
          },
          {
            name: "BC Priority Queue",
            url: "bc-priority-queue",
            children: []
          },
          {
            name: "Minute book Upgrade",
            url: "minute-book-upgrade",
            children: []
          },
          {
            name: "Customized Article",
            url: "customized-article",
            children: []
          },
          {
            name: "Professional Corp",
            url: "professional-corp",
            children: []
          }
        ]
      },
      { name: "Non-Resident", url: "non-resident", children: [] }
    ]
  }
];
