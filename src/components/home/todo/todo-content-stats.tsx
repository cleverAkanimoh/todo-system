"use client";

import { useSetQueryParams } from "@/hooks";
import { useTodo } from "@/hooks/useTodo";
import { TodoStatus } from "@/store/todos";
import { Box, Group, Text } from "@chakra-ui/react";
import { Status, TaskSquare, TickCircle } from "iconsax-react";
import { useSearchParams } from "next/navigation";
import { getToDoColor } from "./todo-utils";

export default function TodoContentStats() {
  const searchParams = useSearchParams();
  const setQueryParams = useSetQueryParams();

  const { todoCount } = useTodo();

  const status = searchParams.get("status");

  const isVerticalLayout =
    (searchParams.get("layout") || "vertical") === "vertical";

  if (!isVerticalLayout) return <></>;

  return (
    <Group bg="background" p="2" borderRadius="md" w="full" overflow={"hidden"}>
      {[
        {
          label: "To Do",
          id: TodoStatus.TODO,
          icon: TaskSquare,
          bg: "purple.bg",
          count: todoCount.todo,
        },
        {
          label: "In Progress",
          id: TodoStatus.IN_PROGRESS,
          icon: Status,
          bg: "yellow.bg",
          count: todoCount.inProgress,
        },
        {
          label: "Complete",
          id: TodoStatus.COMPLETED,
          icon: TickCircle,
          bg: "green.bg",
          count: todoCount.completed,
        },
      ].map((item) => {
        const isActive = status === item.id;
        const color = getToDoColor(item.id);
        return (
          <Group
            key={item.id}
            as="button"
            align="center"
            bg={isActive ? color : "white"}
            py="1"
            px="3"
            borderRadius="md"
            w="100%"
            maxW={{ md: "180px" }}
            justify="space-between"
            onClick={() =>
              setQueryParams({ status: isActive ? null : item.id, page: 1 })
            }
            cursor="pointer"
          >
            <Group align="center">
              <item.icon color={isActive ? "white" : color} size="20" />
              <Text fontSize={14} truncate color={isActive ? "white" : "black"}>
                {item.label}
              </Text>
            </Group>

            <Box fontSize={"xs"} bg={item.bg} p="1" rounded="md">
              ({item.count})
            </Box>
          </Group>
        );
      })}
    </Group>
  );
}
