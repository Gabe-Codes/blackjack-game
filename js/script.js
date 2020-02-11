/*----- constants -----*/
const suits = ['spades', 'clubs', 'diamonds', 'hearts'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q',
    'K', 'A'];
const playerInfo = {
	one: {
		bet: 5,
		value: 0,
		card: {},
		hand: 2,
		lastBet: 0,
		total: 200
	},
	two: {
		bet: 5,
		value: 0,
		card: {},
		hand: 2,
		lastBet: 0,
		total: 200
	},
	three: {
		bet: 5,
		value: 0,
		card: {},
		hand: 2,
		lastBet: 0,
		total: 200
	},
	four: {
		bet: 5,
		value: 0,
		card: {},
		hand: 2,
		lastBet: 0,
		total: 200
	},
	five: {
		bet: 5,
		value: 0,
		card: {},
		hand: 2,
		lastBet: 0,
		total: 200
	},
	six: {
		bet: 5,
		value: 0,
		card: {},
		hand: 2,
		lastBet: 0,
		total: 200
	},
	seven: {
		bet: 5,
		value: 0,
		card: {},
		hand: 2,
		lastBet: 0,
		total: 200
	},
	dealer: {
		value: 0,
		card: {},
		hand: 2
	}
}

/*----- app's state (variables) -----*/
let masterDeck, shuffledDeck, hand, pay, dealerHand, bet, insPay, insBet,
	players, suit, face;
let insurance = false;

/*----- cached element references -----*/
const textEls = {
	totalsText: document.querySelectorAll('[data-totals]'),
	resultsText: document.querySelectorAll('[data-results]')
}
const buttonEls = {
	choiceBtns: document.getElementsByClassName('button-choices'),
	joinBtns: document.getElementsByClassName('join-buttons'),
	playerOneJoin: document.getElementById('buy-in'),
	joinIdx: document.querySelector('[data-join="0"]')
}
const resetEls = {
	resultsReset: document.getElementsByClassName('result-reset'),
	totalsReset: document.getElementsByClassName('total-reset'),
	totalsHide: document.getElementsByClassName('totals-hide'),
	resultsHide: document.getElementsByClassName('results-hide'),
	cardsHide: document.getElementsByClassName('cards-hide')
}
const playerCards = {
	playerOne: document.querySelectorAll('[data-one]'),
	playerTwo: document.querySelectorAll('[data-two]'),
	playerThree: document.querySelectorAll('[data-three]'),
	playerFour: document.querySelectorAll('[data-four]'),
	playerFive: document.querySelectorAll('[data-five]'),
	playerSix: document.querySelectorAll('[data-six]'),
	playerSeven: document.querySelectorAll('[data-seven]'),
	playerDealer: document.querySelectorAll('[data-dealer]'),
	playerDealerHider: document.getElementById('card-dealer-hider')
}
const numTotal = {
    oneTotal: document.getElementById('player-one-total'),
    twoTotal: document.getElementById('player-two-total'),
    threeTotal: document.getElementById('player-three-total'),
    fourTotal: document.getElementById('player-four-total'),
    fiveTotal: document.getElementById('player-five-total'),
    sixTotal: document.getElementById('player-six-total'),
    sevenTotal: document.getElementById('player-seven-total')
}
const numResults = {
    oneResult: document.getElementById('last-bet-one'),
    twoResult: document.getElementById('last-bet-two'),
    threeResult: document.getElementById('last-bet-three'),
    fourResult: document.getElementById('last-bet-four'),
    fiveResult: document.getElementById('last-bet-five'),
    sixResult: document.getElementById('last-bet-six'),
    sevenResult: document.getElementById('last-bet-seven')
}

/*----- event listeners -----*/
document.getElementById('btn-sect')
	.addEventListener('click', choices)
document.getElementById('join-leave')
	.addEventListener('click', joinLeave)
document.getElementById('start')
	.addEventListener('click', startRound)
document.getElementById('reset')
	.addEventListener('click', init)

/*----- functions -----*/
init()

