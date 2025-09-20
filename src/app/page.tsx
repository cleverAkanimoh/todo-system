import HomeTopNav from "@/components/home/home-nav";
import { Stack } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <Stack
      as="main"
      bg="background"
      h="100dvh"
      w="100%"
      scrollbar={"hidden"}
      overflow={"hidden"}
    >
      <HomeTopNav />
      <Stack as="section" w="100%"></Stack>
    </Stack>
  );
}
