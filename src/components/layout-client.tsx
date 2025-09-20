"use client";

import { Group } from "@chakra-ui/react";
import React from "react";
import SideBar from "./sidebar";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Group h="100dvh" overflow="hidden" w='full' gap='0'>
      <SideBar />
      {children}
    </Group>
  );
}
