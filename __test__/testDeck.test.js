const { Deck } = require('../src/card.js');

describe('Verify that the deck has 52 cards', () => {
    let deck;

    beforeEach(() => {
        deck = Deck.slice(0);
    });
    
    it('Test the amount of cards in deck', () => {
        const numCards = 52;
    
        expect(deck.length).toBe(numCards);
    });
})