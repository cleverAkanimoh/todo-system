"use client";

import { Tooltip } from "@/components/ui/tooltip";
import { useSetQueryParams } from "@/hooks";
import { useTodo } from "@/hooks/useTodo";
import { useTodoAction } from "@/store/todo-action";
import { TTodo, useTodoStore } from "@/store/todos";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Group,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Edit,
  Flag,
  Icon,
  ProfileCircle,
  Trash,
} from "iconsax-react";
import { useSearchParams } from "next/navigation";
import { BiMinus, BiPlus } from "react-icons/bi";
import {
  getPriorityColor,
  getToDoColor,
  getToDoIcon,
  todosColumn,
} from "./todo-utils";
const MotionStack = motion.create(Stack);

export default function TodoContentCards() {
  const searchParams = useSearchParams();
  const { TodosOnCompleted, TodosOnInProgress, TodosOnToDo } = useTodo();

  const isVerticalLayout =
    (searchParams.get("layout") || "vertical") === "vertical";

  if (isVerticalLayout) return null;

  return (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap="4">
      {todosColumn({ TodosOnCompleted, TodosOnInProgress, TodosOnToDo }).map(
        (item, idx) => {
          return <TodoContentCard key={idx} item={item} />;
        }
      )}
    </SimpleGrid>
  );
}

const TodoContentCard = ({
  item,
}: {
  item: {
    label: string;
    id: string;
    icon: Icon;
    color: string;
    bg: string;
    count: number;
    todos: TTodo[];
  };
}) => {
  const searchParams = useSearchParams();
  const { open, onToggle } = useDisclosure();
  const setQueryParams = useSetQueryParams();
  const setOpenTodoModal = useTodoAction((state) => state.setOpenTodoModal);
  const deleteTodo = useTodoStore((state) => state.removeTodo);
  const setCurrentTodo = useTodoAction((state) => state.setCurrentTodo);

  const search = searchParams.get("search");

  const normalizedSearch = search?.toLowerCase().trim() ?? "";
  return (
    <Stack bg={item.bg} p="2" borderRadius="md" w="100%" h="fit-content">
      <Group align="center" justify="space-between">
        <Group align="center">
          <Group align="center" bg="white" p="1" px="2" rounded="md">
            <item.icon color={item.color} size="20" />
            <Text fontSize={14} truncate color={"black"}>
              {item.label}
            </Text>
          </Group>

          <Box fontSize={"xs"} bg="white" p="1" rounded="md">
            ({item.count})
          </Box>
        </Group>

        <Button
          size={"xs"}
          bg="white"
          color="black"
          p="1"
          rounded="md"
          onClick={onToggle}
        >
          {!open ? <BiMinus /> : <BiPlus />}
        </Button>
      </Group>

      <AnimatePresence>
        {!open && (
          <MotionStack
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {item.todos.length &&
              item.todos
                .filter((t) =>
                  normalizedSearch
                    ? Object.values(t).some((v) =>
                        String(v).toLowerCase().includes(normalizedSearch)
                      )
                    : true
                )
                .map((item, idx) => {
                  const TodoIcon = getToDoIcon(item.status);
                  return (
                    <Stack key={idx} bg="white" p="4" borderRadius="md">
                      <Text fontWeight="600" color="black.1">
                        {item.name}
                      </Text>
                      <Group>
                        <Calendar color="black" size="16" />{" "}
                        <Text color="black.1" fontWeight={400}>
                          {item.dates}
                        </Text>
                      </Group>
                      <Group>
                        <ProfileCircle color="black" size="16" />{" "}
                        <Text color="black.1" fontWeight={400}>
                          {Array.from({ length: item.assignees }, (_, idx) => {
                            return (
                              <Avatar.Root
                                key={idx}
                                w="20px"
                                h="20px"
                              ></Avatar.Root>
                            );
                          })}
                        </Text>
                      </Group>
                      <Group>
                        <Flag
                          color={getPriorityColor(item.priority)}
                          size="16"
                        />{" "}
                        <Text
                          color="black.1"
                          fontWeight={400}
                          textTransform="capitalize"
                        >
                          {item.priority}
                        </Text>
                      </Group>
                      <Group>
                        {[
                          {
                            label: "Edit Todo",
                            icon: Edit,
                            onClick: () => setCurrentTodo(item, true),
                          },
                          {
                            label: "Delete Todo",
                            icon: Trash,
                            onClick: () => deleteTodo(item.id),
                          },
                        ].map((item, idx) => {
                          const isDelete = item.label.startsWith("Delete");

                          return (
                            <Tooltip key={idx} content={item.label}>
                              <Button
                                variant="ghost"
                                justifyContent="start"
                                onClick={item.onClick}
                                color={isDelete ? "red" : "black"}
                                rounded="none"
                              >
                                <item.icon color={isDelete ? "red" : "black"} />
                                {item.label}
                              </Button>
                            </Tooltip>
                          );
                        })}

                        <Badge
                          bg={getToDoColor(item.status)}
                          color="white"
                          fontWeight="600"
                          justifyContent="center"
                          p="3"
                          rounded="none"
                        >
                          {item.status && <TodoIcon size="16" color="white" />}
                          {item.status.toUpperCase()}
                        </Badge>
                      </Group>
                    </Stack>
                  );
                })}
          </MotionStack>
        )}
      </AnimatePresence>
      <Button
        bg="white"
        color="black"
        size="sm"
        fontWeight={400}
        rounded="md"
        justifyContent="start"
        onClick={() => {
          setQueryParams({ addStatus: item.id });
          setOpenTodoModal(true);
        }}
      >
        <BiPlus /> Add Task
      </Button>
    </Stack>
  );
};
