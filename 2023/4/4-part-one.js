const fs = require("fs");

const input = fs
  .readFileSync("small.txt")
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

const solve = () => {
  let result = 0;

  for (let i = 0; i < input.length; i++) {
    const line = input[i].trim();
    [_, nums] = line.split(":");
    [winning_nums, our_nums] = nums.split("|");
    let win = winning_nums.trim().split(/ +/);
    let our = our_nums.trim().split(/ +/);

    const count = matches(win, our);
    if (count > 0) {
      result += 2 ** (count - 1);
    }
  }

  return result;
};

console.log(solve());
