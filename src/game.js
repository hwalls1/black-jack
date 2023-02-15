import { Player } from './player.js'
import { Dealer } from './dealer.js'
import { messages } from './messages.js'
import ps from "prompt-sync"

const prompt = ps();
const player1 = new Player(prompt('│ What is your name: '));
const dealer = new Dealer('Dealer');
const blackJackNumber = 21;

// Initiates game play
function beginGamePlay() {
    console.log(`│\n│  Welcome to Black Jack ${player1.name}!`);
    console.log('|');
    prompt( messages.hitEnter );
    console.log('│');

    let bet = askForBet(player1);
    console.log('│');

    firstCardDealing(player1, dealer);
    checkForWinner(player1, dealer, bet);

    const input = prompt(messages.playAgain);
    checkToPlayAgain(input, dealer, player1);
}

// shuffles and deals out first cards to player and dealer
function firstCardDealing(player1, dealer) {
    dealer.shuffleDeck();

    // Deals two cards to each the player and dealer to start of the match
    for (let i = 0; i < 2; i ++) {
        player1.addCard(dealer.deal());
        dealer.addCard(dealer.deal());
    }

    player1.showOverview();
    player1.showHand();
    dealer.showOverview(false);
    dealer.showHandCover();
}

// Gets bet from user
function askForBet(player1) {
    const bet = Number(prompt('│  What is your bet: $ '));

    // Removes the bet amount from players total funds
    let wasRemoved = checkBetAmount(bet, player1);
    if (!wasRemoved) {
        player1.removeFunds(bet);
    }
    return bet;
}

// Checks if user wants to play again if they do it resets the board.
function checkToPlayAgain(input, dealer, player1) {
    while (input !== 'yes' & input !== 'no') {
        console.log(messages.invalidInput);
        input = prompt(messages.playAgain);
    }
    if (input === 'yes' ) {
        dealer.resetDeck();
        dealer.reset();
        player1.reset();
        dealer.shuffleDeck();
        beginGamePlay();
    }
}

// Checks if the value put in for the bet is correct form and adds it to the funds
function checkBetAmount(bet, player1) {
    let betWasRemoved = false;

    // Checks that bet is not negative, the player has enough funds, and is not a decimal
    while (bet < 1 || bet > player1.funds || !Number.isInteger(bet)) {
        if ( player1.funds === 0 ) {
            console.log('│');
            newFunds = Number(prompt(messages.depositAmount));
            player1.addFunds(newFunds);
            console.log(`│  Your new balance is $ ${player1.funds}\n│`);
        }
        else {
            console.log('│');
            console.log(`│  Please input an integer value minimum (1) max (${player1.funds})\n│`);
            bet = Number(prompt(messages.betAmount));
            player1.removeFunds(bet);
            betWasRemoved = true;
        }
    }

    return betWasRemoved;
}

function checkForWinner(player1, dealer, bet) {
    let blackJack = checkBlackJack(player1, bet);
    let input;
    let index;

    while (player1.handValue < blackJackNumber && input !== 'stay') {
        console.log('│');
        input = prompt(messages.hitOrStay);
        console.log('│');

        while (input !== 'hit' & input !== 'stay') {
            console.log(messages.invalidHitOrStay);
            input = prompt(messages.hitOrStay);
            console.log('│');
        }
        if (input === 'hit') {
            hit(player1, dealer, bet);
        }
        if (player1.handValue > blackJackNumber) {
            lose(bet);
            return;
        }
        if (checkBlackJack(player1, bet)) {
            blackJack = true;
            return;
        }
    }

    if (player1.handValue > blackJackNumber) {
        lose(bet);
    } else if (!blackJack) {
        dealersTurn(player1, dealer, bet);
    }
}

function checkBlackJack(player1, bet) {
    if (player1.handValue === blackJackNumber) {
        console.log('│');
        console.log(`│  Black Jack! You have have won $${Math.floor(bet * 1.5)}\n│`);
        player1.addFunds(bet * 2.5);

        return true;
    }
    return false;
}

function hit(player1, dealer) {
    player1.addCard(dealer.deal());
    player1.showOverview();
    player1.showHand();
    dealer.showOverview(false);
    dealer.showHandCover();
}

function win(player1, bet) {
    console.log(`|\n│  Congrats ${player1.name}! You have won $${bet}!\n│`);
    player1.addFunds(bet * 2);
    console.log(`|\n│  Your balance is now $${player1.funds}!\n│`);
}

function lose(bet) {
    console.log('│');
    console.log(`│  Your hand value exceeds ${blackJackNumber}! You have lost $${bet}!\n│`);
}

function dealersTurn(player1, dealer, bet) {
    let index;
    prompt(messages.dealersTurn);
    console.log('│');

    while (dealer.handValue < 17) {
        dealer.addCard(dealer.deal());
    }

    player1.showOverview();
    player1.showHand();
    dealer.showOverview(true);
    dealer.showHand();

    if (dealer.handValue > blackJackNumber) {
        win(player1, bet);
    } else if (dealer.handValue < player1.handValue) {
        win(player1, bet);
    } else if (dealer.handValue > player1.handValue) {
        console.log(`│\n│  Sorry ${player1.name}! The Dealer's hand value is closer to ${blackJackNumber} than you! You have lost $${bet}!\n│`);
        console.log(`|\n│  Your balance is now $${player1.funds}!\n│`);
    } else {
        console.log(`│\n│  Close ${player1.name}! You and the dealer have tied! Your bet of $${bet} has been returned to you!\n│`)
        player1.addFunds(bet)
        console.log(`|\n│  Your balance is now $${player1.funds}!\n│`)
    }
}

export { beginGamePlay, blackJackNumber }