function init() {
	bet = 5;
	
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
					suit: suit,
					rank: rank,
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
			elem.style.display = 'none';
		})
	
	Array.from(resetEls.resultsHide)
		.forEach(function(elem) {
			elem.style.display = 'none';
		})
	
	Array.from(buttonEls.joinBtns)
		.forEach(function(elem) {
			elem.style.display = 'none';
			elem.innerText = 'BUY IN';
		})
	
	Array.from(resetEls.resultsReset)
		.forEach(function(elem) {
			elem.innerText = 0;
		})
	
	Array.from(resetEls.totalsReset)
		.forEach(function(elem) {
			elem.innerText = 200;
		})
	
	playerInfo.one.total = 200;
	playerInfo.two.total = 200;
	playerInfo.three.total = 200;
	playerInfo.four.total = 200;
	playerInfo.five.total = 200;
	playerInfo.six.total = 200;
	playerInfo.seven.total = 200;
	
	playerInfo.one.lastBet = 0;
	playerInfo.two.lastBet = 0;
	playerInfo.three.lastBet = 0;
	playerInfo.four.lastBet = 0;
	playerInfo.five.lastBet = 0;
	playerInfo.six.lastBet = 0;
	playerInfo.seven.lastBet = 0;
	
	postRoundClean();
	buttonEls.playerOneJoin.style.display = 'block';
	players = [];
	turn = 100;
}

function postRoundClean() {
	Array.from(resetEls.cardsHide)
		.forEach(function(elem) {
			elem.style.visibility = 'hidden';
			elem.style.backgroundImage = 'url(../img/cards/backs/blue.svg)';
		})
	
	playerInfo.one.hand = 2;
	playerInfo.two.hand = 2;
	playerInfo.three.hand = 2;
	playerInfo.four.hand = 2;
	playerInfo.five.hand = 2;
	playerInfo.six.hand = 2;
	playerInfo.seven.hand = 2;
}

// Allows players to join/leave the game
function joinLeave(e) {
	let playerIdx = e.target.dataset.join;
	
	if (e.target.tagName !== 'BUTTON') return;
	else if (buttonEls.joinBtns[playerIdx].innerText === 'BUY IN') {
		buttonEls.joinBtns[playerIdx].innerText = 'LEAVE TABLE';
		players.push(playerIdx);
		if (playerIdx < 6) buttonEls.joinBtns[parseInt(playerIdx) + 1].style
			.display = 'block';
		Array.from(textEls.totalsText)
			.forEach(function(elem) {
				if (elem.dataset.totals == playerIdx) elem.style
					.display = 'block';
			})
		Array.from(textEls.resultsText)
			.forEach(function(elem) {
				if (elem.dataset.results == playerIdx) elem.style
					.display = 'block';
			})
	}
	else {
		buttonEls.joinBtns[playerIdx].innerText = 'BUY IN';
		players.splice(players.indexOf(playerIdx), 1);
		Array.from(textEls.totalsText)
			.forEach(function(elem) {
				if (elem.dataset.totals == playerIdx) elem.style.display = 'none';
			})
		Array.from(textEls.resultsText)
			.forEach(function(elem) {
				if (elem.dataset.results == playerIdx) elem.style.display = 'none';
			})
	}
}

// Starts the next round
function startRound(e) {
	card = 2;
	
	if (e.target.tagName !== 'BUTTON' || players.length < 1 || turn !== 100)
		return;
	else {
		postRoundClean();
		initialHand()
	}
	
	// Reshuffles deck when it gets low
	if (shuffledDeck.length < 50) {
		shuffledDeck = [];
        handleShuffleDeck();
    }
}

