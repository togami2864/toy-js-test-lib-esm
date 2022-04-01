import { context } from "./context.mjs";

// matcher
export const expect = (received) => ({
  toBe: (expected) => {
    if (received !== expected) {
      throw new Error(`Expected ${expected} but received ${received}.`);
    }
    return true;
  },
});

const suite = (title) => {
  const queue = [];
  function test(title, fn) {
    const task = {
      title,
      fn,
    };
    queue.push(task);
  }

  const suite = {
    title,
    test,
    queue,
  };
  context.suites.push(suite);
  return suite;
};

//alias
export const describe = suite("");
export const it = describe.test;
