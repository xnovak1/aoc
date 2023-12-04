const fs = require("fs");

const input = fs
  .readFileSync("input.txt")
  .toString()
  .split("\n")
  .map((x) => x.trim());

const solve = () => {
  let result = 0;

  for (let i = 0; i < input.length; i++) {
    let card_val = 0;
    const line = input[i].trim();
    [_, nums] = line.split(":");
    [winning_nums, our_nums] = nums.split("|");
    let win = winning_nums.trim().split(/ +/);
    let our = our_nums.trim().split(/ +/);

    our.forEach((n) => {
      if (win.includes(n)) {
        card_val = card_val === 0 ? 1 : card_val * 2;
      }
    });

    result += card_val;
    console.log("line", i + 1, ":", card_val);
  }

  return result;
};

console.log(solve());
