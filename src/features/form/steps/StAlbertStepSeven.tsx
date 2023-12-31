import {
  ActionIcon,
  Box,
  Button,
  Group,
  Radio,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  TextInput,
  Title
} from "@mantine/core";
import StepperFormLayout from "../StepperFormLayout";
import { UseFormReturnType } from "@mantine/form";
import { stAlbertaInitials } from "~/utils/schemas";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { pageSevenFaqs } from "~/utils/faqs";

type StAlbertStepSevenProps = {
  form: UseFormReturnType<typeof stAlbertaInitials>;
};

const StAlbertStepSeven = ({ form }: StAlbertStepSevenProps) => {
  const [isMore, setIsMore] = useState("");

  const fields = form.values.officers.map((item, index) => (
    <Box key={item.key}>
      {index > 0 && (
        <Box>
          <Group justify="end">
            <ActionIcon
              color="red"
              variant="subtle"
              onClick={() => form.removeListItem("officers", index)}
            >
              <IconTrash size="1rem" />
            </ActionIcon>
          </Group>
          <TextInput
            label="What is the Full name of the officer"
            {...form.getInputProps(`officers.${index}.fullName`)}
          />

          <Title order={6} mt="lg" mb="xs">
            Officer&apos;s designation
          </Title>
        </Box>
      )}
      <Box>
        <SimpleGrid cols={2}>
          <TextInput
            label="President"
            {...form.getInputProps(`officers.${index}.president`)}
          />
          <TextInput
            label="CEO"
            {...form.getInputProps(`officers.${index}.ceo`)}
          />
          <TextInput
            label="VP"
            {...form.getInputProps(`officers.${index}.vp`)}
          />
          <TextInput
            label="Other"
            {...form.getInputProps(`officers.${index}.other`)}
          />
        </SimpleGrid>
      </Box>
    </Box>
  ));

  return (
    <StepperFormLayout title="Corporation's Officer(s)" faqs={pageSevenFaqs}>
      <Stack gap="lg">
        <Radio.Group
          label="Is the 'Primary Director' the primary officer?"
          {...form.getInputProps("isPrimaryDirectorOfficer")}
        >
          <Radio value="YES" mt="xs" label="YES" />
          <Radio value="NO" my="xs" label="NO" />
        </Radio.Group>

        {form.values.isPrimaryDirectorOfficer === "YES" && (
          <Box>
            <Title order={6}>Primary Officer&apos;s designation</Title>
            {fields.slice(0, 1)}

            <Stack mt="lg">
              {fields.slice(1)}

              <Box>
                <Button
                  mt="lg"
                  leftSection={<IconPlus size={16} />}
                  disabled={fields.length === 4}
                  onClick={() =>
                    form.insertListItem("officers", {
                      ...stAlbertaInitials["officers"][0],
                      label: "Additional"
                    })
                  }
                >
                  Add more officers
                </Button>
              </Box>
            </Stack>
          </Box>
        )}
      </Stack>
    </StepperFormLayout>
  );
};

export default StAlbertStepSeven;
