import { appMaxSize } from "@/constants";
import { Button, Flex, Group, Image } from "@chakra-ui/react";
import { Link2, Notification } from "iconsax-react";
import NextImage from "next/image";
import MobileSidebar from "../sidebar/mobile-sidebar";
import { buttonImagesArray, lastButtonArray } from "./button-utils";
import Search from "./search";
import UserAvatar from "./user-avatar";

export default function HomeTopNav() {
  return (
    <Flex
      as="nav"
      bg="white"
      w="100%"
      border="1px solid transparent"
      borderBottomColor="border"
      justify="center"
      align="center"
    >
      <Flex
        w="100%"
        maxW={appMaxSize}
        justify="space-between"
        flexShrink={0}
        p="4"
        gap="1"
      >
        <Group>
          <MobileSidebar />
          <Search />
        </Group>
        <Group>
          {buttonImagesArray.map((image, idx) => {
            return (
              <Image
                as={NextImage}
                src={image}
                key={idx}
                alt="Brand images"
                width={{ base: "10", lg: "12" }}
                height={{ base: "10", lg: "12" }}
              />
            );
          })}
        </Group>

        <Group hideBelow="xl">
          {lastButtonArray.map((b, idx) => {
            return (
              <Button
                key={idx}
                size={{ base: "xs", xl: "md" }}
                bg={b.color || "#75C5C1"}
                rounded="lg"
              >
                {b.label}
              </Button>
            );
          })}
          <Button size={{ base: "xs", xl: "md" }} variant="subtle" rounded="lg">
            <Link2 color="black" />
          </Button>
        </Group>
        <Group>
          <Button variant="subtle" rounded="full" h="35px" w="35px">
            <Notification color="black" />
          </Button>
          <UserAvatar />
        </Group>
      </Flex>
    </Flex>
  );
}
