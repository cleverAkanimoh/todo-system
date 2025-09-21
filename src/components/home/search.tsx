"use client";

import { useSetQueryParams } from "@/hooks";
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Group,
  IconButton,
  Input,
  Portal,
} from "@chakra-ui/react";
import { CloseCircle, SearchNormal } from "iconsax-react";
import { useSearchParams } from "next/navigation";

const SearchContent = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const setSearchParams = useSetQueryParams();
  return (
    <Group
      align="center"
      bg="background"
      pl="3"
      borderRadius={"lg"}
      w="100%"
      maxW={{ md: "400px" }}
      border="1px solid "
      borderColor="border"
      flexShrink="0"
    >
      <SearchNormal color="black" size="16" />
      <Input
        type="text"
        value={search}
        h="35px"
        flex="1"
        onChange={(e) => setSearchParams({ search: e.target.value, page: 1 })}
        placeholder="Search todo..."
        border="0"
        _focus={{ border: "0", ring: "0", outline: "0" }}
        fontSize="sm"
      />
      <IconButton
        onClick={() => setSearchParams({ search: null, page: 1 })}
        variant="ghost"
        p="0"
        size="xs"
        disabled={!search}
      >
        <CloseCircle color="black" size="18" />
      </IconButton>
    </Group>
  );
};

export default function Search() {
  return (
    <>
      <Box hideBelow="md">
        <SearchContent />
      </Box>
      <Dialog.Root>
        <Dialog.Trigger asChild hideFrom="md">
          <Button variant="outline" size="xs" rounded="lg">
            <SearchNormal color="black" />
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Search Your Todo</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <SearchContent />
              </Dialog.Body>

              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}
