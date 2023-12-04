const fs = require("fs");

const input = fs
  .readFileSync("input.txt")
  .toString()
  .split("\n")
  .map((x) => x.trim());

const matches = (winning, ours) => {
  let result = 0;
  ours.forEach((n) => {
    if (winning.includes(n)) {
      result++;
    }
  });

  return result;
};

const solve_rec = (lines, line_i) => {
  let result = 1;

  const line = lines[line_i].trim();
  [_, nums] = line.split(":");
  [winning_nums, our_nums] = nums.split("|");
  let win = winning_nums.trim().split(/ +/);
  let our = our_nums.trim().split(/ +/);

  const count = matches(win, our);
  for (let i = 1; i < count + 1; i++) {
    if (line_i + count > lines.length) {
      break;
    }

    result += solve_rec(lines, line_i + i);
  }

  return result;
};

const solve = () => {
  let result = 0;

  for (let i = 0; i < input.length; i++) {
    result += solve_rec(input, i);
  }

  return result;
};

console.log(solve());