// Deals every joined players and the dealers intial hand
function initialHand() {
	turn = 0;
	
	if (players.includes('0') === true) {
		playerCards.playerOne[0].style.visibility = 'visible';
		playerInfo.one.card = shuffledDeck.shift();
		playerInfo.one.value = playerInfo.one.card.value;
		playerCards.playerOne[0].style.backgroundImage =
			`url(../img/cards/${playerInfo.one.card.suit}/${playerInfo.one.card.face}.svg)`;
		playerCards.playerOne[1].style.visibility = 'visible';
		playerInfo.one.card = shuffledDeck.shift();
		playerInfo.one.value += playerInfo.one.card.value;
		playerCards.playerOne[1].style.backgroundImage =
			`url(../img/cards/${playerInfo.one.card.suit}/${playerInfo.one.card.face}.svg)`;
	}
	if (players.includes('1') === true) {
		playerCards.playerTwo[0].style.visibility = 'visible';
		playerInfo.two.card = shuffledDeck.shift();
		playerInfo.two.value = playerInfo.two.card.value;
		playerCards.playerTwo[0].style.backgroundImage =
			`url(../img/cards/${playerInfo.two.card.suit}/${playerInfo.two.card.face}.svg)`;
		playerCards.playerTwo[1].style.visibility = 'visible';
		playerInfo.two.card = shuffledDeck.shift();
		playerInfo.two.value += playerInfo.two.card.value;
		playerCards.playerTwo[1].style.backgroundImage =
			`url(../img/cards/${playerInfo.two.card.suit}/${playerInfo.two.card.face}.svg)`;
	}
	if (players.includes('2') === true) {
		playerCards.playerThree[0].style.visibility = 'visible';
		playerInfo.three.card = shuffledDeck.shift();
		playerInfo.three.value = playerInfo.three.card.value;
		playerCards.playerThree[0].style.backgroundImage =
			`url(../img/cards/${playerInfo.three.card.suit}/${playerInfo.three.card.face}.svg)`;
		playerCards.playerThree[1].style.visibility = 'visible';
		playerInfo.three.card = shuffledDeck.shift();
		playerInfo.three.value += playerInfo.three.card.value;
		playerCards.playerThree[1].style.backgroundImage =
			`url(../img/cards/${playerInfo.three.card.suit}/${playerInfo.three.card.face}.svg)`;
	}
	if (players.includes('3') === true) {
		playerCards.playerFour[0].style.visibility = 'visible';
		playerInfo.four.card = shuffledDeck.shift();
		playerInfo.four.value = playerInfo.four.card.value;
		playerCards.playerFour[0].style.backgroundImage =
			`url(../img/cards/${playerInfo.four.card.suit}/${playerInfo.four.card.face}.svg)`;
		playerCards.playerFour[1].style.visibility = 'visible';
		playerInfo.four.card = shuffledDeck.shift();
		playerInfo.four.value += playerInfo.four.card.value;
		playerCards.playerFour[1].style.backgroundImage =
			`url(../img/cards/${playerInfo.four.card.suit}/${playerInfo.four.card.face}.svg)`;
	}
	if (players.includes('4') === true) {
		playerCards.playerFive[0].style.visibility = 'visible';
		playerInfo.five.card = shuffledDeck.shift();
		playerInfo.five.value = playerInfo.five.card.value;
		playerCards.playerFive[0].style.backgroundImage =
			`url(../img/cards/${playerInfo.five.card.suit}/${playerInfo.five.card.face}.svg)`;
		playerCards.playerFive[1].style.visibility = 'visible';
		playerInfo.five.card = shuffledDeck.shift();
		playerInfo.five.value += playerInfo.five.card.value;
		playerCards.playerFive[1].style.backgroundImage =
			`url(../img/cards/${playerInfo.five.card.suit}/${playerInfo.five.card.face}.svg)`;
	}
	if (players.includes('5') === true) {
		playerCards.playerSix[0].style.visibility = 'visible';
		playerInfo.six.card = shuffledDeck.shift();
		playerInfo.six.value = playerInfo.six.card.value;
		playerCards.playerSix[0].style.backgroundImage =
			`url(../img/cards/${playerInfo.six.card.suit}/${playerInfo.six.card.face}.svg)`;
		playerCards.playerSix[1].style.visibility = 'visible';
		playerInfo.six.card = shuffledDeck.shift();
		playerInfo.six.value += playerInfo.six.card.value;
		playerCards.playerSix[1].style.backgroundImage =
			`url(../img/cards/${playerInfo.six.card.suit}/${playerInfo.six.card.face}.svg)`;
	}
	if (players.includes('6') === true) {
		playerCards.playerSeven[0].style.visibility = 'visible';
		playerInfo.seven.card = shuffledDeck.shift();
		playerInfo.seven.value = playerInfo.seven.card.value;
		playerCards.playerSeven[0].style.backgroundImage =
			`url(../img/cards/${playerInfo.seven.card.suit}/${playerInfo.seven.card.face}.svg)`;
		playerCards.playerSeven[1].style.visibility = 'visible';
		playerInfo.seven.card = shuffledDeck.shift();
		playerInfo.seven.value += playerInfo.seven.card.value;
		playerCards.playerSeven[1].style.backgroundImage =
			`url(../img/cards/${playerInfo.seven.card.suit}/${playerInfo.seven.card.face}.svg)`;
	}
	
	playerCards.playerDealerHider.style.visibility = 'visible';
	playerCards.playerDealer[0].style.visibility = 'visible';
	playerInfo.dealer.card = shuffledDeck.shift();
	playerInfo.dealer.value = playerInfo.dealer.card.value;
	playerCards.playerDealer[0].style.backgroundImage =
		`url(../img/cards/${playerInfo.dealer.card.suit}/${playerInfo.dealer.card.face}.svg)`;
	playerCards.playerDealer[1].style.visibility = 'visible';
	playerInfo.dealer.card = shuffledDeck.shift();
	playerInfo.dealer.value += playerInfo.dealer.card.value;
	playerCards.playerDealer[1].style.backgroundImage =
		`url(../img/cards/${playerInfo.dealer.card.suit}/${playerInfo.dealer.card.face}.svg)`;
}

