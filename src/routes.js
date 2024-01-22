import { path_mounter } from "./utils/path_utils.js";
import {
  setTaskController,
  getTaskController,
  putTaskController,
  deleteTaskController,
  patchTaskController,
} from "./controllers/index.js";

export const routes = [
  {
    method: "POST",
    path: path_mounter("/tasks"),
    handler: setTaskController,
  },
  {
    method: "GET",
    path: path_mounter("/tasks"),
    handler: getTaskController
  },
  {
    method: "PUT",
    path: path_mounter("/tasks/:id"),
    handler: putTaskController,
  },
  {
    method: "DELETE",
    path: path_mounter("/tasks/:id"),
    handler: deleteTaskController,
  },
  {
    method: "PATCH",
    path: path_mounter("/tasks/:id/complete"),
    handler: patchTaskController,
  },
];
