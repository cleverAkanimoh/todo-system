import { Stack } from "@chakra-ui/react";
import { TodoContentHeader, TodoContentStats, TodoContentTable } from "..";

export default function TodoContent() {
  return (
    <Stack p="4">
      <TodoContentHeader />
      <TodoContentStats />
      <TodoContentTable />
    </Stack>
  );
}
