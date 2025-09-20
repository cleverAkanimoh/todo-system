import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  // strictTokens: true,
  theme: {
    tokens: {
      colors: {
        "teal.1": {
          value: "#75C5C1",
        },
        "teal.light": {
          value: "#E9F5F7",
        },
        "purple.1": {
          value: "#41245F",
        },
        "purple.light": {
          value: "#CFB7E8",
        },
        "purple.bg": {
          value: "#F9F3FF",
        },
        "yellow.1": {
          value: "#F6BE38",
        },
        "yellow.bg": {
          value: "#FBF4E4",
        },
        "green.1": {
          value: "#75C5C1",
        },
        "green.bg": {
          value: "#E9F5F7",
        },
        "grey.1": {
          value: "#E9F5F7",
        },
        border: {
          value: "#CDD6E9",
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
