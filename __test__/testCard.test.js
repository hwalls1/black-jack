import { Card } from '../src/card.js';

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