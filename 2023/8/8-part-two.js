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

const GCD = (x, y) => (y === 0 ? x : GCD(y, x % y));

const LCM = (...n) => n.reduce((x, y) => (x * y) / GCD(x, y));

const solve = () => {
  const dirs = input[0];
  const nodes = new Map();
  parse(nodes);

  let curr_nodes = [...nodes].map(x => x[0]).filter(x => x[2] === "A");
  let partial_results = [];

  for (let i = 0; i < curr_nodes.length; i++) {
    let node = curr_nodes[i];

    let j = 0;
    while (node[2] !== "Z") {
      const dir = dirs[j % dirs.length];
      if (dir === "L") {
        node = nodes.get(node)[0];
      } else {
        node = nodes.get(node)[1];
      }

      j++;
    }

    partial_results.push(j);
  }

  return LCM(...partial_results);
};

console.log(solve());
