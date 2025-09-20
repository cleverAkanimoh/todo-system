import UserImage from "@/assets/user-avatar.svg";
import { Group, Image, Text } from "@chakra-ui/react";
import NextImage from "next/image";
import { HiChevronDown } from "react-icons/hi";

export default function UserAvatar() {
  return (
    <Group
      align="center"
      bg="background"
      p="1"
      borderRadius="full"
      cursor="pointer"
      flexShrink="0"
    >
      <Image
        as={NextImage}
        src={UserImage}
        alt="Photo of  paul"
        width="8"
        height="8"
      />
      <Group hideBelow="lg">
        <Text fontWeight="semibold" fontSize={14} textWrap={"nowrap"}>
          Hi, Paul
        </Text>
        <HiChevronDown />
      </Group>
    </Group>
  );
}
