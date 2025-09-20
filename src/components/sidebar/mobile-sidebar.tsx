import { Box, Drawer, IconButton } from "@chakra-ui/react";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import SidebarContent from "./sidebar-content";

export default function MobileSidebar() {
  return (
    <Box hideFrom="md">
      <Drawer.Root placement="start">
        <Drawer.Trigger asChild>
          <IconButton aria-label="Open menu" variant="subtle" size="xs">
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
    </Box>
  );
}
