import { HomeToDo, HomeTopNav } from "@/components/home";

import { Flex } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <Flex
      direction={"column"}
      as="main"
      bg="background"
      h="100dvh"
      w="100%"
      scrollbar={"hidden"}
      overflow={"hidden"}
    >
      <HomeTopNav />

      {/* Home content */}
      <Flex
        as="section"
        w="100%"
        flex="1"
        px={{ base: "3%", xl: "0" }}
        py={{ base: "10", md: "14" }}
        justify="center"
        overflowY="auto"
        scrollbar={"hidden"}
      >
        <HomeToDo />
      </Flex>
    </Flex>
  );
}
