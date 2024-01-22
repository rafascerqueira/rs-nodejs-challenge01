import { randomUUID as UUID } from "node:crypto";
import { Database } from "../database.js";

const database = new Database();

export default function (request, response) {
  const { title, description } = request.body;

  if (!title) {
    return response
      .writeHead(400)
      .end(JSON.stringify({ message: "title is required" }));
  }

  if (!description) {
    return response
      .writeHead(400)
      .end(JSON.stringify({ message: "description is required" }));
  }

  const task = {
    id: UUID(),
    title,
    description,
    completed_at: null,
    created_at: new Date(),
    updated_at: new Date(),
  };

  database.insert("tasks", task);

  return response.writeHead(201).end();
}