// Listens for the players choice
function choices(e) {
	let pressed = e.target.innerText;
	
	if (e.target.tagName !== 'BUTTON') return;
	else if (pressed === 'HIT') hit();
	else if (pressed === 'STAY') {
		turn += 1;
		card = 2;
	}
	else if (pressed === 'DOUBLE DOWN') {
		if (playerInfo.hand === 2) doubleDown();
		else return;
	}
	else if (pressed === 'INS') {
		if (playerCards.playerDealer[1].rank === 'A') ins();
		else return;
	}
	else {
		if (playerInfo.one.card[0] === playerInfo.one.card[1]) split();
	}
}

// Gives the player a new card when hit
function hit() {
	if (turn === 0 && players.includes('0') === true) {
		playerCards.playerOne[card].style.visibility = 'visible';
		playerInfo.one.card = shuffledDeck.shift();
		playerCards.playerOne[card].style.backgroundImage =
			`url(../img/cards/${playerInfo.one.card.suit}/${playerInfo.one.card.face}.svg)`;
		playerInfo.one.value += playerInfo.one.card.value;
		bust(playerInfo.one.value);
		playerInfo.one.hand += 1;
		card += 1;
	}
	else if (turn === 1 && players.includes('1') === true) {
		playerCards.playerTwo[card].style.visibility = 'visible';
		playerInfo.two.card = shuffledDeck.shift();
		playerCards.playerTwo[card].style.backgroundImage =
			`url(../img/cards/${playerInfo.two.card.suit}/${playerInfo.two.card.face}.svg)`;
		playerInfo.two.value += playerInfo.two.card.value;
		bust(playerInfo.two.value);
		playerInfo.two.hand += 1;
		card += 1;
	}
	else if (turn === 2 && players.includes('2') === true) {
		playerCards.playerThree[card].style.visibility = 'visible';
		playerInfo.three.card = shuffledDeck.shift();
		playerCards.playerThree[card].style.backgroundImage =
			`url(../img/cards/${playerInfo.three.card.suit}/${playerInfo.three.card.face}.svg)`;
		playerInfo.three.value += playerInfo.three.card.value;
		bust(playerInfo.three.value);
		playerInfo.three.hand += 1;
		card += 1;
	}
	else if (turn === 3 && players.includes('3') === true) {
		playerCards.playerFour[card].style.visibility = 'visible';
		playerInfo.four.card = shuffledDeck.shift();
		playerCards.playerFour[card].style.backgroundImage =
			`url(../img/cards/${playerInfo.four.card.suit}/${playerInfo.four.card.face}.svg)`;
		playerInfo.four.value += playerInfo.four.card.value;
		bust(playerInfo.four.value);
		playerInfo.four.hand += 1;
		card += 1;
	}
	else if (turn === 4 && players.includes('4') === true) {
		playerCards.playerFive[card].style.visibility = 'visible';
		playerInfo.five.card = shuffledDeck.shift();
		playerCards.playerFive[card].style.backgroundImage =
			`url(../img/cards/${playerInfo.five.card.suit}/${playerInfo.five.card.face}.svg)`;
		playerInfo.five.value += playerInfo.five.card.value;
		bust(playerInfo.five.value);
		playerInfo.five.hand += 1;
		card += 1;
	}
	else if (turn === 5 && players.includes('5') === true) {
		playerCards.playerSix[card].style.visibility = 'visible';
		playerInfo.six.card = shuffledDeck.shift();
		playerCards.playerSix[card].style.backgroundImage =
			`url(../img/cards/${playerInfo.six.card.suit}/${playerInfo.six.card.face}.svg)`;
		playerInfo.six.value += playerInfo.six.card.value;
		bust(playerInfo.six.value);
		playerInfo.six.hand += 1;
		card += 1;
	}
	else if (turn === 6 && players.includes('6') === true) {
		playerCards.playerSeven[card].style.visibility = 'visible';
		playerInfo.seven.card = shuffledDeck.shift();
		playerCards.playerSeven[card].style.backgroundImage =
			`url(../img/cards/${playerInfo.seven.card.suit}/${playerInfo.seven.card.face}.svg)`;
		playerInfo.seven.value += playerInfo.seven.card.value;
		bust(playerInfo.seven.value);
		playerInfo.seven.hand += 1;
		card += 1;
    }
    else dealerPlay();
}

