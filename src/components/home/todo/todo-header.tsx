import { Button, Flex, Group, Switch, Text } from "@chakra-ui/react";
import { AddCircle, Calendar, Export, Sort } from "iconsax-react";
import { BsArrowLeftCircle } from "react-icons/bs";

export default function TodoHeader() {
  return (
    <Flex
      p="4"
      direction={{ base: "column", lg: "row" }}
      gap="4"
      justify="space-between"
    >
      <Group gap="4">
        <Button variant={"outline"} w="40px" h="40px" rounded="full">
          <BsArrowLeftCircle />
        </Button>
        <Text fontWeight={700} fontSize={30}>
          Afdeling Kwaliteit
        </Text>
      </Group>
      <Flex wrap={{ base: "wrap", sm: "nowrap" }} gap="4">
        {[
          () => (
            <Switch.Root size={"xs"} pl="2">
              <Switch.HiddenInput />
              <Switch.Control />
              <Switch.Label />
            </Switch.Root>
          ),
          () => <Sort color="black" />,
          () => <Calendar color="black" />,
        ].map((item, idx) => {
          return (
            <Button
              key={idx}
              variant="surface"
              bg="#F7F7F7"
              px="2"
              w="40px"
              h="40px"
              alignItems={"center"}
              rounded="lg"
            >
              {item()}
            </Button>
          );
        })}
        {[
          { icon: Export, label: "Export xlsx", color: "purple.1" },
          { icon: AddCircle, label: "Add Task", color: "teal.1" },
        ].map((item, idx) => {
          return (
            <Button
              key={idx}
              bg={item.color}
              alignItems={"center"}
              rounded="lg"
            >
              <item.icon color="white" /> {item.label}
            </Button>
          );
        })}
      </Flex>
    </Flex>
  );
}
