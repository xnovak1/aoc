const fs = require("fs");

const input = fs
  .readFileSync("input.txt")
  .toString()
  .split("\n")
  .map((x) => x.trim());

const get_next_seq = (seq) => {
  let next = [];
  for (let i = 0; i < seq.length - 1; i++) {
    next.push(seq[i + 1] - seq[i]);
  }

  return next;
}

const calculate_next = (seq) => {
  let all_seq = [seq];

  let i = 0;
  while (all_seq[all_seq.length - 1].some(x => x !== 0)) {
    all_seq.push(get_next_seq(all_seq[i]));
    i++;
  }

  for (i; i > 0; i--) {
    const prev_seq = all_seq[i - 1];
    const curr_seq = all_seq[i]
    prev_seq.push(prev_seq[prev_seq.length - 1] + curr_seq[curr_seq.length - 1]);
  }

  return all_seq[0];
}

const solve = () => {
  let result = 0;

  for (let i = 0; i < input.length; i++) {
    let line = input[i];
    let seq = line.split(" ").map(x => Number(x));
    calculate_next(seq);
    result += seq[seq.length - 1];
  }

  return result;
};

console.log(solve());
