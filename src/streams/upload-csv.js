import { parse } from "csv-parse";
import fs from "node:fs";

const csvPath = new URL("../../tasks.csv", import.meta.url);

const stream = fs.createReadStream(csvPath);

const csvParse = parse({
  delimiter: ",",
  skipEmptyLines: true,
  fromLine: 2,
});

async function importTask() {
  const colletion = stream.pipe(csvParse);

  for await (const chunk of colletion) {
    const [title, description] = chunk;

    await fetch("http://localhost:3333/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    await wait(1);
  }
}

importTask();

function wait(sec) {
  let milisec = sec * 1000;
  return new Promise((resolve) => setTimeout(resolve, milisec));
}
