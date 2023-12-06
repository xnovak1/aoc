const fs = require("fs");

const input = fs
  .readFileSync("input.txt")
  .toString()
  .split("\n")
  .map((x) => x.trim());

let times = input[0].split(":")[1].trim().split(/ +/).map(x => Number(x));
let distances = input[1].split(":")[1].trim().split(/ +/).map(x => Number(x));

const solve = () => {
  let result = 1;
  for (let i = 0; i < times.length; i++) {
    let beaten = 0;
    let time = times[i];
    let dist = distances[i];

    for (let hold = 0; hold <= time; hold++) {
      let traveled = (time - hold) * hold;
      if (traveled > dist) {
        beaten++;
      }
    }

    result *= beaten;
  }

  return result;
};

console.log(solve());
