import fg from "fast-glob";
import { context } from "./context.mjs";

const run = (suite) => {
  const results = [];
  for (const task of suite.queue) {
    const result = {
      title: task.title,
      error: null,
    };
    try {
      task.fn();
    } catch (e) {
      result.error = e;
    }
    results.push(result);
  }
  return results;
};

const main = async () => {
  const root = process.cwd();
  const files = await fg("__tests__/*.test.js", { absolute: true, root });
  for (const file of files) {
    await import(file);
    for (const suite of context.suites) {
      const result = run(suite);
      for (const r of result) {
        if (r.error === null) {
          console.log("PASS!!");
        } else {
          console.error("FAILED");
          console.error(r.error);
          process.exitCode = 1;
        }
      }
    }
  }
};

main();
