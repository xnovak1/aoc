const fs = require("fs");

const input = fs
  .readFileSync("input.txt")
  .toString()
  .split("\n")
  .map((x) => x.trim());

let time = input[0].split(":")[1].trim().split(/ +/).reduce((x, y) => x + y);
let dist = input[1].split(":")[1].trim().split(/ +/).reduce((x, y) => x + y);

time = Number(time);
dist = Number(dist);

const solve = () => {
  let beaten = 0;

  for (let hold = 0; hold <= time; hold++) {
    let traveled = (time - hold) * hold;
    if (traveled > dist) {
      beaten++;
    }
  }

  return beaten;
};

console.log(solve());
