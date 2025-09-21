import { Status, TaskSquare, TickCircle } from "iconsax-react";

const baseItems = [
  {
    id: 1,
    name: "MKV Intranet V2",
    date: "04/06/2024 - 16/06/2014",
    assignee: 3,
    priority: "medium",
  },
  {
    id: 2,
    name: "Design System",
    date: "23/06/2024 - 24/06/2024",
    assignee: 3,
    priority: "important",
  },
  {
    id: 3,
    name: "Medical Appointment",
    date: "16/06/2024 - 18/06/2024",
    assignee: 2,
    priority: "urgent",
  },
];

export const getPriorityColor = (priority?: string) => {
  const itemPriority = (priority || "").toLowerCase();
  const flagColor =
    itemPriority === "medium"
      ? "#75C5C1"
      : priority === "important"
      ? "#F6BE38"
      : "#FF515D";

  return flagColor;
};

export const dummyTodos = [...baseItems, ...baseItems];

export const todosColum = [
  {
    label: "To Do",
    id: "to-do",
    icon: TaskSquare,
    color: "#CFB7E8",
    bg: "purple.bg",
    count: 3,
    todos: dummyTodos.slice(0, 3),
  },
  {
    label: "In Progress",
    id: "in-progress",
    icon: Status,
    color: "#F6BE38",
    bg: "yellow.bg",
    count: 2,
    todos: dummyTodos.slice(0, 2),
  },
  {
    label: "Complete",
    id: "complete",
    icon: TickCircle,
    color: "#75C5C1",
    bg: "green.bg",
    count: 1,
    todos: dummyTodos.slice(0, 1),
  },
];
