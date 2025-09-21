import { appMaxSize } from "@/constants";
import { Box, Separator } from "@chakra-ui/react";
import { TodoContent, TodoHeader, TodoModal } from "..";

export default function HomeToDo() {
  return (
    <Box
      maxW={appMaxSize}
      bg="white"
      borderRadius="lg"
      w="100%"
      h="fit-content"
      minH="85dvh"
    >
      <TodoHeader />
      <Separator />
      <TodoContent />
      <TodoModal />
    </Box>
  );
}
