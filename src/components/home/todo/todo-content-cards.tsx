"use client";

import {
  Avatar,
  Box,
  Button,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Calendar, Flag, ProfileCircle } from "iconsax-react";
import { useSearchParams } from "next/navigation";
import { BiPlus } from "react-icons/bi";
import { getPriorityColor, todosColum } from "./todo-utils";

export default function TodoContentCards() {
  const searchParams = useSearchParams();

  const isVerticalLayout =
    (searchParams.get("layout") || "vertical") === "vertical";

  if (isVerticalLayout) return <></>;

  return (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap="4">
      {todosColum.map((item) => {
        return (
          <Stack
            key={item.id}
            bg={item.bg}
            p="2"
            borderRadius="md"
            w="100%"
            h="fit-content"
          >
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

              <Button size={"xs"} bg="white" color="black" p="1" rounded="md">
                <BiPlus />
              </Button>
            </Group>

            <Stack>
              {item.todos.length &&
                item.todos.map((item) => {
                  return (
                    <Stack key={item.id} bg="white" p="4" borderRadius="md">
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
                    </Stack>
                  );
                })}
            </Stack>
            <Button
              bg="white"
              color="black"
              size="sm"
              fontWeight={400}
              rounded="md"
              justifyContent="start"
            >
              <BiPlus /> Add Task
            </Button>
          </Stack>
        );
      })}
    </SimpleGrid>
  );
}
