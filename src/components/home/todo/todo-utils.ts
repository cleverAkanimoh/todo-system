import { TodoPriority, TodoStatus, TTodo, useTodoStore } from "@/store/todos";
import { Status, TaskSquare, TickCircle } from "iconsax-react";

const baseItems: TTodo[] = [
  {
    id: "1",
    name: "MKV Intranet V2",
    dates: "04/06/2024 - 16/06/2014",
    assignees: 3,
    priority: TodoPriority.MEDIUM,
    status: TodoStatus.TODO,
  },
  {
    id: "2",
    name: "Design System",
    dates: "23/06/2024 - 24/06/2024",
    assignees: 3,
    priority: TodoPriority.IMPORTANT,
    status: TodoStatus.IN_PROGRESS,
  },
  {
    id: "3",
    name: "Medical Appointment",
    dates: "16/06/2024 - 18/06/2024",
    assignees: 2,
    priority: TodoPriority.URGENT,
    status: TodoStatus.COMPLETED,
  },
];

export const getPriorityColor = (priority?: string) => {
  const itemPriority = (priority || "").toLowerCase();
  const flagColor =
    itemPriority === "medium"
      ? "#75C5C1"
      : priority === "important"
      ? "#F6BE38"
      : priority === "low"
      ? "#BAC1CC"
      : "#FF515D";

  return flagColor;
};

export const getToDoColor = (todoId?: string) => {
  const todo = (todoId || "").toLowerCase();
  const todoColor =
    todo === TodoStatus.TODO
      ? "#CFB7E8"
      : todo === TodoStatus.IN_PROGRESS
      ? "#F6BE38"
      : "#75C5C1";

  return todoColor;
};

const createdTodos = useTodoStore.getState().todos;

export const allTodos = [...createdTodos, ...baseItems, ...baseItems];

const TodosOnToDo = allTodos.filter((t) => t.status === TodoStatus.TODO);
const TodosOnInProgress = allTodos.filter(
  (t) => t.status === TodoStatus.IN_PROGRESS
);
const TodosOnCompleted = allTodos.filter(
  (t) => t.status === TodoStatus.COMPLETED
);

export const todosColum = [
  {
    label: "To Do",
    id: "to-do",
    icon: TaskSquare,
    color: "#CFB7E8",
    bg: "purple.bg",
    count: TodosOnToDo.length,
    todos: TodosOnToDo,
  },
  {
    label: "In Progress",
    id: "in-progress",
    icon: Status,
    color: "#F6BE38",
    bg: "yellow.bg",
    count: TodosOnInProgress.length,
    todos: TodosOnInProgress,
  },
  {
    label: "Complete",
    id: "complete",
    icon: TickCircle,
    color: "#75C5C1",
    bg: "green.bg",
    count: TodosOnCompleted.length,
    todos: TodosOnCompleted,
  },
];
