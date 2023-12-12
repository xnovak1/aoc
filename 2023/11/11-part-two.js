const fs = require("fs");

const input = fs
  .readFileSync("small.txt")
  .toString()
  .split("\n")
  .map((x) => x.trim());

const distance = (coords1, coords2) => {
  let [y1, x1] = coords1;
  let [y2, x2] = coords2;

  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

const distances = (galaxies) => {
  let result = 0;

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

const get_empty = (universe) => {
  const rows = [];
  const cols = [];

  // rows
  for (let i = 0; i < universe.length; i++) {
    let row = universe[i];
    if (row.every((x) => x === ".")) {
      rows.push(i);
    }
  }

  // cols
  for (let i = 0; i < universe[0].length; i++) {
    let col = universe.map((x) => x[i]);
    if (col.every((x) => x === ".")) {
      cols.push(i);
    }
  }

  return [rows, cols];
};

const expand = (empty_rows, empty_cols, galaxies, coef) => {
  // rows
  for (let i = 0; i < empty_rows.length; i++) {
    for (let j = 0; j < galaxies.length; j++) {
      let [y, x] = galaxies[j];
      if (y > empty_rows[i]) {
        galaxies[j] = [y + coef, x];
      }
    }

    /*
    galaxies = galaxies.map((coords) =>
      coords[0] > empty_rows[i] ? [coords[0] + coef, coords[1]] : coords
    );
    */
  }

  // cols
  for (let i = 0; i < empty_cols.length; i++) {
    for (let j = 0; j < galaxies.length; j++) {
      let [y, x] = galaxies[j];
      if (x > empty_cols[i]) {
        galaxies[j] = [y, x + coef];
      }
    }

    /*
    galaxies = galaxies.map((coords) =>
      coords[1] > empty_cols[i] ? [coords[0], coords[1] + coef] : coords
    );
    */
  }
};

const solve = () => {
  let universe = [];

  for (let i = 0; i < input.length; i++) {
    let line = input[i];
    universe.push(line.split(""));
  }

  let galaxies = get_galaxies(universe);
  let [empty_rows, empty_cols] = get_empty(universe);

  expand(empty_rows, empty_cols, galaxies, 1);
  console.log(galaxies);

  return distances(galaxies);
};

console.log(solve());
