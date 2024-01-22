import { Database } from "../database.js";

const database = new Database();

export default function (request, response) {
  const { id } = request.params;

  const [task] = database.select("tasks", { id });

  if (!task) {
    return response.writeHead(404).end();
  }

  database.delete("tasks", id);

  return response.writeHead(204).end();
}
