import { Stack } from "@chakra-ui/react";
import { TodoContentHeader, TodoContentStats } from "..";

export default function TodoContent() {
  return (
    <Stack p="4">
      <TodoContentHeader />
      <TodoContentStats />
    </Stack>
  );
}
