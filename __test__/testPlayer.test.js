import { Player } from '../src/player.js';

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