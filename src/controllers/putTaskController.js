import { Database } from "../database.js";

const database = new Database();

export default function (request, response) {
  const { id } = request.params;
  const { title, description } = request.body;

  if (!title && !description) {
    return response
      .writeHead(400)
      .end(JSON.stringify({ message: "title or description are required" }));
  }

  const [task] = database.select("tasks", { id });

  if (!task) {
    return response.writeHead(404).end();
  }

  database.update("tasks", id, {
    title: title ?? task.title,
    description: description ?? task.description,
    updated_at: new Date(),
  });

  return response.writeHead(204).end();
}
