const { beginGamePlay } = require('./game.js')
const ps = require("prompt-sync")
const prompt = ps()

console.log('\n')
console.log('┌────────────────────────────────────────┐')
console.log('│        Black Jack Terminal Game        │')
console.log('└────────────────────────────────────────┘\n│')

let beginPlay = String(prompt('│ Are you read to play? (yes) or (no): '))

// Continue playing until user enters 'no'
while (beginPlay != 'no') {
    if (beginPlay === 'yes') {
        beginPlay = beginGamePlay(beginPlay);
    }
    else {
        // make sure the user does not want to play anymore.
        console.log('|')
        beginPlay = String(prompt('│ Enter (no) again if you are not ready to play. Enter (yes) if you are ready: '))
        console.log('|')
        if (beginPlay === "no") {
            return;
        }
    }
}