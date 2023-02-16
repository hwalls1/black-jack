import { blackJackNumber } from "./game.js"

// Contains 3 methods (name(), hand(), and handValue())
class PlayersHand {
    constructor(name) {
        this._name = name
        this._hand = []
        this._handValue = 0
    }
    // Gets the players name
    get name() {
        return this._name
    }

    // Gets the players hand
    get hand() {
        return this._hand
    }

    // Get the hand value in integer format
    get handValue() {
        return this._handValue
    }

    // Sets the value of the hand
    set handValue(value) {
        this._handValue = value
    }

    // Resets the hand value. Used for starting new game 
    reset() {
        this._hand = []
        this._handValue = 0
    }

    addCard(card) {
        this._hand.push(card);
        if (card.rank === 'A') {
            if (this._handValue + 11 > blackJackNumber) {
                this._handValue += 1;
            } else {
                this._handValue += 11;
            }
        } else {
            this._handValue += card.value;
        }
    }

    // Log the cards side by side to the console
    showHand() {
        for (let i = 0; i < 7; i++) {
            let line = ''
            for (let j = 0; j < this._hand.length; j++) {
                line += this._hand[j].show()[i] + ' '
            }
            console.log(line)
        }
    }
}

class Player extends PlayersHand {
    constructor(name) {
        super(name)
        this._funds = 500
    }

    get funds() {
        return this._funds
    }

    addFunds(amount) {
        if (amount >= 0) {
            this._funds += amount
        } else {
            throw(new Error('the addFunds method must be passed a number greater than or equal to zero'))
        }
    }

    removeFunds(amount) {
        if (amount >= 0) {
            this._funds -= amount
        } else {
            throw(new Error('the removeFunds method must be passed a number greater than or equal to zero'))
        }
    }

    showOverview() {
        let length = ('' + this._name + this._handValue + this._funds).length
        console.log(`┌────────────────────────────────${'─'.repeat(length)}┐\n│ Name: ${this._name}  Hand-Total: ${this._handValue} Balance: ${this._funds} │\n└────────────────────────────────${'─'.repeat(length)}┘`)
    }
}

export { Player, PlayersHand }
