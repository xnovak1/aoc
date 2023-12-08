const fs = require("fs");

const input = fs
  .readFileSync("input.txt")
  .toString()
  .split("\n")
  .map((x) => x.trim());

const parse = (nodes) => {
  for (let i = 2; i < input.length; i++) {
    let line = input[i];
    let new_node = line.split(" = ")[0];
    let [left, right] = line.split(" = ")[1].split(", ");
    left = left.substring(1);
    right = right.substring(0, 3);

    nodes.set(new_node, [left, right]);
  }
}

const solve = () => {
  const dirs = input[0];
  const nodes = new Map();
  parse(nodes);

  let i = 0;
  let curr_node = "AAA";

  while (curr_node !== "ZZZ") {
    let dir = dirs[i % dirs.length];
    if (dir === "L") {
      curr_node = nodes.get(curr_node)[0];
    } else {
      curr_node = nodes.get(curr_node)[1];
    }

    i++;
  }

  return i;
};

console.log(solve());
