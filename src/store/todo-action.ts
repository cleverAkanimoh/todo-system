import { create } from "zustand";
import { TTodo } from "./todos";

interface TTodoAction {
  openTodoModal: boolean;
  setOpenTodoModal: (value: boolean) => void;
  currentTodos?: TTodo;
  setCurrentTodo: (currentTodos?: TTodo, isEditing?: boolean) => void;
}

export const useTodoAction = create<TTodoAction>((set) => ({
  openTodoModal: false,
  setOpenTodoModal: (value) =>
    set(() => ({
      openTodoModal: value,
    })),
  currentTodos: undefined,
  setCurrentTodo: (value, isEditing) =>
    set(() => ({
      currentTodos: value,
      openTodoModal: isEditing,
    })),
}));
