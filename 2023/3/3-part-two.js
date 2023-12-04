const fs = require("fs");

const input = fs
  .readFileSync("input.txt")
  .toString()
  .split("\n")
  .map((x) => x.trim());

const is_gear = (char) => {
  return char === "*";
};

const has_gear_neighbour = (lines, start_i, end_i, line_i) => {
  /* Returns coordinates in string form "yx" if gear found, null otherwise. */

  const WIDTH = lines[0].length;
  const HEIGHT = lines.length;
  const num_len = end_i - start_i + 1;

  for (let i = -1; i <= 1; i++) {
    if (line_i + i < 0 || line_i + i > HEIGHT - 1) {
      continue;
    }

    for (let j = -1; j <= num_len; j++) {
      if (start_i + j < 0 || start_i + j > WIDTH - 1) {
        continue;
      }

      const char = lines[line_i + i][start_i + j];
      if (is_gear(char)) {
        return (line_i + i).toString() + (start_i + j).toString();
      }
    }
  }

  return null;
};

/* key: "yx" (coordinates), value: [number,...] */
const gears = new Map();

let reg = new RegExp("\\d+", "g");

const solve = () => {
  let result = 0;

  for (let i = 0; i < input.length; i++) {
    const line = input[i].trim();
    let arr;
    while ((arr = reg.exec(line)) != null) {
      const num = arr[0];
      const start_i = arr.index;
      const end_i = start_i + num.length - 1;

      const gear_coords = has_gear_neighbour(input, start_i, end_i, i);
      if (gear_coords !== null) {
        if (gears.has(gear_coords)) {
          gears.set(gear_coords, [...gears.get(gear_coords), num]);
        } else {
          gears.set(gear_coords, [num]);
        }
      }
    }
  }

  for ([_, value] of gears) {
    if (value.length == 2) {
      result += value[0] * value[1];
    }
  }

  return result;
};

console.log(solve());