// Lets the player double down after the inital hand
function doubleDown() {
	
}

// Allow user to split inital hand if they are the same value
function split() {
	
}

// Gives the player insurance
function ins() {
	if (turn === 0);
	else if (turn === 1);
	else if (turn === 2);
	else if (turn === 3);
	else if (turn === 4);
	else if (turn === 5);
	else if (turn === 6);
}

// Checks if the player busted
function bust(value) {
	if (value >= 21) {
		turn += 1;
		card = 2;
	}
}

// Plays out the dealers hand
function dealerPlay() {
	playerCards.playerDealerHider.style.visibility = 'hidden';
	
	while (playerInfo.dealer.value < 17) {
		playerCards.playerDealer[card].style.visibility = 'visible';
		playerInfo.dealer.card = shuffledDeck.shift();
		playerCards.playerDealer[card].style.backgroundImage =
			`url(../img/cards/${playerInfo.dealer.card.suit}/${playerInfo.dealer.card.face}.svg)`;
		playerInfo.dealer.value += playerInfo.dealer.card.value;
		bust(playerInfo.dealer.value);
		playerInfo.dealer.hand += 1;
		card += 1;
	}
	
	turn = 100;
	payOutCaller();
}

// Sends the payout function the players info and sets the players new total
function payOutCaller() {
	playerInfo.one.lastBet = payOuts(playerInfo.one.bet, playerInfo.one.value,
		playerInfo.one.hand);
	playerInfo.two.lastBet = payOuts(playerInfo.two.bet, playerInfo.two.value,
		playerInfo.two.hand);
	playerInfo.three.lastBet = payOuts(playerInfo.three.bet, playerInfo.three
		.value, playerInfo.three.hand);
	playerInfo.four.lastBet = payOuts(playerInfo.four.bet, playerInfo.four
		.value, playerInfo.four.hand);
	playerInfo.five.lastBet = payOuts(playerInfo.five.bet, playerInfo.five
		.value, playerInfo.five.hand);
	playerInfo.six.lastBet = payOuts(playerInfo.six.bet, playerInfo.six.value,
		playerInfo.six.hand);
	playerInfo.seven.lastBet = payOuts(playerInfo.seven.bet, playerInfo.seven
		.value, playerInfo.seven.hand);
	
	playerInfo.one.total = playerInfo.one.total + playerInfo.one.lastBet;
	playerInfo.two.total = playerInfo.two.total + playerInfo.two.lastBet;
	playerInfo.three.total = playerInfo.three.total + playerInfo.three.lastBet;
	playerInfo.four.total = playerInfo.four.total + playerInfo.four.lastBet;
	playerInfo.five.total = playerInfo.five.total + playerInfo.five.lastBet;
	playerInfo.six.total = playerInfo.six.total + playerInfo.six.lastBet;
    playerInfo.seven.total = playerInfo.seven.total + playerInfo.seven.lastBet;
    
    displayUpdate();
}

// Calculates player payouts
function payOuts(bet, value, hand) {
	insBet = bet / 2;
	
	if (insurance === true && dealerValue === 21 && dealerHand === 2) insPay =
		insBet + insBet;
	else insPay = 0;
	
	if (value === 21 && hand === 2) {
        pay = (bet + (bet * 1.5)) + insPay;
        return pay;
	}
	else if (value > playerInfo.dealer.value && value < 22) {
        pay = (bet + bet) + insPay;
        return pay;
	}
	else if (value === playerInfo.dealer.value) return bet;
	else return 0;
}

// Updates the post round info
function displayUpdate() {
    numTotal.oneTotal.innerText = playerInfo.one.total;
    numTotal.twoTotal.innerText = playerInfo.two.total;
    numTotal.threeTotal.innerText = playerInfo.three.total;
    numTotal.fourTotal.innerText = playerInfo.four.total;
    numTotal.fiveTotal.innerText = playerInfo.five.total;
    numTotal.sixTotal.innerText = playerInfo.six.total;
    numTotal.sevenTotal.innerText = playerInfo.seven.total;

    numResults.oneResult.innerText = playerInfo.one.lastBet;
    numResults.twoResult.innerText = playerInfo.two.lastBet;
    numResults.threeResult.innerText = playerInfo.three.lastBet;
    numResults.fourResult.innerText = playerInfo.four.lastBet;
    numResults.fiveResult.innerText = playerInfo.five.lastBet;
    numResults.sixResult.innerText = playerInfo.six.lastBet;
    numResults.sevenResult.innerText = playerInfo.seven.lastBet;
}




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
