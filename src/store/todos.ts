import { create } from "zustand";
import { persist } from "zustand/middleware";

export enum TodoStatus {
  COMPLETED = "completed",
  TODO = "to-do",
  IN_PROGRESS = "in-progress",
}
export enum TodoPriority {
  MEDIUM = "medium",
  IMPORTANT = "important",
  URGENT = "urgent",
}

export interface TTodo {
  id: string;
  name: string;
  status: TodoStatus;
  assignees: number;
  dates: string;
  priority: TodoPriority;
  description: string;
}

interface TodoState {
  todos: TTodo[];
  addTodo: (todo: TTodo) => void;
  editTodo: (id: string, todo: TTodo) => void;
  removeTodo: (id: string) => void;
  clearAll: () => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (todo) =>
        set((state) => ({
          todos: [...state.todos, { ...todo, id: crypto.randomUUID() }],
        })),
      editTodo: (id, todo) =>
        set((state) => ({
          todos: state.todos.map((t) => (t.id === id ? { ...t, ...todo } : t)),
        })),
      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((t) => t.id !== id),
        })),
      clearAll: () => set({ todos: [] }),
    }),
    {
      name: "todo-storage",
    }
  )
);
