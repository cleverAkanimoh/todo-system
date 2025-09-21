import { TodoPriority } from "@/store/todos";
import { Button, Group, Popover, Portal, Separator, Text } from "@chakra-ui/react";
import { Flag, Slash } from "iconsax-react";
import { getPriorityColor } from "./todo-utils";

const todoPriorityOptions = [
  { icon: Flag, label: "Urgent", id: TodoPriority.URGENT },
  { icon: Flag, label: "Important", id: TodoPriority.IMPORTANT },
  { icon: Flag, label: "Medium", id: TodoPriority.MEDIUM },
  { icon: Flag, label: "Low", id: TodoPriority.LOW },
] as const;

export default function ToDoPriorityPicker({
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
