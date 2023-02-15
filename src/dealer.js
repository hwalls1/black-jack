import { Deck } from './card.js'
import { PlayersHand } from './player.js'

class Dealer extends PlayersHand {
    constructor(name) {
        // calls players
        super(name)
        this._deck = Deck.slice(0)
    }

    resetDeck() {
        this._deck = Deck.slice(0)
    }

    shuffleDeck() {
        let newDeck = []
        for (let i = 0; i < 52; i++) {
            newDeck.push(this._deck.splice(Math.floor(Math.random() * (this._deck.length - i)), 1)[0])
        }
        this._deck = newDeck
    }

    // Logs the display of a hidden hand of playing cards to the console.
    showHandCover() {
        for (let i = 0; i < 7; i++) {
            let line = ''
            line += this._hand[0].hide()[i] + ''
            for (let j = 1; j < this._hand.length; j++) {
                line += this._hand[j].show()[i] + ' '
            }
            console.log(line)
        }
    }

    deal() {
        return this._deck.shift()
    }

    showOverview(showValue) {
        if (showValue) {
            console.log(`┌──────────────────────────────┐\n│ Name: ${this._name}  Hand-Total: ${this._handValue} │\n└──────────────────────────────┘`)
        } else {
            console.log(`┌─────────────────────────────┐\n│ Name: ${this._name}  Hand-Total: ? │\n└─────────────────────────────┘`)
        }
    }
}

export { Dealer }