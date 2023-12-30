import { Anchor, Breadcrumbs, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import classes from "./breadCrumbs.module.css";

const getRoutes = (pathname: string) => {
  const routes = [] as Array<{ name: string; path: string }>;

  //   if (pathname === "/") routes.push({ name: "Home", path: pathname });

  pathname.split("/").reduce((prev, curr) => {
    const currPath = `${prev}/${curr}`;
    routes.push({ name: curr, path: currPath });
    return currPath;
  });

  return routes;
};

export default function ShowBreadcrumbs() {
  const router = useRouter();
  const routes = getRoutes(router.pathname);

  const crumbs = routes.map((route, idx) => {
    if (idx === routes.length - 1) {
      return (
        <Text key={idx} className={classes.link}>
          {route.name}
        </Text>
      );
    }
    return (
      <Anchor
        component={Link}
        href={route.path}
        key={idx}
        className={classes.link}
      >
        {route.name}
      </Anchor>
    );
  });

  return (
    <Breadcrumbs
      separator={<IconChevronRight size={18} />}
      separatorMargin={1}
      className={classes.breadcrumb}
    >
      {crumbs}
    </Breadcrumbs>
  );
}
