const fs = require("fs");

const input = fs
  .readFileSync("input.txt")
  .toString()
  .split("\n")
  .map((x) => x.trim());

const solve = () => {
  let result = 0;

  for (let i = 0; i < input.length; i++) {
    const line = input[i].trim();
  }

  return result;
};

console.log(solve());
