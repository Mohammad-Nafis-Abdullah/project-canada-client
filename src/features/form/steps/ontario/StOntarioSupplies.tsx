import { Radio } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { stOntarioInitials } from "~/utils/schemas";
import StepperFormLayout from "../../StepperFormLayout";
import { z } from "zod";
import { REQUIRED_ERROR } from "~/utils/errors";
import { TPackage } from "~/pages/incorporate/standard-corporation/ontario-corporation";

type StOntarioSuppliesProps = {
  form: UseFormReturnType<typeof stOntarioInitials>;
  selectPackage: TPackage;
};

const StOntarioSupplies = ({ form, selectPackage }: StOntarioSuppliesProps) => {
  return (
    <StepperFormLayout>
      <Radio.Group
        label="Corporate Seal"
        {...form.getInputProps("suppliesAndServices.corporateSeal")}
      >
        <Radio value="Yes $39.00" mt="xs" label="Yes $39.00" />
        <Radio value="No $0.00" my="xs" label="No $0.00" />
      </Radio.Group>
      {selectPackage.code !== "essential" && (
        <Radio.Group
          label="Physical minute book"
          {...form.getInputProps("suppliesAndServices.PhysicalMinuteBook")}
        >
          <Radio value="Yes $49.00" mt="xs" label="Yes $49.00" />
          <Radio value="No $0.00" my="xs" label="No $0.00" />
        </Radio.Group>
      )}

      <Radio.Group
        label="One year Service support"
        {...form.getInputProps("suppliesAndServices.oneYearServiceSupport")}
      >
        <Radio value="Yes $99.00" mt="xs" label="Yes $99.00" />
        <Radio value="No $0.00" my="xs" label="No $0.00" />
      </Radio.Group>

      <Radio.Group
        label="Annual Return"
        {...form.getInputProps("suppliesAndServices.annualReturn")}
      >
        <Radio value="Yes $149.00" mt="xs" label="Yes $149.00" />
        <Radio value="No $0.00" my="xs" label="No $0.00" />
      </Radio.Group>
    </StepperFormLayout>
  );
};

export default StOntarioSupplies;
