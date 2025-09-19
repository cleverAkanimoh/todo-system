import { HStack, Icon, Switch, Text } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa6";

export default function DarkModeSwitcher() {
  const { toggleColorMode } = useColorMode();
  return (
    <HStack justify={"space-between"} w="100%">
      <Text>Dark Mode</Text>
      <Switch.Root onCheckedChange={() => {}} colorPalette="blue" size="lg">
        <Switch.HiddenInput />
        <Switch.Control>
          <Switch.Thumb />
          <Switch.Indicator fallback={<Icon as={FaMoon} color="gray.400" />}>
            <Icon as={FaSun} color="yellow.400" />
          </Switch.Indicator>
        </Switch.Control>
      </Switch.Root>
    </HStack>
  );
}
