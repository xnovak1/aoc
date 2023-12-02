const fs = require("fs");

const input = fs
    .readFileSync("input.txt")
    .toString()
    .trim()
    .replaceAll(" ", "")
    .split("\n");

const reg = new RegExp('(\\d+)(red|green|blue)');

const solve = () => {
    let result = 0;

    for (let i = 0; i < input.length; i++) {
        const counter = {
            "red":   1,
            "green": 1,
            "blue":  1
        }

        const line = input[i];
        const [_, game_body] = line.split(":");
        const game_sets = game_body.split(";");

        for (let i = 0; i < game_sets.length; i++) {
            const balls = game_sets[i].split(",");
            for (let j = 0; j < balls.length; j++) {
                const [_, count, color] = reg.exec(balls[j]);
                
                if (counter[color] < Number(count)) {
                    counter[color] = Number(count);
                }
            }
        }

        const power = counter["red"] * counter["green"] * counter["blue"];
        result += power;
    }

    return result;
}

console.log(solve());