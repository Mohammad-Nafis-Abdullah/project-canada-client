import { createTheme, rem } from "@mantine/core";

export const theme = createTheme({
  fontFamily: "",
  defaultRadius: "sm",

  headings: {
    sizes: {
      h1: {
        fontSize: rem(48),
        lineHeight: rem(48)
      },
      h2: {
        fontSize: rem(30),
        lineHeight: rem(36)
      },
      h3: {
        fontSize: rem(24),
        lineHeight: rem(32)
      },
      h4: {
        fontSize: rem(20),
        lineHeight: rem(28)
      },
      h5: {
        fontSize: rem(18),
        lineHeight: rem(28)
      },
      h6: {
        fontSize: rem(16),
        lineHeight: rem(28)
      }
    }
  },
  breakpoints: {
    xs: "40em",
    sm: "48em",
    md: "64em",
    lg: "80em",
    xl: "87.5em"
  },

  colors: {
    primary: [
      "#ffedef",
      "#f7dbe0",
      "#e6b4bd",
      "#d78c98",
      "#ca6a79",
      "#c35466",
      "#c0485c",
      "#aa394c",
      "#993143",
      "#872638"
    ]
  },

  components: {
    Button: {
      defaultProps: {
        color: "primary"
      }
    }
  }
});
