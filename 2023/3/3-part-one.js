const fs = require("fs");

const input = fs
    .readFileSync("input.txt")
    .toString()
    .split("\n")
    .map((x) => x.trim());

let reg = new RegExp("\\d+", "g");

const is_alphanumeric = (str) => {
    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);
        if (str[i] !== "." &&
            !(code > 47 && code < 58) && // numeric (0-9)
            !(code > 64 && code < 91) && // upper alpha (A-Z)
            !(code > 96 && code < 123)) { // lower alpha (a-z)
            return false;
        }
    }

    return true;
}

const has_symbol_neighbour = (lines, start_i, end_i, line_i) => {
    const WIDTH = lines[0].length;
    const HEIGHT = lines.length;
    const num_len = end_i - start_i + 1;

    for (let i = -1; i <= 1; i++) {
        if ( (line_i + i < 0) || (line_i + i > HEIGHT - 1) ) {
            continue;
        }

        for (let j = -1; j <= num_len; j++) {
            if (start_i + j < 0 || start_i + j > WIDTH - 1) {
                continue;
            }

            if (!is_alphanumeric(lines[line_i + i][start_i + j])) {
                return true;
            }
        }
    }

    return false;
}

const solve = () => {
    let result = 0;

    for (let i = 0; i < input.length; i++) {
        const line = input[i].trim();
        let arr;
        while ((arr = reg.exec(line)) != null) {
            const num = arr[0];
            const start_i = arr.index;
            const end_i = start_i + num.length - 1;

            if (has_symbol_neighbour(input, start_i, end_i, i)) {
                result += Number(num);
            }
        }
    }
    
    return result;
}

console.log(solve());