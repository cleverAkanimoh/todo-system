"use client";

import { useSetQueryParams } from "@/hooks";
import { useTodoStore } from "@/store";
import {
  Avatar,
  Button,
  ButtonGroup,
  createListCollection,
  Flex,
  Group,
  IconButton,
  Pagination,
  Portal,
  Select,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react";
import { Flag } from "iconsax-react";
import { useSearchParams } from "next/navigation";
import { FaEllipsisH } from "react-icons/fa";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { dummyTodos, getPriorityColor } from "./todo-utils";

const TodoContentTable = () => {
  const searchParams = useSearchParams();
  const setUrlSearchParams = useSetQueryParams();
  const todos = useTodoStore((state) => state.todos);
  const pageSize = Number(searchParams.get("page_size") || 5);
  const currentPage = Number(searchParams.get("page") || 1);

  const totalPages = Math.ceil(dummyTodos.length / pageSize);
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const start = (safePage - 1) * pageSize;
  const end = start + pageSize;

  const allTodos = [...todos, ...dummyTodos];

  const pagedTodos = allTodos.slice(start, end);

  const isVerticalLayout =
    (searchParams.get("layout") || "vertical") === "vertical";

  if (!isVerticalLayout) return <></>;
  return (
    <Stack width="full" gap="5" h="full">
      <Table.Root
        size="sm"
        variant="outline"
        rounded="lg"
        overflowX={"auto"}
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
          {pagedTodos.map((item, idx) => {
            const priority = item.priority.toLowerCase();
            return (
              <Table.Row key={idx} fontWeight={500} color="black.1">
                <Table.Cell px="4" py="6">
                  {item.name}
                </Table.Cell>
                <Table.Cell px="4" py="6">
                  {item.dates}
                </Table.Cell>
                <Table.Cell py="6">
                  {Array.from({ length: item.assignees }, (_, idx) => {
                    return (
                      <Avatar.Root key={idx} w="20px" h="20px"></Avatar.Root>
                    );
                  })}
                </Table.Cell>
                <Table.Cell textTransform="capitalize">
                  <Flex align="center" gap={{ base: "2", md: "4" }}>
                    <Flag color={getPriorityColor(priority)} size="18" />
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

      <Flex wrap="wrap" justify="space-between" align="start" gap="4">
        <Pagination.Root
          count={allTodos.length}
          pageSize={pageSize}
          page={currentPage}
          bg="background"
          w="fit-content"
          rounded="full"
          p="1"
        >
          <ButtonGroup
            variant="ghost"
            size={{ base: "xs" }}
            wrap="wrap"
            gap="2"
          >
            <IconButton
              disabled={currentPage <= 2}
              onClick={() => setUrlSearchParams({ page: currentPage - 2 })}
            >
              <FiChevronsLeft />
            </IconButton>
            <Pagination.PrevTrigger asChild>
              <IconButton
                onClick={() => setUrlSearchParams({ page: currentPage - 1 })}
              >
                <LuChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Items
              render={(page) => (
                <IconButton
                  variant={{ base: "outline", _selected: "solid" }}
                  rounded="full"
                  borderColor="teal.1"
                  color={{ _selected: "white", base: "teal.1" }}
                  bg={{ _selected: "teal.1" }}
                  onClick={() => setUrlSearchParams({ page: page.value })}
                >
                  {page.value}
                </IconButton>
              )}
            />

            <Pagination.NextTrigger asChild>
              <IconButton
                onClick={() => setUrlSearchParams({ page: currentPage + 1 })}
              >
                <LuChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
            <IconButton
              disabled={currentPage > totalPages - 2}
              onClick={() => setUrlSearchParams({ page: currentPage + 2 })}
            >
              <FiChevronsRight />
            </IconButton>
          </ButtonGroup>
        </Pagination.Root>

        <Group flexShrink={0}>
          <Text fontSize={{ base: "sm", lg: "base" }} textWrap={"nowrap"}>
            Rows Per page:
          </Text>
          <Select.Root
            collection={rowsPerPageRange}
            value={[pageSize.toString()]}
            onValueChange={({ value }) =>
              setUrlSearchParams({ page_size: value[0], page: 1 })
            }
          >
            <Select.Control minW="60px">
              <Select.Trigger
                borderColor="teal.1"
                rounded="full"
                bg="background"
              >
                <Select.ValueText defaultValue={pageSize.toString()} />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {rowsPerPageRange.items.map((page, idx) => (
                    <Select.Item item={page} key={idx}>
                      {page}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </Group>
      </Flex>
    </Stack>
  );
};

export default TodoContentTable;

const rowsPerPageRange = createListCollection({
  items: ["5", "10", "20", "50"],
});
