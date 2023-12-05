const fs = require("fs");

let input = fs
  .readFileSync("input.txt")
  .toString()
  .split(/\r?\n\r?\n/)
  .map((x) => x.trim());

let seeds_line = input[0];

let inputs = seeds_line
  .split(":")[1]
  .trim()
  .split(" ")
  .map((x) => Number(x));

let seeds = [];
for (let i = 0; i < inputs.length; i += 2) {
  seeds.push([inputs[i], inputs[i] + inputs[i + 1]]);
}

const solve = () => {
  for (let i = 1; i < input.length; i++) {
    let block = input[i];
    let ranges = [];

    const lines = block.split("\n");
    for (let j = 1; j < lines.length; j++) {
      let line = lines[j];
      ranges.push(line.split(" ").map((x) => Number(x)));
    }

    let new_seeds = [];
    while (seeds.length > 0) {
      [seed_start, seed_end] = seeds.pop();
      let found = false;
      for (let k = 0; k < ranges.length; k++) {
        [dest, start, interval] = ranges[k];
        os = Math.max(seed_start, start);
        oe = Math.min(seed_end, start + interval);
        if (os < oe) {
          new_seeds.push([os - start + dest, oe - start + dest]);
          if (os > seed_start) {
            seeds.push([seed_start, os]);
          }
          if (seed_end > oe) {
            seeds.push([oe, seed_end]);
          }

          found = true;
          break;
        }
      }

      if (!found) {
        new_seeds.push([seed_start, seed_end]);
      }
    }

    seeds = new_seeds;
  }

  return Math.min(...seeds.flat());
};

console.log(solve());
