import {
    Call,
    Category,
    Edit,
    Folder2,
    Icon,
    MenuBoard,
    MessageEdit,
    Note,
    NotificationBing,
    People,
    Stickynote,
    TaskSquare,
} from "iconsax-react";
import { IconType } from "react-icons";
import { BsNewspaper } from "react-icons/bs";

export interface TSideBarLink {
  icon?: Icon | IconType;
  label: string;
  href?: string;
  isActive?: boolean;
  extraLinks?: TSideBarLink[];
}

export const sidebarLinks: TSideBarLink[] = [
  { icon: Category, label: "Home", href: "#" },
  { icon: Stickynote, label: "MKVanBinnen", href: "#" },
  { icon: Folder2, label: "Document Management", href: "#" },
  { icon: People, label: "Patient Information", href: "#" },
  { icon: Note, label: "Agenda", href: "#" },
  {
    icon: BsNewspaper,
    label: "My Department",
    extraLinks: [
      { label: "News", href: "#" },
      { label: "Members", href: "#" },
      { label: "To - Do", href: "#", isActive: true },
      { label: "Form Task", href: "#" },
      { label: "Agenda ", href: "#" },
      { label: "Follow up system  ", href: "#" },
      { label: "Group Settings", extraLinks: [] },
    ],
  },
  { icon: Call, label: "Phone numbers", href: "#" },
  { icon: TaskSquare, label: "My to do Protocols", href: "#" },
  { icon: NotificationBing, label: "My Notifications", href: "#" },
  { icon: MenuBoard, label: "Knowledge Base", href: "#" },
  { icon: MessageEdit, label: "Super Admin", href: "#" },
  {
    icon: Edit,
    label: "Admin",
    extraLinks: [
      { label: "Agenda", href: "#" },
      { label: "News", href: "#" },
      { label: "Poll", href: "#" },
      { label: "Department Rules", href: "#" },
      { label: "Follow up system ", href: "#" },
    ],
  },
];
