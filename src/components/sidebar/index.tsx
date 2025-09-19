"use client";

import {
  Button,
  Drawer,
  HStack,
  IconButton,
  Link,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import NextLink from "next/link";
import { CgChevronDown } from "react-icons/cg";

import { FaArrowRightFromBracket } from "react-icons/fa6";
import Logo from "../Logo";
import CountrySelect from "./CountrySelect";
import DarkModeSwitcher from "./DarkModeSwitcher";
import { sidebarLinks, TSideBarLink } from "./links";

const MotionStack = motion.create(Stack);

function NavItem({ link }: { link: TSideBarLink }) {
  return (
    <HStack gap="4" justify="flex-start" w="100%">
      {link.icon && <link.icon color="black" size={18} />}
      <Text fontWeight="500" color="#464B50" fontSize="14px">
        {link.label}
      </Text>
    </HStack>
  );
}

function ButtonDropdown({ link }: { link: TSideBarLink }) {
  const { onToggle, open } = useDisclosure();

  return (
    <Stack w="100%">
      <Button
        variant="plain"
        p="4"
        fontWeight={500}
        size="sm"
        justifyContent="space-between"
        onClick={onToggle}
        transition="transform 0.2s"
        w="fit-content"
      >
        <NavItem link={link} />
        <CgChevronDown
          style={{ transform: !open ? "rotate(180deg)" : "rotate(0)" }}
        />
      </Button>

      <AnimatePresence initial={false}>
        {!open && link.extraLinks && (
          <MotionStack
            pl="8"
            pr="6"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            w="100%"
          >
            {link.extraLinks.map((childLink, idx) =>
              childLink.href ? (
                <Link
                  as={NextLink}
                  href={childLink.href}
                  p="4"
                  key={idx}
                  bg={childLink.isActive ? "grey.1" : ""}
                  color={childLink.isActive ? "grey.text" : ""}
                  rounded="12px"
                  w="100%"
                >
                  <NavItem link={childLink} />
                </Link>
              ) : (
                <ButtonDropdown link={childLink} key={idx} />
              )
            )}
          </MotionStack>
        )}
      </AnimatePresence>
    </Stack>
  );
}

function SidebarContent() {
  return (
    <Stack
      as="nav"
      h="100dvh"
      gap="4"
      border="1px solid transparent"
      borderRightColor="#CDD6E9"
      p="4"
    >
      <Logo />

      <Stack align="start" gap="2" h="100%" overflow="auto" scrollbar="hidden">
        {sidebarLinks.map((link, idx) =>
          link.href ? (
            <Link
              as={NextLink}
              href={link.href}
              w="100%"
              p="4"
              key={idx}
              rounded="10px"
            >
              <NavItem link={link} />
            </Link>
          ) : (
            <ButtonDropdown link={link} key={idx} />
          )
        )}
      </Stack>
      <Stack gap="4" p="4" bg="#F7F7F7" rounded="12px">
        <CountrySelect />
       <DarkModeSwitcher />
      </Stack>
    </Stack>
  );
}

export default function SideBar() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isMobile) {
    return (
      <>
        <Drawer.Root placement="start" open={true}>
          <Drawer.Trigger asChild>
            <IconButton aria-label="Open menu" variant="subtle" size="md">
              <FaArrowRightFromBracket color="black" />
            </IconButton>
          </Drawer.Trigger>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content p="0" w="100%">
              <Drawer.CloseTrigger>
                <IconButton
                  aria-label="Open menu"
                  variant="subtle"
                  size="md"
                  name="CloseSquare"
                >
                  <FaArrowRightFromBracket color="black" />
                </IconButton>
              </Drawer.CloseTrigger>
              <SidebarContent />
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer.Root>
      </>
    );
  }

  return <SidebarContent />;
}
