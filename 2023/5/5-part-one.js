const fs = require("fs");

const input = fs
  .readFileSync("input.txt")
  .toString()
  .split("\n")
  .map((x) => x.trim());

let seeds = [];
let found = [];
found.fill(false);

const solve = () => {
  for (let i = 0; i < input.length; i++) {
    const line = input[i];

    if (line.length === 0 || line.includes("map:")) {
      found.fill(false);
      continue;
    }

    if (line.startsWith("seeds:")) {
      [_, seed_l] = line.split(":");
      seed_l = seed_l.trim();
      seeds = seed_l.split(" ");
      seeds = seeds.map((x) => Number(x));
      continue;
    }

    let [dest, start, interval] = line.split(" ");
    dest = Number(dest);
    start = Number(start);
    interval = Number(interval);

    for (let i = 0; i < seeds.length; i++) {
      const seed = seeds[i];
      if (start <= seed && seed < start + interval && !found[i]) {
        const shift = seed - start;
        seeds[i] = dest + shift;
        found[i] = true;
      }
    }
  }

  return Math.min(...seeds);
};

console.log(solve());
