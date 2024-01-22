import { Database } from "../database.js";

const database = new Database();

export default function (request, response) {
  const { search } = request.query;

  const tasks = database.select("tasks", {
    title: search,
    description: search,
  });

  return response.end(JSON.stringify(tasks));
}
