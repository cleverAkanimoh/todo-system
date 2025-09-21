import { Stack } from "@chakra-ui/react";
import {
  TodoContentCards,
  TodoContentHeader,
  TodoContentStats,
  TodoContentTable,
} from "..";

export default function TodoContent() {
  return (
    <Stack p="4" gap="4">
      <TodoContentHeader />
      <TodoContentStats />
      <TodoContentTable />
      <TodoContentCards />
    </Stack>
  );
}
