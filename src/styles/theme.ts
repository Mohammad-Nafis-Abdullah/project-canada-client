import { Container, createTheme, rem } from "@mantine/core";

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

  fontSizes: {
    xs: rem(10),
    sm: rem(11),
    md: rem(14),
    lg: rem(16),
    xl: rem(20)
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
    ],

    gray: [
      "#f9fafb",
      "#f3f4f6",
      "#e5e7eb",
      "#d1d5db",
      "#9ca3af",
      "#6b7280",
      "#4b5563",
      "#374151",
      "#1f2937",
      "#030712"
    ]
  },

  components: {
    Container: Container.extend({
      vars: (_, { size, fluid }) => ({
        root: {
          "--container-size": fluid
            ? "100%"
            : size !== undefined && size in CONTAINER_SIZES
            ? CONTAINER_SIZES[size]
            : rem(size)
        }
      })
    }),
    Button: {
      defaultProps: {
        color: "primary"
      }
    },
    TextInput: {
      defaultProps: {
        size: "md",
        color: "primary"
      }
    },
    Textarea: {
      defaultProps: {
        size: "md",
        color: "primary"
      }
    },
    Select: {
      defaultProps: {
        size: "md",
        color: "primary"
      }
    },
    RadioGroup: {
      defaultProps: {
        size: "md",
        color: "primary"
      }
    },
    Radio: {
      defaultProps: {
        size: "sm",
        color: "primary"
      }
    }
  }
});

const CONTAINER_SIZES: Record<string, string> = {
  sm: rem(640),
  md: rem(768),
  lg: rem(1024),
  xl: rem(1280),
  "2xl": rem(1536)
};
