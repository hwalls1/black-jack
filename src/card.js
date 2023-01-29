// For each individual card in the deck 
// Has three methods (suit(), rank(), value()
// Face cards are ten, aces can be either 11 or 1 but starts with a value of 11
class Card {
    constructor(suit, rank) {
        this._suit = suit
        this._rank = rank
        if (rank === 'J' | rank === 'Q' | rank === 'K') {
            this._value = 10
        } else if (rank === 'A') {
            this._value = 11
        } else {
            this._value = parseInt(this._rank)
        }
    }

    // Gets suit of card
    get suit() {
        return this._suit
    }

    // Gets rank of card
    get rank() {
        return this._rank
    }

    // gets the value of the card
    get value() {
        return this._value
    }

    // Returns the look of card card in the form of an array
    // Returns array instead of string so that multiple cards can be displayed beside each other
    show() {
        switch (this._suit) {
            case 'hearts':
                if (this._rank === 10) {
                    return ['┌───────┐',`│${this._rank}     │`,'│       │','│   ♥   │','│       │',`│     ${this._rank}│`,'└───────┘']
                }
                return ['┌───────┐',`│${this._rank}      │`,'│       │','│   ♥   │','│       │',`│      ${this._rank}│`,'└───────┘']               
            case 'diamonds':
                if (this._rank === 10) {
                    return ['┌───────┐',`│${this._rank}     │`,'│       │','│   ♦   │','│       │',`│     ${this._rank}│`,'└───────┘']
                }
                return ['┌───────┐',`│${this._rank}      │`,'│       │','│   ♦   │','│       │',`│      ${this._rank}│`,'└───────┘']               
            case 'spades':
                if (this._rank === 10) {
                    return ['┌───────┐',`│${this._rank}     │`,'│       │','│   ♠   │','│       │',`│     ${this._rank}│`,'└───────┘']
                }
                return ['┌───────┐',`│${this._rank}      │`,'│       │','│   ♠   │','│       │',`│      ${this._rank}│`,'└───────┘']               
            case 'clubs':
                if (this._rank === 10) {
                    return ['┌───────┐',`│${this._rank}     │`,'│       │','│   ♣   │','│       │',`│     ${this._rank}│`,'└───────┘']
                }
                return ['┌───────┐',`│${this._rank}      │`,'│       │','│   ♣   │','│       │',`│      ${this._rank}│`,'└───────┘']             
            default:
                return '*error displaying card*'   
        }
        
    }

    // Returns the physical look of a card
    hide() {
        return ['┌───────┐','│░░░░░░░│','│░░░░░░░│','│░░░░░░░│','│░░░░░░░│','│░░░░░░░│','└───────┘']
    }
}

const Deck = []

// creates a deck of 52 cards 
for (let i = 2; i < 11; i++) {
    ['hearts', 'diamonds', 'spades', 'clubs'].forEach(suit => {
        Deck.push(new Card(suit, i))
    })
}

['J', 'Q', 'K', 'A'].forEach(rank => {
    ['hearts', 'diamonds', 'spades', 'clubs'].forEach(suit => {
        Deck.push(new Card(suit, rank))
    })
})

module.exports = { Card, Deck }