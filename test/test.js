const { Player } = require('../src/player.js');
const { Card, Deck } = require('../src/card.js');

describe('Test if card is the correct based on suit, rank and value ', () => {
    let card;

    beforeEach(() => {
        card = new Card('hearts', 'J');
    });
    
    describe('Test correct suit', () => {
        it('returns the correct suit of the card', () => {
            const correctSuit = 'hearts';
            expect(card.suit).toBe(correctSuit);
        });
    });
    
    describe('Test correct rank', () => {
        it('returns the correct rank of the card', () => {
            const correctRank = 'J';
            expect(card.rank).toBe(correctRank);
        });
    });
    
    describe('Test correct value', () => {
        it('returns the correct value of the card based on its rank', () => {
            const correctValue = 10;
            expect(card.value).toBe(correctValue);
        });
    }); 
})

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

describe('Test the funds function with the players', () => {
    let player;
    let expectedFunds;

    beforeEach(() => {
        player = new Player('test');
        expectedFunds = player.funds;
    })

    describe('addFunds', () => {
        it('increases players Funds', () => {
            const addAmount = 10;

            expectedFunds += addAmount;
            player.addFunds(addAmount);
            expect(player.funds).toBe(expectedFunds);
          });

          it('throws an error if a negative value is passed in', () => {
            expect(() => player.addFunds(-10)).toThrow();
          });

          it('throws an error if no parameter is passed in', () => {
            expect(() => player.addFunds()).toThrow();
          });        
    })

    describe('removeFunds', () => {
        it('decreases a player funds by $10', () => {
            let subAmount = 10;

            expectedFunds -= subAmount;
            player.removeFunds(subAmount);

            expect(player.funds).toBe(expectedFunds);
          });
          
          it('throws an error if negative value is passed', () => {
            expect(() => {
                player.removeFunds(-10);
            }).toThrow();
          });
          
          it('throws an error if no parameter is passed', () => {
            expect(() => {
                player.removeFunds();
            }).toThrow();
          });        
    })
})