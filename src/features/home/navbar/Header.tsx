import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Flex,
  Group,
  ScrollArea,
  Stack,
  rem
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AppLogo from "~/assets/AppLogo";
import { Navbar_data } from "~/assets/navItems";
import classes from "./navbar.module.css";
import { MobileNavItem, DesktopNavItem } from "./Nav";

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Box>
      <header className={classes.header}>
        <Flex
          justify="space-between"
          h="100%"
          align="center"
          maw={1536}
          mx="auto"
        >
          <AppLogo />

          <Group h="100%" gap={0} visibleFrom="lg">
            {Navbar_data.map((item, index) => (
              <DesktopNavItem key={item.name} item={item} />
            ))}
          </Group>

          <Group visibleFrom="lg">
            <Button variant="outline">Log in</Button>
            <Button>Sign up</Button>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="lg"
          />
        </Flex>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="sm"
        padding="md"
        position="right"
        title="Navigation"
        hiddenFrom="lg"
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`}>
          <Divider my="sm" />

          <Stack gap="xs">
            {Navbar_data.map((item) => (
              <MobileNavItem key={item.name} item={item} />
            ))}
          </Stack>

          <Divider my="sm" />
          <Group justify="center" grow pb="xl" px="md">
            <Button variant="outline">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
