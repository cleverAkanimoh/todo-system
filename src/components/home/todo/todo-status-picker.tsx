import { TodoStatus } from "@/store/todos";
import { Button, Group, Popover, Portal, Text } from "@chakra-ui/react";
import { Status, TaskSquare, TickCircle } from "iconsax-react";
import { getToDoColor } from "./todo-utils";

const todoOptions = [
  { icon: TaskSquare, label: "To Do", id: TodoStatus.TODO },
  { icon: Status, label: "In Progress", id: TodoStatus.IN_PROGRESS },
  { icon: TickCircle, label: "Complete", id: TodoStatus.COMPLETED },
] as const;

export default function TodoStatusPicker({
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
