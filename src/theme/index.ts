import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  // strictTokens: true,
  theme: {
    tokens: {
      colors: {
        "grey.1": {
          value: "#E9F5F7",
        },
        "grey.text": {
          value: "#75C5C1",
        },
      },
      fonts: {
        body: { value: "var(--font-plus-jakarta-sans), sans-serif" },
        heading: { value: "var(--font-plus-jakarta-sans), sans-serif" },
        mono: { value: "var(--font-geist-mono), monospace" },
      },
    },
    semanticTokens: {
      colors: {
        background: {
          value: {
            base: "#F7F7F7",
            _dark: "Background",
          },
        },
      },
    },
  },
});

export const chakraStyleSystem = createSystem(defaultConfig, config);
