import { create } from "zustand";

interface TTodoAction {
  openTodoModal: boolean;
  setOpenTodoModal: (value: boolean) => void;
}

export const useTodoAction = create<TTodoAction>((set) => ({
  openTodoModal: false,
  setOpenTodoModal: (value) =>
    set(() => ({
      openTodoModal: value,
    })),
}));
