"use client";

import { Box } from "@chakra-ui/react";

import SidebarContent from "./sidebar-content";

export default function SideBar() {
  return (
    <Box hideBelow="lg" maxW="300px" w="full">
      <SidebarContent />;
    </Box>
  );
}
