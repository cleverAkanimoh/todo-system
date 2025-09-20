import { HomeToDo, HomeTopNav } from "@/components/home";

import { Box } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <Box
      as="main"
      bg="background"
      h="100dvh"
      w="100%"
      scrollbar={"hidden"}
      overflow={"hidden"}
    >
      <HomeTopNav />

      {/* Home content */}
      <Box as="section" w="100%" h="100%" flex="1" bg="teal" p="2%">
        <HomeToDo />
      </Box>
    </Box>
  );
}
