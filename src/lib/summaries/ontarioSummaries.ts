import { UseFormReturnType } from "@mantine/form";
import { ontarioPackages } from "~/pages/incorporate/standard-corporation/ontario-corporation";
import { stOntarioInitials } from "~/utils/schemas";

export function ontarioSummaries(
  form: UseFormReturnType<typeof stOntarioInitials>
) {
  const ontarioPkg = ontarioPackages.find(
    (item) => item.id === form.values.packageId
  );

  let intentionOfCorporation = null;
  if (form.values.intentionOfCorporation === "named") {
    intentionOfCorporation = Object.keys(form.values.intent).map((_) => {
      return {
        "Proposed Business Name": form.values.intent["proposedBusinessName"]
      };
    });
  }

  const obj = {
    package: {
      name: ontarioPkg?.name,
      price: ontarioPkg?.price
    },

    articleOfIncorporation: form.values.articleOfIncorporation,
    craRegistration: {
      ...form.values.craRegistration
    },
    otherRegistration: {
      ...form.values.otherRegistration
    },
    suppliesAndServices: {
      ...form.values.suppliesAndServices
    }
  };
}
