import {
  Box,
  Center,
  Collapse,
  Group,
  HoverCard,
  SimpleGrid,
  Stack,
  UnstyledButton,
  rem,
  useMantineTheme
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { MENUS_SCHEMA } from "~/assets/navItems";
import classes from "./navbar.module.css";

export const DesktopNavItem = ({ item }: { item: MENUS_SCHEMA }) => {
  const theme = useMantineTheme();
  const hasLinks = item.children.length > 0;
  const router = useRouter();

  return (
    <HoverCard
      width={450}
      position="bottom"
      radius="md"
      shadow="md"
      withinPortal
    >
      <HoverCard.Target>
        <UnstyledButton
          className={classes.link}
          onClick={() => {
            if (hasLinks) router.push(item.url);
          }}
        >
          <Center inline>
            <Box component="span" mr={5}>
              {item.name}
            </Box>
            {hasLinks && (
              <IconChevronDown
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.blue[6]}
              />
            )}
          </Center>
        </UnstyledButton>
      </HoverCard.Target>

      {hasLinks && (
        <HoverCard.Dropdown style={{ overflow: "hidden" }}>
          <SimpleGrid cols={2} spacing="sm">
            {item.children.map((sub) => (
              <DesktopNavItem key={sub.name} item={sub} />
            ))}
          </SimpleGrid>
        </HoverCard.Dropdown>
      )}
    </HoverCard>
  );
};

export const MobileNavItem = ({ item }: { item: MENUS_SCHEMA }) => {
  const [opened, { toggle }] = useDisclosure(false);
  const router = useRouter();

  const hasLinks = item.children.length > 0;

  return (
    <Box>
      <Group justify="start" mb={5}>
        <UnstyledButton
          onClick={() => {
            if (hasLinks) return toggle();
            router.push(item.url);
          }}
          style={{ display: "flex", gap: 4, alignItems: "center" }}
        >
          <span>{item.name}</span>
          {hasLinks && (
            <IconChevronRight
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? "rotate(-90deg)" : "none"
              }}
            />
          )}
        </UnstyledButton>
      </Group>

      {hasLinks && (
        <Collapse in={opened} ml="sm">
          <Stack gap="xs">
            {item.children.map((sub) => (
              <MobileNavItem key={sub.name} item={sub} />
            ))}
          </Stack>
        </Collapse>
      )}
    </Box>
  );
};
