"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { MantineProvider } from "@mantine/core";
import React from "react";
import { chakraStyleSystem } from ".";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={chakraStyleSystem}>
      <MantineProvider>{children}</MantineProvider>
    </ChakraProvider>
  );
}
