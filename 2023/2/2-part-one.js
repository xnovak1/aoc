const fs = require("fs");

const input = fs
    .readFileSync("input.txt")
    .toString()
    .trim()
    .replaceAll(" ", "")
    .split("\n");

const ball_counts = {
    "red":   12,
    "green": 13,
    "blue":  14
}

const reg = new RegExp('(\\d+)(red|green|blue)');

const solve = () => {
    let result = 0;

    for (let i = 0; i < input.length; i++) {
        let correct = true;
        const line = input[i];
        const [game_head, game_body] = line.split(":");
        const [_, game_id] = game_head.split("Game");
        const game_sets = game_body.split(";");

        for (let i = 0; i < game_sets.length; i++) {
            const balls = game_sets[i].split(",");
            for (let j = 0; j < balls.length; j++) {
                const [_, count, color] = reg.exec(balls[j]);
                
                if (ball_counts[color] < count) {
                    correct = false;
                }
            }
        }

        if (correct) {
            result += Number(game_id);
        }
    }

    return result;
}

console.log(solve());