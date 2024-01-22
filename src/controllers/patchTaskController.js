import { Database } from "../database.js";

const database = new Database();

export default function (request, response) {
  const { id } = request.params;

  const [task] = database.select("tasks", { id });

  if (!task) {
    return response.writeHead(404).end();
  }

  const isTaskCompleted = !!task.completed_at;
  const completed_at = isTaskCompleted ? null : new Date();

  database.update("tasks", id, { completed_at });

  return response.writeHead(204).end();
}
