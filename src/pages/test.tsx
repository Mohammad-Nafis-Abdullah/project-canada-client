import { Box, Container, Paper, Title } from "@mantine/core";
import AppLayout from "~/components/AppLayout";
import { RenderObject } from "~/features/form/steps/ontario/StOntarioStepInfo";

const TestPage = () => {
    //   const obj = {
    //     intentionOfCorporation: "named",
    //     intent: {
    //       proposedBusinessName: "sdfsdfsdf",
    //       legalSuffix: "Ltd.",
    //       haveNuansReport: "YES",
    //       nuansReport: [{}]
    //     },
    //     businessActivity: "fdsf",
    //     corporation: {
    //       province: "BC",
    //       address: "sdfsdfs",
    //       city: "sdfsd",
    //       postalCode: "fsdfsd",
    //       apartment: "dfsdf"
    //     },
    //     directors: [
    //       {
    //         label: "Primary",
    //         key: "mantine-9ref3lhvq",
    //         firstName: "fsdf",
    //         middleName: "dsfsdf",
    //         lastName: "sdf",
    //         phone: "fsdfsd",
    //         email: "f@gmail.com",
    //         isCompleteAddress: "complete",
    //         address: "fsdf",
    //         city: "fsdfsd",
    //         postalCode: "fsdfsdfsdf",
    //         province: "Ontario",
    //         suite: "sdf",
    //         residencyStatus: "Non Resident",
    //         isDirectorAnIncorporator: "YES",
    //         isHaveMoreIncorporator: "YES",
    //         individual: {
    //           firstName: "fdsfsd",
    //           middleName: "fsdf",
    //           lastName: "fsdfsdfsd"
    //         },
    //         corporation: {
    //           name: "fsdfsdf",
    //           ocn: "sdfsdfsdf"
    //         }
    //       }
    //     ],
    //     articleOfIncorporation: "Advanced $49",
    //     rights: "Not Applicable",
    //     restriction: "None",
    //     otherProvisions: "None",
    //     isBylawsAndMinuteBook: "YES",
    //     officerOfCorporations: [
    //       {
    //         label: "Primary",
    //         key: "mantine-m43ywfsxx",
    //         firstName: "fdsfs",
    //         middleName: "dfsdf",
    //         lastName: "sdfsdf",
    //         designation: "VP"
    //       }
    //     ],
    //     sharePrice: {
    //       initialSharePrice: "1.00",
    //       priceOfClassAvotingShare: "1.00",
    //       isClassBnonVotingShareIssued: "YES",
    //       priceOfClassBnonVotingShare: "1.00",
    //       numOfClassShare: "1",
    //       shareClassDetails: [
    //         {
    //           key: "mantine-l9nj1f0gc",
    //           class: "Class A",
    //           preference: "Common",
    //           votingRights: "Voting",
    //           initialPrice: "1.00"
    //         }
    //       ]
    //     },
    //     share: {
    //       priceOfAShare: "",
    //       priceOfBShare: "",
    //       priceOfPerShare: 1,
    //       customArticleText: "",
    //       customArticleAttachment: [],
    //       shareholderOfCorporation: "individual",
    //       invidualShareholder: [
    //         {
    //           label: "Primary",
    //           key: "mantine-rinb6d9mc",
    //           firstName: "fdsfsd",
    //           middleName: "sdfsd",
    //           lastName: "fsdfsdf",
    //           address: "sdfsdfs",
    //           shareClass: "dfsdfsd",
    //           numberOfShare: "fsdfsdfsdf"
    //         }
    //       ]
    //     },
    //     craRegistration: {
    //       gstHstReg: "No $0.00",
    //       payrollReg: "Yes $39.00",
    //       importExportReg: "Yes $39.00",
    //       dividendAccReg: "No $0.00"
    //     },
    //     otherRegistration: {
    //       initialReturn: "No $0.00",
    //       wsib: "Yes $99.00",
    //       domainReg: "Yes $39.00",
    //       emailReg: "Yes $39.00"
    //     },
    //     suppliesAndServices: {
    //       corporateSeal: "No $0.00",
    //       PhysicalMinuteBook: "No $0.00",
    //       oneYearServiceSupport: "Yes $99.00",
    //       annualReturn: "Yes $149.00"
    //     }
    //   };

    //   const obj = {
    //     packageId: "6c6e231d-99ad-464a-9247-0e26205a3047",
    //     intentionOfCorporation: "Numbered (12345678 Canada Inc.)",
    //     intent: {
    //       proposedBusinessName: "",
    //       legalSuffix: "",
    //       haveNuansReport: "NO",
    //       nuansReport: []
    //     },
    //     businessActivity: "fsdfs",
    //     corporation: {
    //       province: "Quebec",
    //       address: "dfsdfsdfs",
    //       city: "fsdf",
    //       postalCode: "fsdfsdf",
    //       apartment: "dfsd"
    //     },
    //     directors: [
    //       {
    //         label: "Primary",
    //         key: "mantine-c80ws1370",
    //         firstName: "fsdffsd",
    //         middleName: "fsdfsd",
    //         lastName: "fsdfs",
    //         phone: "fsdf",
    //         email: "sdf@gmail.com",
    //         isCompleteAddress: "complete",
    //         address: "fdsfsd",
    //         city: "f",
    //         postalCode: "f324234",
    //         province: "Quebec",
    //         suite: "ff",
    //         residencyStatus: "PR",
    //         isDirectorAnIncorporator: "YES",
    //         isHaveMoreIncorporator: "NO",
    //         individual: {
    //           firstName: "",
    //           middleName: "",
    //           lastName: ""
    //         },
    //         corporation: {
    //           name: "",
    //           ocn: ""
    //         }
    //       },
    //       {
    //         label: "Additional",
    //         key: "mantine-c80ws1370",
    //         firstName: "fsdf",
    //         middleName: "fsd",
    //         lastName: "fsdf",
    //         phone: "sdf323423",
    //         email: "df@gmail.com",
    //         isCompleteAddress: "complete",
    //         address: "fsdfs",
    //         city: "sfsd",
    //         postalCode: "sd324234",
    //         province: "Quebec",
    //         suite: "dfsdf",
    //         residencyStatus: "Citizen",
    //         isDirectorAnIncorporator: "YES",
    //         isHaveMoreIncorporator: "NO",
    //         individual: {
    //           firstName: "",
    //           middleName: "",
    //           lastName: ""
    //         },
    //         corporation: {
    //           name: "",
    //           ocn: ""
    //         }
    //       },
    //       {
    //         label: "Additional",
    //         key: "mantine-c80ws1370",
    //         firstName: "fdssd",
    //         middleName: "fsdfs",
    //         lastName: "dfsdf",
    //         phone: "fsdfs",
    //         email: "dfdf@gmail.com",
    //         isCompleteAddress: "corporation",
    //         address: "",
    //         city: "",
    //         postalCode: "",
    //         province: "Ontario Corporation",
    //         suite: "",
    //         residencyStatus: "PR",
    //         isDirectorAnIncorporator: "NO",
    //         isHaveMoreIncorporator: "NO",
    //         individual: {
    //           firstName: "",
    //           middleName: "",
    //           lastName: ""
    //         },
    //         corporation: {
    //           name: "",
    //           ocn: ""
    //         }
    //       }
    //     ],
    //     articleOfIncorporation: "Advanced $49",
    //     rights: "Not Applicable",
    //     restriction: "None",
    //     otherProvisions: "None",
    //     isBylawsAndMinuteBook: "NO",
    //     officerOfCorporations: [
    //       {
    //         label: "Primary",
    //         key: "mantine-uhjb4wi9u",
    //         firstName: "",
    //         middleName: "",
    //         lastName: "",
    //         designation: ""
    //       }
    //     ],
    //     sharePrice: {
    //       initialSharePrice: "1.00",
    //       priceOfClassAvotingShare: "1.00",
    //       isClassBnonVotingShareIssued: "YES",
    //       priceOfClassBnonVotingShare: "1.00",
    //       numOfClassShare: "1",
    //       shareClassDetails: [
    //         {
    //           key: "mantine-cwyxfdw42",
    //           class: "Class A",
    //           preference: "Common",
    //           votingRights: "Voting",
    //           initialPrice: "1.00"
    //         }
    //       ]
    //     },
    //     share: {
    //       priceOfAShare: "",
    //       priceOfBShare: "",
    //       priceOfPerShare: 1,
    //       customArticleText: "",
    //       customArticleAttachment: [],
    //       shareholderOfCorporation: "",
    //       invidualShareholder: [
    //         {
    //           label: "Primary",
    //           key: "mantine-56ssky1rp",
    //           firstName: "",
    //           middleName: "",
    //           lastName: "",
    //           address: "",
    //           shareClass: "",
    //           numberOfShare: ""
    //         }
    //       ]
    //     },
    //     craRegistration: {
    //       gstHstReg: "No $0.00",
    //       payrollReg: "Yes $39.00",
    //       importExportReg: "Yes $39.00",
    //       dividendAccReg: "Yes $39.00"
    //     },
    //     otherRegistration: {
    //       initialReturn: "No $0.00",
    //       wsib: "No $0.00",
    //       domainReg: "Yes $39.00",
    //       emailReg: "Yes $39.00"
    //     },
    //     suppliesAndServices: {
    //       corporateSeal: "No $0.00",
    //       PhysicalMinuteBook: "No $0.00",
    //       oneYearServiceSupport: "Yes $99.00",
    //       annualReturn: "Yes $149.00"
    //     }
    //   };

    const obj = {
        intentionOfCorporation: "Numbered (12345678 Canada Inc.)",
        intent: {
            proposedBusinessName: "",
            legalSuffix: "",
            haveNuansReport: "NO",
            nuansReport: [],
        },
        businessActivity: "",
        corporation: {
            province: "Ontario Corporation",
        },
        directors: [
            {
                label: "Primary",
                key: "mantine-lmyyxdbzs",
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
                    lastName: "",
                },
                corporation: {
                    name: "",
                    ocn: "",
                },
            },
        ],
        articleOfIncorporation: "Advanced $49",
        rights: "Not Applicable",
        restriction: "None",
        otherProvisions: "None",
        isBylawsAndMinuteBook: "NO",
        officerOfCorporations: [
            {
                label: "Primary",
                key: "mantine-kys1judhv",
            },
        ],
        sharePrice: {
            initialSharePrice: "1.00",
            priceOfClassAvotingShare: "1.00",
            priceOfClassBnonVotingShare: "1.00",
            numOfClassShare: "1",
            shareClassDetails: [
                {
                    key: "mantine-tyc77iiao",
                    class: "Class A",
                    preference: "Common",
                    votingRights: "Voting",
                    initialPrice: "1.00",
                },
            ],
        },
        share: {
            priceOfPerShare: 1,
            invidualShareholder: [
                {
                    label: "Primary",
                    key: "mantine-5ladicp3n",
                },
            ],
        },
        craRegistration: {
            gstHstReg: "No $0.00",
            payrollReg: "Yes $39.00",
            importExportReg: "Yes $39.00",
            dividendAccReg: "Yes $39.00",
        },
        otherRegistration: {
            initialReturn: "No $0.00",
            wsib: "No $0.00",
            domainReg: "No $0.00",
            emailReg: "Yes $39.00",
        },
        suppliesAndServices: {
            corporateSeal: "No $0.00",
            PhysicalMinuteBook: "No $0.00",
            oneYearServiceSupport: "Yes $99.00",
            annualReturn: "Yes $149.00",
        },
    };
    let intent = obj.intent as any;
    if (obj.intentionOfCorporation === "named") {
        intent = {
            "Proposed Business Name": obj.intent.proposedBusinessName,
            "Legal Suffix": obj.intent.legalSuffix,
            //   "Nuans Report": obj.intent.nuansReport[0].name
        };
    }

    // @ts-ignore
    obj.directors = obj.directors.map(({ label, key, ...item }) => {
        if (item.isHaveMoreIncorporator === "NO") {
            return {
                ...item,
                individual: null,
                corporation: null,
            };
        }
    });
    console.log("---------dfsd", obj);

    const values = {
        ...obj,
        intent,
    };

    return (
        <AppLayout>
            <Container size="xl">
                <Box mt="xl">
                    <Title order={2} mb="sm">
                        Test Page
                    </Title>
                    {/* <ShowBreadcrumbs /> */}
                </Box>
                <Paper>
                    <RenderObject values={obj} />
                </Paper>
            </Container>
        </AppLayout>
    );
};

export default TestPage;
