import { Button, Group, Popover, Portal, Text } from "@chakra-ui/react";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { Calendar } from "iconsax-react";

export default function TodoDatesPicker({
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
