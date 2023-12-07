const fs = require("fs");

const input = fs
  .readFileSync("input.txt")
  .toString()
  .split("\n")
  .map((x) => x.trim());

const card_strength = {
  "2": 0,
  "3": 1,
  "4": 2,
  "5": 3,
  "6": 4,
  "7": 5,
  "8": 6,
  "9": 7,
  "T": 8,
  "J": 9,
  "Q": 10,
  "K": 11,
  "A": 12
}

const compare_hands = (hand1, hand2) => {
  if (hand1.strength > hand2.strength)
    return 1;
  if (hand1.strength < hand2.strength)
    return -1;

  for (let i = 0; i < 5; i++) {
    const char1 = hand1.value[i];
    const char2 = hand2.value[i];
    if (card_strength[char1] > card_strength[char2])
      return 1;
    if (card_strength[char1] < card_strength[char2])
      return -1;
  }
  
  return 0;
}

const hand_strength = {
  "high": 0,
  "one pair": 1,
  "two pair": 2,
  "three": 3,
  "house": 4,
  "four": 5,
  "five": 6
}

const calculate_strength = (hands) => {
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    const counter = {
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "T": 0,
      "J": 0,
      "Q": 0,
      "K": 0,
      "A": 0
    }

    for (let j = 0; j < hand.value.length; j++) {
      const char = hand.value[j];
      counter[char]++;
    }

    const vals = Object.values(counter);

    if (vals.some(x => x == 5)) {
      hand.strength = hand_strength["five"];
    } else if (vals.some(x => x == 4)) {
      hand.strength = hand_strength["four"];
    } else if (vals.some(x => x == 3) && vals.some(x => x == 2)) {
      hand.strength = hand_strength["house"];
    } else if (vals.some(x => x == 3)) {
      hand.strength = hand_strength["three"];
    } else if (vals.reduce((acc, num) => num == 2 ? acc + 1 : acc, 0) == 2) {
      hand.strength = hand_strength["two pair"];
    } else if (vals.some(x => x == 2)) {
      hand.strength = hand_strength["one pair"];
    } else {
      hand.strength = hand_strength["high"];
    }
  }
}

const solve = () => {
  let result = 0;
  let hands = [];

  for (let i = 0; i < input.length; i++) {
    let line = input[i];
    hands.push({
      value: line.split(" ")[0],
      strength: 0,
      bid: Number(line.split(" ")[1])
    });
  }

  calculate_strength(hands);
  console.log(hands);
  hands.sort(compare_hands);

  for (let i = 0; i < hands.length; i++) {
    const rank = i + 1;
    result += rank * hands[i].bid;
  }

  return result;
};

console.log(solve());
