import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Group,
  Input,
  Portal,
} from "@chakra-ui/react";
import { CloseCircle, SearchNormal } from "iconsax-react";

const SearchContent = () => {
  return (
    <Group
      align="center"
      bg="background"
      px="4"
      borderRadius={"lg"}
      w="100%"
      maxW={{ md: "400px" }}
      border="1px solid "
      borderColor="border"
      flexShrink="0"
    >
      <SearchNormal color="black" size="18" />
      <Input
        type="text"
        placeholder="Type a todo..."
        border="0"
        _focus={{ border: "0", ring: "0", outline: "0" }}
      />
      <CloseCircle color="black" size="18" />
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
          <Button variant="outline" size="xs">
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
