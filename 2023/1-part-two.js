const fs = require("fs");

let input = fs
    .readFileSync("input.txt")
    .toString()
    .trim()

const numbers = {
    "one":   "o1e",
    "two":   "t2o",
    "three": "t3e",
    "four":  "4",
    "five":  "5e",
    "six":   "6",
    "seven": "7",
    "eight": "e8t",
    "nine":  "9e",
}

const solve = () => {
    for (let key in numbers) {
        input = input.replaceAll(key, numbers[key]);
    }

    input = input.split("\n");

    let result = 0;

    for (let i = 0; i < input.length; i++) {
        const line = input[i];
        console.log(line);
        let last_digit = null;
        let temp = "";

        for (let j = 0; j < line.length; j++) {
            const letter = line[j];
            if (letter >= '0' && letter <= '9') {
                last_digit = letter;
                if (temp.length === 0) {
                    temp += last_digit;
                }
            }
        }

        temp += last_digit;
        result += Number(temp);
    }

    return result;
}

console.log(solve());