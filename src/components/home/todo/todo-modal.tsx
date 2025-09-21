"use client";

import { useTodoAction } from "@/store/todo-action";
import { TodoPriority, TodoStatus } from "@/store/todos";
import {
    Button,
    CloseButton,
    Dialog,
    Group,
    Input,
    Popover,
    Portal,
    Separator,
    Stack,
    Text,
    Textarea,
} from "@chakra-ui/react";
import {
    Calendar,
    Flag,
    ProfileCircle,
    Slash,
    Status,
    Stickynote,
    TaskSquare,
    TickCircle,
} from "iconsax-react";
import { useState } from "react";
import { getPriorityColor, getToDoColor } from "./todo-utils";

const todoOptions = [
  { icon: TaskSquare, label: "To Do", id: TodoStatus.TODO },
  { icon: Status, label: "In Progress", id: TodoStatus.IN_PROGRESS },
  { icon: TickCircle, label: "Complete", id: TodoStatus.COMPLETED },
];
const todoPriorityOptions = [
  { icon: Flag, label: "Urgent", id: TodoPriority.URGENT },
  { icon: Flag, label: "Important", id: TodoPriority.IMPORTANT },
  { icon: Flag, label: "Normal", id: TodoPriority.MEDIUM },
  { icon: Flag, label: "Low", id: TodoPriority.LOW },
];

export default function TodoModal() {
  const openTodoModal = useTodoAction((state) => state.openTodoModal);
  const setOpenTodoModal = useTodoAction((state) => state.setOpenTodoModal);
  const [todoStatus, setTodoStatus] = useState(TodoStatus.TODO);
  const [todoDates, setTodoDates] = useState("");
  const [todoPriority, setTodoPriority] = useState<TodoPriority | null>(null);

  const selectedTodoOption = todoOptions.find((t) => t.id === todoStatus);
  const selectedTodoPriorityOption = todoPriorityOptions.find(
    (t) => t.id === todoPriority
  );

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
                border="0"
                placeholder="Task Name"
                defaultValue="MKV Intranet V2"
                fontWeight="600"
                _placeholder={{ fontSize: "26px" }}
                fontSize="26px"
                _focus={{ outline: "0" }}
              />
              <Stack mt="6" gap="6">
                <Stack gap="6">
                  <Group>
                    <Group minW="150px">
                      <Status color="gray" size="16" /> <Text>Status</Text>
                    </Group>
                    <Popover.Root>
                      <Popover.Trigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          textTransform="capitalize"
                          bg={getToDoColor(selectedTodoOption?.id || "")}
                          color="white"
                          rounded="lg"
                          border="0"
                        >
                          {selectedTodoOption && (
                            <selectedTodoOption.icon color={"white"} />
                          )}
                          {selectedTodoOption?.label}
                        </Button>
                      </Popover.Trigger>
                      <Portal>
                        <Popover.Positioner>
                          <Popover.Content maxW="200px">
                            <Popover.Body>
                              {todoOptions.map((item) => {
                                const color = getToDoColor(item.id);
                                return (
                                  <Button
                                    key={item.id}
                                    variant="ghost"
                                    w="full"
                                    justifyContent="start"
                                    onClick={() => setTodoStatus(item.id)}
                                  >
                                    <item.icon color={color} />
                                    {item.label}
                                  </Button>
                                );
                              })}
                            </Popover.Body>
                          </Popover.Content>
                        </Popover.Positioner>
                      </Portal>
                    </Popover.Root>
                  </Group>
                  <Group>
                    <Group minW="150px">
                      <Calendar color="gray" size="16" /> <Text>Dates</Text>
                    </Group>
                  </Group>
                  <Group>
                    <Group>
                      <ProfileCircle color="gray" size="16" />{" "}
                      <Text>Assignees</Text>
                    </Group>
                  </Group>

                  <Group>
                    <Group minW="150px">
                      <Flag color="gray" size="16" /> <Text>Priority</Text>
                    </Group>
                    <Popover.Root>
                      <Popover.Trigger asChild>
                        <Button
                          size="sm"
                          variant="plain"
                          textTransform="capitalize"
                          color={
                            selectedTodoPriorityOption ? "black" : "gray.400"
                          }
                        >
                          {selectedTodoPriorityOption && (
                            <Flag
                              color={getPriorityColor(
                                selectedTodoPriorityOption.id
                              )}
                            />
                          )}
                          {selectedTodoPriorityOption?.label ||
                            "Select Priority"}
                        </Button>
                      </Popover.Trigger>
                      <Portal>
                        <Popover.Positioner>
                          <Popover.Content maxW="200px">
                            <Popover.Body p="0" py="2">
                              {todoPriorityOptions.map((item) => {
                                const color = getPriorityColor(item.id);
                                return (
                                  <Button
                                    key={item.id}
                                    variant="ghost"
                                    w="full"
                                    justifyContent="start"
                                    onClick={() => setTodoPriority(item.id)}
                                  >
                                    <Flag color={color} />
                                    {item.label}
                                  </Button>
                                );
                              })}
                            </Popover.Body>
                            <Separator />
                            <Popover.Footer p="0">
                              <Button
                                variant="plain"
                                color="black.1"
                                p="4"
                                onClick={() => setTodoPriority(null)}
                              >
                                <Slash color="black" /> Clear
                              </Button>
                            </Popover.Footer>
                          </Popover.Content>
                        </Popover.Positioner>
                      </Portal>
                    </Popover.Root>
                  </Group>
                </Stack>
                <Stack gap="4">
                  <Group>
                    <Stickynote color="gray" size="16" />{" "}
                    <Text>Description</Text>
                  </Group>
                  <Textarea
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
              <Button bg="teal.1" size="sm">
                Create Task
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
