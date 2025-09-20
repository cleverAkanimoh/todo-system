"use client";

import {
    Avatar,
    Button,
    ButtonGroup,
    Flex,
    IconButton,
    Pagination,
    Stack,
    Table,
} from "@chakra-ui/react";
import { Flag } from "iconsax-react";
import { FaEllipsisH } from "react-icons/fa";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const TodoContentTable = () => {
  return (
    <Stack width="full" gap="5" h="full">
      <Table.Root
        size="sm"
        variant="outline"
        rounded="lg"
        overflow={"auto"}
        h="full"
      >
        <Table.Header>
          <Table.Row divideX="1.5px" h="70px">
            {["Name", "Date", "Assignee", "Priority", ""].map((label) => {
              return (
                <Table.ColumnHeader
                  key={label}
                  fontSize={14}
                  fontWeight={600}
                  p="4"
                  _last={{ border: 0 }}
                >
                  {label}
                </Table.ColumnHeader>
              );
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item) => {
            const priority = item.priority.toLowerCase();
            const flagColor =
              priority === "medium"
                ? "#75C5C1"
                : priority === "important"
                ? "#F6BE38"
                : "#FF515D";
            return (
              <Table.Row key={item.id} fontWeight={500} color="black.1">
                <Table.Cell px="4" py="6">
                  {item.name}
                </Table.Cell>
                <Table.Cell>{item.date}</Table.Cell>
                <Table.Cell>
                  {Array.from({ length: item.assignee }, (_, idx) => {
                    return (
                      <Avatar.Root key={idx} w="20px" h="20px"></Avatar.Root>
                    );
                  })}
                </Table.Cell>
                <Table.Cell textTransform="capitalize">
                  <Flex align="center" gap={{ base: "2", md: "4" }}>
                    <Flag color={flagColor} size="18" />
                    {priority}
                  </Flex>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    variant="subtle"
                    h="20px"
                    w="30px"
                    bg="#F7F7F7"
                    scale="0.8"
                  >
                    <FaEllipsisH color="#6C7278" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>

      <Pagination.Root count={items.length * 5} pageSize={5} page={1}>
        <ButtonGroup variant="ghost" size="sm" wrap="wrap">
          <Pagination.PrevTrigger asChild>
            <IconButton>
              <LuChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(page) => (
              <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton>
              <LuChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </Stack>
  );
};

export default TodoContentTable;

const baseItems = [
  {
    id: 1,
    name: "MKV Intranet V2",
    date: "04/06/2024 - 16/06/2014",
    assignee: 3,
    priority: "medium",
  },
  {
    id: 2,
    name: "Design System",
    date: "23/06/2024 - 24/06/2024",
    assignee: 3,
    priority: "important",
  },
  {
    id: 3,
    name: "Medical Appointment",
    date: "16/06/2024 - 18/06/2024",
    assignee: 2,
    priority: "urgent",
  },
];

const items = [...baseItems, ...baseItems, ...baseItems, ...baseItems];
