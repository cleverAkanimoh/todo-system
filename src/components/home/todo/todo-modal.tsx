"use client";

import {
  Button,
  CloseButton,
  Dialog,
  Group,
  Input,
  NumberInput,
  Popover,
  Portal,
  Separator,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
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

import { useTodoAction } from "@/store/todo-action";
import { TodoPriority, TodoStatus } from "@/store/todos";
import { getPriorityColor, getToDoColor } from "./todo-utils";

/* -------------------------------------------------------------------------- */
/*                                   Options                                   */
/* -------------------------------------------------------------------------- */

const todoOptions = [
  { icon: TaskSquare, label: "To Do", id: TodoStatus.TODO },
  { icon: Status, label: "In Progress", id: TodoStatus.IN_PROGRESS },
  { icon: TickCircle, label: "Complete", id: TodoStatus.COMPLETED },
] as const;

const todoPriorityOptions = [
  { icon: Flag, label: "Urgent", id: TodoPriority.URGENT },
  { icon: Flag, label: "Important", id: TodoPriority.IMPORTANT },
  { icon: Flag, label: "Medium", id: TodoPriority.MEDIUM },
  { icon: Flag, label: "Low", id: TodoPriority.LOW },
] as const;

/* -------------------------------------------------------------------------- */
/*                             Reusable Pickers                               */
/* -------------------------------------------------------------------------- */

function StatusPicker({
  value,
  onChange,
}: {
  value: TodoStatus;
  onChange: (val: TodoStatus) => void;
}) {
  const selected = todoOptions.find((t) => t.id === value)!;
  return (
    <Group>
      <Group minW="150px">
        <Status color="gray" size="16" /> <Text>Status</Text>
      </Group>
      <Popover.Root>
        <Popover.Trigger asChild>
          <Button
            size="sm"
            variant="outline"
            bg={getToDoColor(selected.id)}
            color="white"
            rounded="lg"
            border="0"
          >
            <selected.icon color="white" /> {selected.label}
          </Button>
        </Popover.Trigger>
        <Portal>
          <Popover.Positioner>
            <Popover.Content maxW="200px">
              <Popover.Body>
                {todoOptions.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    w="full"
                    justifyContent="start"
                    onClick={() => onChange(item.id)}
                  >
                    <item.icon color={getToDoColor(item.id)} />
                    {item.label}
                  </Button>
                ))}
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>
    </Group>
  );
}

function DatesPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const today = dayjs();
  const formatRange = (range: (string | null)[]) =>
    range
      .filter(Boolean)
      .map((d) => d!.replaceAll("-", "/"))
      .join(" - ");

  return (
    <Group>
      <Group minW="150px">
        <Calendar color="gray" size="16" /> <Text>Dates</Text>
      </Group>
      <Popover.Root>
        <Popover.Trigger asChild>
          <Button
            size="sm"
            variant="plain"
            color={value ? "black" : "gray.400"}
            p="0"
          >
            {value || "00/00/0000"}
          </Button>
        </Popover.Trigger>
        <Portal>
          <Popover.Positioner>
            <Popover.Content w="fit-content">
              <Popover.Body>
                <DatePicker
                  type="range"
                  onChange={(val) => onChange(formatRange(val))}
                  presets={[
                    {
                      label: "Last two days",
                      value: [
                        today.subtract(2, "day").format("YYYY-MM-DD"),
                        today.format("YYYY-MM-DD"),
                      ],
                    },
                    {
                      label: "Last 7 days",
                      value: [
                        today.subtract(7, "day").format("YYYY-MM-DD"),
                        today.format("YYYY-MM-DD"),
                      ],
                    },
                    {
                      label: "This month",
                      value: [
                        today.startOf("month").format("YYYY-MM-DD"),
                        today.format("YYYY-MM-DD"),
                      ],
                    },
                    {
                      label: "Last month",
                      value: [
                        today
                          .subtract(1, "month")
                          .startOf("month")
                          .format("YYYY-MM-DD"),
                        today
                          .subtract(1, "month")
                          .endOf("month")
                          .format("YYYY-MM-DD"),
                      ],
                    },
                    {
                      label: "Last year",
                      value: [
                        today
                          .subtract(1, "year")
                          .startOf("year")
                          .format("YYYY-MM-DD"),
                        today
                          .subtract(1, "year")
                          .endOf("year")
                          .format("YYYY-MM-DD"),
                      ],
                    },
                  ]}
                />
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>
    </Group>
  );
}

function PriorityPicker({
  value,
  onChange,
}: {
  value: TodoPriority | null;
  onChange: (val: TodoPriority | null) => void;
}) {
  const selected = todoPriorityOptions.find((t) => t.id === value);
  return (
    <Group>
      <Group minW="150px">
        <Flag color="gray" size="16" /> <Text>Priority</Text>
      </Group>
      <Popover.Root>
        <Popover.Trigger asChild>
          <Button
            size="sm"
            variant="plain"
            color={selected ? "black" : "gray.400"}
            p="0"
          >
            {selected && <Flag color={getPriorityColor(selected.id)} />}
            {selected?.label || "Select Priority"}
          </Button>
        </Popover.Trigger>
        <Portal>
          <Popover.Positioner>
            <Popover.Content maxW="200px">
              <Popover.Body p="0" py="2">
                {todoPriorityOptions.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    w="full"
                    justifyContent="start"
                    onClick={() => onChange(item.id)}
                  >
                    <Flag color={getPriorityColor(item.id)} />
                    {item.label}
                  </Button>
                ))}
              </Popover.Body>
              <Separator />
              <Popover.Footer p="0">
                <Button variant="plain" p="4" onClick={() => onChange(null)}>
                  <Slash color="black" /> Clear
                </Button>
              </Popover.Footer>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>
    </Group>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Main Modal                                  */
/* -------------------------------------------------------------------------- */

export default function TodoModal() {
  const openTodoModal = useTodoAction((s) => s.openTodoModal);
  const setOpenTodoModal = useTodoAction((s) => s.setOpenTodoModal);

  const [todoStatus, setTodoStatus] = useState<TodoStatus>(TodoStatus.TODO);
  const [todoName, setTodoName] = useState("MKV Intranet V2");
  const [todoDates, setTodoDates] = useState("");
  const [todoPriority, setTodoPriority] = useState<TodoPriority | null>(null);

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
                  <StatusPicker value={todoStatus} onChange={setTodoStatus} />
                  <DatesPicker value={todoDates} onChange={setTodoDates} />

                  <Group>
                    <Group minW="150px">
                      <ProfileCircle color="gray" size="16" />{" "}
                      <Text>Assignees</Text>
                    </Group>
                    <NumberInput.Root
                      defaultValue="2"
                      width="100px"
                      max={4}
                      min={1}
                    >
                      <NumberInput.Control />
                      <NumberInput.Input />
                    </NumberInput.Root>
                  </Group>

                  <PriorityPicker
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
