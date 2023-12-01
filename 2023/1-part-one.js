const fs = require("fs");

const input = fs
    .readFileSync("input.txt")
    .toString()
    .trim()
    .split("\n");

const solve = () => {
    let result = 0;

    for (let i = 0; i < input.length; i++) {
        const line = input[i];
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