const fs = require("fs");

const input = fs
  .readFileSync("input.txt")
  .toString()
  .split("\n")
  .map((x) => x.trim());

const print_matrix = (m) => {
  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[i].length; j++) {
      process.stdout.write(m[i][j]);
    }

    console.log("");
  }
};

const expand = (universe) => {
  // expand rows
  for (let i = 0; i < universe.length; i++) {
    let row = universe[i].slice();
    if (row.every((x) => x === ".")) {
      universe.splice(i, 0, row);
      i++;
    }
  }

  // expand cols
  for (let i = 0; i < universe[0].length; i++) {
    let col = universe.map((x) => x[i]);
    if (col.every((x) => x === ".")) {
      universe.map((row) => row.splice(i, 0, "."));
      i++;
    }
  }

  // print_matrix(universe);
};

const distance = (coords1, coords2) => {
  let [y1, x1] = coords1;
  let [y2, x2] = coords2;

  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

const distances = (universe) => {
  let result = 0;
  const galaxies = get_galaxies(universe);

  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      result += distance(galaxies[i], galaxies[j]);
    }
  }

  return result;
};

const get_galaxies = (universe) => {
  const result = [];

  for (let i = 0; i < universe.length; i++) {
    for (let j = 0; j < universe[i].length; j++) {
      if (universe[i][j] === "#") {
        result.push([i, j]);
      }
    }
  }

  return result;
};

const solve = () => {
  let universe = [];

  for (let i = 0; i < input.length; i++) {
    let line = input[i];
    universe.push(line.split(""));
  }

  expand(universe);
  return distances(universe);
};

console.log(solve());
