/*----- constants -----*/
const suits = ['spades', 'clubs', 'diamonds', 'hearts'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q',
    'k', 'A'];

/*----- app's state (variables) -----*/
let masterDeck, shuffledDeck, hand, pay, dealerHand, bet, insPay, insBet, score,
	dealerScore, numPlayers;
let insurance = false;

/*----- cached element references -----*/
const buttonEls = {
	choiceBtns: document.getElementsByClassName('button-choices'),
	joinBtns: document.getElementsByClassName('join-buttons')
}
const resetEls = {
	resultsReset: document.getElementsByClassName("result-reset"),
	totalsReset: document.getElementsByClassName("total-reset"),
	totalsHide: document.getElementsByClassName("totals-hide"),
	resultsHide: document.getElementsByClassName("results-hide"),
	cardsHide: document.getElementsByClassName("cards-hide")
}
playerOneOneEl = document.getElementsByClassName('card-one');

/*----- event listeners -----*/
// document.getElementsByClassName('button-choices')
// 	.addEventListener('click', choices)
// document.getElementsByClassName('join-buttons')
// 	.addEventListener('click', joinLeave)
// document.getElementById('start')
// 	.addEventListener('click', startRound)
document.getElementById('reset')
    .addEventListener('click', init)

/*----- functions -----*/
init()

function init() {
    // Resets game board and score
	renderReset();
	
	// Build the masterdeck (4 decks, 208 cards)
	masterDeck = buildMasterDeck();
	
	// Initialize shuffledDeck to an empty array
	shuffledDeck = [];
	
	// Shuffle the masterdeck and add it's indexes to the shuffed deck array
	handleShuffleDeck();
}

// Creates deck (for-loop sets how many decks)
function buildMasterDeck() {
	const deck = [];
	suits.forEach(function(suit) {
		ranks.forEach(function(rank) {
			for (i = 0; i < 4; i++) {
				deck.push({
					face: `${suit}-r${rank}`,
					value: Number(rank) || (rank ===
						'A' ? 11 : 10),
				});
			}
		});
	});
	return deck;
}

// Shuffle the Deck
function handleShuffleDeck() {
	const tempDeck = masterDeck.slice();
	while (tempDeck.length) {
		const rndIdx = Math.floor(Math.random() * tempDeck.length);
		shuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
	}
	return shuffledDeck;
}

// Wipe board clean
function renderReset() {
	Array.from(resetEls.totalsHide)
		.forEach(function(elem) {
			elem.style.visibility = 'hidden';
		})
	
	Array.from(resetEls.resultsHide)
		.forEach(function(elem) {
			elem.style.visibility = 'hidden';
		})
	
	Array.from(resetEls.cardsHide)
		.forEach(function(elem) {
			elem.style.visibility = 'hidden';
		})
	
	Array.from(resetEls.resultsReset)
		.forEach(function(elem) {
			elem.innerText = 0;
		})
	
	Array.from(resetEls.totalsReset)
		.forEach(function(elem) {
			elem.innerText = 200;
		})
}

// Allows players to join/leave the game
function joinLeave(e) {
    if (e.target.tagName !=='BUTTON') return;
    else if (buttonEls.joinBtns.innerText === 'BUY IN') {
        buttonEls.joinBtns.innerText = 'LEAVE TABLE';
        numPlayers += 1;
    } else {
        buttonEls.joinBtns.innerText = 'BUY IN';
    }
}

// Starts the next round
function startRound(e) {
    if (e.target.tagName !=='BUTTON') return;
    else if (numPlayers > 0) return;
    else {

    }

    // Reshuffles deck when it gets low
    if (shuffledDeck.length < 50) {
        shuffledDeck = [];
        handleShuffleDeck();
    }
}

// function choices(e) {
//     let pressed = e.target.innerText;

//     if (e.target.tagName !=='BUTTON') return;
//     else if (pressed === 'HIT') hit();
//     else if (pressed === 'STAY') stay();
//     else if (pressed === 'DOUBLE DOWN') doubleDown();
//     else split();
// }

// function hit() {

// }

// function stay() {

// }

// function doubleDown() {

// }

// function split() {
//     return;
// }


// function clacScore() {
//     hand = ;

//     if () ;
//     else if ();
// }

// function payOuts() {
//     if (score === 21 && hand === 2) pay = bet + (bet * 1.5);
//     else if (score > dealerScore && score <= 21) pay = bet + bet;
//     else if (score === dealerScore) pay = bet;
//     else pay = 0;
//     if (insurance === true && dealerScore === 21 && dealerHand === 2) insPay = insBet + insBet;
//     else insPay = 0;
// }



// playerOneOneEl[0].style.backgroundImage = 'url(' + clubsSearch + ')';

// playerOneOneEl[0].dataset.suit = clubs;


// create a card deck  that holds card knowledge
// randomize to find one cards suit and value
// set the cards url to the proper card face
// calculate initial hands score for player and dealer (if dealer 21 all user w/o 21 or insurance lose)
//if player 21, calac blackjack payout and pay user
// cycle through and allow user to make a choice for the hand
// stay - go next
// hit - pull a new card, calc new value, if over 21 go next, if not allow user to hit or stay (repeat till bust)
// after all user turns let dealer play, must hit 16, stay on soft or hard 17
//for each new card flip new card for dealer on board
// after round is finalized update user totals and diplay whether user lost or won and the amount
//start over
