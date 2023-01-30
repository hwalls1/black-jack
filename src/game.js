import { Player } from './player.js'
import { Dealer } from './dealer.js'
import ps from "prompt-sync"
const prompt = ps()

// This function initiates game play
const beginGamePlay = (readyToPlay) => {
    const player1 = new Player(prompt('│ What is your name: '))
    const dealer = new Dealer('Dealer')

    console.log(`│\n│  Welcome to Black Jack ${player1.name}!`)
    
    // Keep playing while user still wants to
    while (readyToPlay === 'yes') {
        console.log('|')
        prompt('│  Hit (enter) when you are ready to begin')
        console.log('│')
        let bet = Number(prompt('│  What is your bet: $ '))

        // Removes the bet amount from players total funds
        let wasRemoved = checkBetAmount(bet, player1)
        if (!wasRemoved) {
            player1.removeFunds(bet)
        }

        console.log('│')
        dealer.shuffleDeck()

        // Deals two cards to each the player and dealer to start of the match
        for (let i = 0; i < 2; i ++) {
            player1.addCard(dealer.deal())
            dealer.addCard(dealer.deal())
        }

        player1.showOverview()
        player1.showHand()
        dealer.showOverview(false)
        dealer.showHandCover()

        checkForWinner(player1, dealer, bet)

        let input = prompt('│  Would you like to play again (yes) or (no): ')
        readyToPlay = checkToPlayAgain(input, dealer, player1);
    }
    return readyToPlay;
}

// Checks if user wants to play again if they do it resets the board.
const checkToPlayAgain = (input, dealer, player1) => {
    while (input !== 'yes' & input !== 'no') {
        console.log('│\n│  Please input either (yes) or (no)\n│')
        input = prompt('│  Would you like to play again: ')
    }
    if (input === 'yes' ) {
        dealer.resetDeck()
        dealer.reset()
        player1.reset()
        dealer.shuffleDeck()
    }
    return input
}

// Checks if the value put in for the bet is correct form and adds it to the funds
const checkBetAmount = (bet, player1) => {
    let betWasRemoved = false

    // Checks that bet is not negative, the player has enough funds, and is not a decimal
    while (bet < 1 || bet > player1.funds || !Number.isInteger(bet)) {
        if ( player1.funds === 0 ) {
            console.log('│')
            newFunds = Number(prompt('│ Please deposit more money into your account: '))
            player1.addFunds(newFunds)
            console.log(`│  Your new balance is $ ${player1.funds}\n│`)
        }
        else {
            console.log('│')
            console.log(`│  Please input an integer value minimum (1) max (${player1.funds})\n│`)
            bet = Number(prompt('│  What is your bet: $ '))
            player1.removeFunds(bet)
            betWasRemoved = true
        }
    }
    return betWasRemoved
}

// This is where most of the game logic is handled. 
const checkForWinner = ( player1, dealer, bet ) => {
    let blackJack
    let input

    // If initial dealing equals 21, so ace and a face card, they win 1.5 times the bet
    // setting the variable equal to true allows differentiation between Black Jack and having a normal hand of 21 later on
    if (player1.handValue === 21) {
        console.log('│')
        console.log(`│  Black Jack! You have have won $${Math.floor(bet * 1.5)}\n│`)
        player1.addFunds(bet * 2.5)
        blackJack = true
    }

    let index

    // Allows the user to keep hitting while their hand value is less than 21 or until they choose to stay
    while (player1.handValue < 21 && input !== 'stay') {
        console.log('│')
        input = prompt('│  Would you like to (hit) or (stay): ')
        console.log('│')
        while (input !== 'hit' & input !== 'stay') {
            console.log('│  Please input either (hit) or (stay)\n│')
            input = prompt('│  Would you like to (hit) or (stay): ')
            console.log('│')
        }
        if (input === 'hit') {
            player1.addCard(dealer.deal())
            if (player1.handValue > 21) {
                if (player1.hand.map(card => card.rank).includes('A', index)) {
                    player1.handValue -= 10
                    index = player1.hand.map(card => card.rank).indexOf('A') + 1
                }
            }
            player1.showOverview()
            player1.showHand()
            dealer.showOverview(false)
            dealer.showHandCover()
        } 
    }

    index = 0
    // Checks if user busted 
    if (player1.handValue > 21) {
        console.log('│')
        console.log(`│  Your hand value exceeds 21! You have lost $${bet}!\n│`)
    } else if (!blackJack) {
        input = prompt('│  Press (enter) when you would like the dealer to go')
        console.log('│')
        // Dealer must hit when hand value is less than 17 and must stand when it is 17 or over
        while (dealer.handValue < 17) {
            dealer.addCard(dealer.deal())
            if (dealer.handValue > 21) {
                if (dealer.hand.map(card => card.rank).includes('A', index)) {
                    dealer.handValue -= 10
                    index = dealer.hand.map(card => card.rank).indexOf('A') + 1
                }
            }
        }
        player1.showOverview()
        player1.showHand()
        dealer.showOverview(true)
        dealer.showHand()

        // Checks who won and handles distribution of winnings
        if (dealer.handValue > 21) {
            console.log(`|\n│  Congrats ${player1.name}! The Dealer has bust and you have won $${bet}!\n│`)
            player1.addFunds(bet * 2)
            console.log(`|\n│  Your balance is now $${player1.funds}!\n│`)
        } else if (dealer.handValue < player1.handValue) {
            console.log(`│\n│  Congrats ${player1.name}! Your hand value is closer to 21 than the dealer! You have won $${bet}!\n│`)
            player1.addFunds(bet * 2)
            console.log(`|\n│  Your balance is now $${player1.funds}!\n│`)
        } else if (dealer.handValue > player1.handValue) {
            console.log(`│\n│  Sorry ${player1.name}! The Dealer's hand value is closer to 21 than you! You have lost $${bet}!\n│`)
            console.log(`|\n│  Your balance is now $${player1.funds}!\n│`)
        } else {
            console.log(`│\n│  Close ${player1.name}! You and the dealer have tied! Your bet of $${bet} has been returned to you!\n│`)
            player1.addFunds(bet)
            console.log(`|\n│  Your balance is now $${player1.funds}!\n│`)
        }
    }
}

export { beginGamePlay }