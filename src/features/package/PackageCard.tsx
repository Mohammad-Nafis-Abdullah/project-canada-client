import { Button, Card, Flex, List, Text, rem } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import classes from "./package.module.css";
import { Dispatch, SetStateAction } from "react";

type PackageCardProps = {
  id: string;
  name: string;
  price: string;
  offers: string[];
  selectPackage: string;
  setSelectPackage: Dispatch<SetStateAction<string>>;
};

function PackageCard(props: PackageCardProps) {
  const { id, name, price, offers, selectPackage, setSelectPackage } = props;

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section bg="var(--mantine-color-primary-1)">
        <Flex justify="center" align="center" direction="column" h={180}>
          <Text size="xxl" fw={700}>
            {name}
          </Text>
          <Text size="xl" fw={600}>
            {price}
          </Text>
        </Flex>
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <List spacing={6}>
          {offers.map((item, idx) => (
            <List.Item
              key={idx}
              icon={<IconCheck style={{ width: rem(16), height: rem(16) }} />}
            >
              {item}
            </List.Item>
          ))}
        </List>
      </Card.Section>

      <Flex mt="xs" h="100%" direction="column" align="center" justify="end">
        <Button
          fullWidth
          radius="md"
          variant={selectPackage === id ? "filled" : "outline"}
          onClick={() => setSelectPackage(id)}
        >
          Select
        </Button>
      </Flex>
    </Card>
  );
}

export default PackageCard;
