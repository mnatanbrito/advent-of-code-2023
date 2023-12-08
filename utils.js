import { readFile as readFileInternal } from "node:fs";
import { join } from "node:path";
import { promisify } from "node:util";

const readAsync = promisify(readFileInternal);

export async function readFile(filename) {
  const data = await readAsync(join(__dirname, filename), {
    encoding: "utf8",
  });

  return data;
}
