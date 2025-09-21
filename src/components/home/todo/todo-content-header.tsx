"use client";

import { useSetQueryParams } from "@/hooks";
import { Button, Group, Input } from "@chakra-ui/react";
import { RowHorizontal, RowVertical, SearchNormal } from "iconsax-react";
import { useSearchParams } from "next/navigation";

export default function TodoContentHeader() {
  const searchParams = useSearchParams();
  const layoutParams = searchParams.get("layout") || "vertical";
  const setQueryParams = useSetQueryParams();
  return (
    <Group
      bg="teal.light"
      px="2"
      py="1"
      borderRadius="md"
      justify="space-between"
    >
      <Group
        align="center"
        bg="white"
        px="3"
        borderRadius={"md"}
        w="100%"
        maxW={{ md: "220px" }}
      >
        <SearchNormal color="black" size="18" />
        <Input
          type="text"
          placeholder="Search for To-Do"
          border="0"
          h="30px"
          _focus={{ border: "0", ring: "0", outline: "0" }}
          onChange={(e) => setQueryParams({ search: e.target.value, page: 1 })}
        />
      </Group>
      <Group
        align="center"
        bg="white"
        p="1"
        borderRadius={"lg"}
        flexShrink="0"
        gap="0"
      >
        {[
          { icon: RowHorizontal, id: "horizontal" },
          { icon: RowVertical, id: "vertical" },
        ].map((item, idx) => {
          const isActive = layoutParams === item.id;
          return (
            <Button
              key={idx}
              size="xs"
              bg={isActive ? "teal.1" : "background"}
              onClick={() => setQueryParams({ layout: item.id })}
              scale="0.8"
            >
              <item.icon color={isActive ? "white" : "black"} />
            </Button>
          );
        })}
      </Group>
    </Group>
  );
}
