"use client";

import {
  Button,
  CloseButton,
  Dialog,
  Group,
  Input,
  NumberInput,
  Portal,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { ProfileCircle, Stickynote } from "iconsax-react";
import { useState } from "react";

import { useTodoAction } from "@/store/todo-action";
import { TodoPriority, TodoStatus, TTodo, useTodoStore } from "@/store/todos";
import { useSearchParams } from "next/navigation";
import TodoDatesPicker from "./todo-date-picker";
import ToDoPriorityPicker from "./todo-priority-picker";
import TodoStatusPicker from "./todo-status-picker";

export default function TodoModal() {
  const openTodoModal = useTodoAction((s) => s.openTodoModal);
  const setOpenTodoModal = useTodoAction((s) => s.setOpenTodoModal);
  const addTodo = useTodoStore((s) => s.addTodo);
  const editTodo = useTodoStore((s) => s.editTodo);
  const currentTodos = useTodoAction((state) => state.currentTodos);
  const searchParams = useSearchParams();

  const addStatus = searchParams.get("addStatus") as TodoStatus | null;
  console.log(addStatus);
  const [todoStatus, setTodoStatus] = useState<TodoStatus>(
    currentTodos?.status || addStatus || TodoStatus.TODO
  );
  const [todoName, setTodoName] = useState(currentTodos?.name || "");
  const [todoDates, setTodoDates] = useState(currentTodos?.dates || "");
  const [todoDescription, setTodoDescription] = useState(
    currentTodos?.description || ""
  );
  const [todoAssignees, setTodoAssignees] = useState(
    currentTodos?.assignees || 1
  );
  const [todoPriority, setTodoPriority] = useState<TodoPriority | null>(
    currentTodos?.priority || null
  );

  const mutateTask = () => {
    const todoPayload: Omit<TTodo, "id"> = {
      name: todoName,
      assignees: todoAssignees,
      dates: todoDates,
      description: todoDescription,
      priority: todoPriority || TodoPriority.MEDIUM,
      status: todoStatus,
    };
    if (currentTodos) {
      editTodo({ ...todoPayload, id: currentTodos.id });
    } else {
      addTodo(todoPayload);
    }
    setOpenTodoModal(false);
  };

  return (
    <Dialog.Root
      lazyMount
      open={openTodoModal}
      onOpenChange={(e) => setOpenTodoModal(e.open)}
      placement="center"
      size="lg"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner position="center">
          <Dialog.Content>
            <Dialog.Body py="8">
              <Input
                value={todoName}
                onChange={(e) => setTodoName(e.target.value)}
                placeholder="Task Name"
                fontWeight="600"
                fontSize="26px"
                border="0"
                _placeholder={{ fontSize: "26px" }}
                _focus={{ outline: "0" }}
              />

              <Stack mt="6" gap="6" px={{ base: "2", md: "4" }}>
                <Stack gap="6">
                  <TodoStatusPicker
                    value={todoStatus}
                    onChange={setTodoStatus}
                  />
                  <TodoDatesPicker value={todoDates} onChange={setTodoDates} />

                  <Group>
                    <Group minW="150px">
                      <ProfileCircle color="gray" size="16" />{" "}
                      <Text>Assignees</Text>
                    </Group>
                    <NumberInput.Root
                      width="100px"
                      max={4}
                      min={1}
                      value={todoAssignees.toString()}
                      onValueChange={(e) => setTodoAssignees(e.valueAsNumber)}
                    >
                      <NumberInput.Control />
                      <NumberInput.Input />
                    </NumberInput.Root>
                  </Group>

                  <ToDoPriorityPicker
                    value={todoPriority}
                    onChange={setTodoPriority}
                  />
                </Stack>

                <Stack gap="4">
                  <Group>
                    <Stickynote color="gray" size="16" />{" "}
                    <Text>Description</Text>
                  </Group>
                  <Textarea
                    value={todoDescription}
                    onChange={(e) => setTodoDescription(e.target.value)}
                    placeholder="Write something or type"
                    border="0"
                    bg="background"
                    minH="150px"
                    p="4"
                    resize="none"
                    rounded="lg"
                    _focus={{ outline: "0" }}
                  />
                </Stack>
              </Stack>
            </Dialog.Body>

            <Dialog.Footer>
              <Button
                bg="teal.1"
                size="sm"
                onClick={mutateTask}
                title={
                  !todoName || !todoDates || !todoAssignees || !todoPriority
                    ? "Complete all fields to Submit Task"
                    : ""
                }
                disabled={
                  !todoName || !todoDates || !todoAssignees || !todoPriority
                }
              >
                {currentTodos ? "Update Task" : "Create Task"}
              </Button>
            </Dialog.Footer>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="xs" variant="subtle" rounded="full" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
