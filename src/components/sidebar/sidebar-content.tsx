"use client";

import {
  Button,
  HStack,
  Link,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import NextLink from "next/link";
import { CgChevronDown } from "react-icons/cg";

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

export default function SidebarContent() {
  return (
    <Stack
      as="nav"
      h="100dvh"
      gap="4"
      border="1px solid transparent"
      borderRightColor="border"
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
