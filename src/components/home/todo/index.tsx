import { appMaxSize } from "@/constants";
import { Box } from "@chakra-ui/react";
import { TodoHeader } from "..";

export default function HomeToDo() {
  return (
    <Box maxW={appMaxSize} bg="white">
      <TodoHeader />
    </Box>
  );
}
