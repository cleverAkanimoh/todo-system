import { baseItems } from "@/components/home/todo/todo-utils";
import { useTodoStore } from "@/store";
import { TodoStatus } from "@/store/todos";

export const useTodo = () => {
  const todos = useTodoStore((s) => s.todos);

  const allTodos = [...todos, ...baseItems, ...baseItems];

  const TodosOnToDo = allTodos.filter((t) => t.status === TodoStatus.TODO);
  const TodosOnInProgress = allTodos.filter(
    (t) => t.status === TodoStatus.IN_PROGRESS
  );
  const TodosOnCompleted = allTodos.filter(
    (t) => t.status === TodoStatus.COMPLETED
  );

  const todoCount = {
    todo: TodosOnToDo.length,
    inProgress: TodosOnInProgress.length,
    completed: TodosOnCompleted.length,
  };

  return {
    todoCount,
    allTodos,
    TodosOnCompleted,
    TodosOnInProgress,
    TodosOnToDo,
  };
};
