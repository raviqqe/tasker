import { TodoTaskUpdater } from "../application/todo-task-updater.js";
import { confirmationController } from "./confirmation-controller.js";
import { todoTaskDeleter } from "./todo-task-deleter.js";
import { todoTaskPresenter } from "./todo-task-presenter.js";
import { todoTaskRepository } from "./todo-task-repository.js";

export const todoTaskUpdater = new TodoTaskUpdater(
  todoTaskDeleter,
  todoTaskRepository,
  todoTaskPresenter,
  confirmationController,
);
