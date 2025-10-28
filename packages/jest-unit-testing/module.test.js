// module.test.js
import mut from "./module.js"; // MUT = Module Under Test

test("Testing sum -- success", () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

test("Testing div - success", () => {
  const expected = 5;
  const got = mut.div(35, 7);
  expect(got).toBe(expected);
});

test("Testing div - division by zero", () => {
  const expected = Infinity;
  const got = mut.div(35, 0);
  expect(got).toBe(expected);
});

test("Testing div - zero divided by number", () => {
  const expected = 0;
  const got = mut.div(0, 5);
  expect(got).toBe(expected);
});

test("Testing div - negative numbers", () => {
  const expected = -4;
  const got = mut.div(-20, 5);
  expect(got).toBe(expected);
});

test("Testing div - fractional result", () => {
  const expected = 2.5;
  const got = mut.div(5, 2);
  expect(got).toBe(expected);
});

test("Testing containsNumbers - string with numbers", () => {
  const expected = true;
  const got = mut.containsNumbers("Hello123");
  expect(got).toBe(expected);
});

test("Testing containsNumbers - string without numbers", () => {
  const expected = false;
  const got = mut.containsNumbers("HelloWorld");
  expect(got).toBe(expected);
});

test("Testing containsNumbers - empty string", () => {
  const expected = false;
  const got = mut.containsNumbers("");
  expect(got).toBe(expected);
});

// This test will not pass. Found bug! Spaces are being treated as numbers
test("Testing containsNumbers - string with space", () => {
  const expected = false;
  const got = mut.containsNumbers("Hello World");
  expect(got).toBe(expected);
});
