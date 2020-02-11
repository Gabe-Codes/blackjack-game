/*----- constants -----*/
const suits = ['spades', 'clubs', 'diamonds', 'hearts'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q',
    'K', 'A'];
const playerInfo = {
	one: {
		bet: 20,
		value: 0,
		card: {},
		hand: 2,
		lastBet: 0,
		total: 200,
		blackjack: false,
		insurance: false
	},
	two: {
		bet: 20,
		value: 0,
		card: {},
		hand: 2,
		lastBet: 0,
		total: 200,
		blackjack: false,
		insurance: false
	},
	three: {
		bet: 20,
		value: 0,
		card: {},
		hand: 2,
		lastBet: 0,
		total: 200,
		blackjack: false,
		insurance: false
	},
	four: {
		bet: 20,
		value: 0,
		card: {},
		hand: 2,
		lastBet: 0,
		total: 200,
		blackjack: false,
		insurance: false
	},
	five: {
		bet: 20,
		value: 0,
		card: {},
		hand: 2,
		lastBet: 0,
		total: 200,
		blackjack: false,
		insurance: false
	},
	six: {
		bet: 20,
		value: 0,
		card: {},
		hand: 2,
		lastBet: 0,
		total: 200,
		blackjack: false,
		insurance: false
	},
	seven: {
		bet: 20,
		value: 0,
		card: {},
		hand: 2,
		lastBet: 0,
		total: 200,
		blackjack: false,
		insurance: false
	},
	dealer: {
		value: 0,
		card: {},
		hand: 2
	}
}

/*----- app's state (variables) -----*/
let masterDeck, shuffledDeck, hand, pay, dealerHand, bet, insPay, insBet, players, suit, face, turn,
	turnDisplay, currentPlayer, numPlayers;

/*----- cached element references -----*/
const textEls = {
	totalsText: document.querySelectorAll('[data-totals]'),
	resultsText: document.querySelectorAll('[data-results]'),
	turnText: document.getElementById('player-turn-display'),
	playerTurnText: document.getElementById('player-turn')
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
document.getElementById('dealer')
	.addEventListener('click', dealerPlay)
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
	textEls.turnText.style.visibility = 'hidden';
	finishedPlayers = [];
	numPlayers = [];

	playerInfo.one.hand = 2;
	playerInfo.two.hand = 2;
	playerInfo.three.hand = 2;
	playerInfo.four.hand = 2;
	playerInfo.five.hand = 2;
	playerInfo.six.hand = 2;
	playerInfo.seven.hand = 2;
	
	playerInfo.one.bet = 20;
	playerInfo.two.bet = 20;
	playerInfo.three.bet = 20;
	playerInfo.four.bet = 20;
	playerInfo.five.bet = 20;
	playerInfo.six.bet = 20;
	playerInfo.seven.bet = 20;
	
	playerInfo.one.blackjack = false;
	playerInfo.two.blackjack = false;
	playerInfo.three.blackjack = false;
	playerInfo.four.blackjack = false;
	playerInfo.five.blackjack = false;
	playerInfo.six.blackjack = false;
	playerInfo.seven.blackjack = false;
}

// Allows players to join/leave the game
function joinLeave(e) {
	let playerIdx = e.target.dataset.join;
	
	if (e.target.tagName !== 'BUTTON') return;
	else if (buttonEls.joinBtns[playerIdx].innerText === 'BUY IN') {
		buttonEls.joinBtns[playerIdx].innerText = `PLAYER ${parseInt(playerIdx) + 1}`;
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
	// else {
	// 	buttonEls.joinBtns[playerIdx].innerText = 'BUY IN';
	// 	players.splice(players.indexOf(playerIdx), 1);
	// 	Array.from(textEls.totalsText)
	// 		.forEach(function(elem) {
	// 			if (elem.dataset.totals == playerIdx) elem.style.display =
	// 				'none';
	// 		})
	// 	Array.from(textEls.resultsText)
	// 		.forEach(function(elem) {
	// 			if (elem.dataset.results == playerIdx) elem.style.display =
	// 				'none';
	// 		})
	// }
}

// Starts the next round
function startRound(e) {
	if (e.target.tagName !== 'BUTTON' || players.length < 1 || turn !== 100)
		return;
	else {
		postRoundClean();
		numPlayers = players.slice(0);
		playerBets();
		playerChecker();
		initialHand();
	}
	
	// Reshuffles deck when it gets low
	if (shuffledDeck.length < 50) {
		shuffledDeck = [];
		handleShuffleDeck();
	}
}

// Takes each players bet
function playerBets() {
	if (players.includes('0') === true) {
		playerInfo.one.total -= playerInfo.one.bet;
	}
	if (players.includes('1') === true) {
		playerInfo.two.total -= playerInfo.two.bet;
	}
	if (players.includes('2') === true) {
		playerInfo.three.total -= playerInfo.three.bet;
	}
	if (players.includes('3') === true) {
		playerInfo.four.total -= playerInfo.four.bet;
	}
	if (players.includes('4') === true) {
		playerInfo.five.total -= playerInfo.five.bet;
	}
	if (players.includes('5') === true) {
		playerInfo.six.total -= playerInfo.six.bet;
	}
	if (players.includes('6') === true) {
		playerInfo.seven.total -= playerInfo.seven.bet;
	}
	displayUpdate();
}

// Deals every joined players and the dealers intial hand
function initialHand() {
	turn = 1;
	card = 2;
	players.sort();
	textEls.playerTurnText.innerText = turnDisplay;
	textEls.turnText.style.visibility = 'visible';
	
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
		if (playerInfo.one.value === 21) playerInfo.one.blackjack = true;
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
		if (playerInfo.two.value === 21) playerInfo.two.blackjack = true;
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
		if (playerInfo.three.value === 21) playerInfo.three.blackjack = true;
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
		if (playerInfo.four.value === 21) playerInfo.four.blackjack = true;
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
		if (playerInfo.five.value === 21) playerInfo.five.blackjack = true;
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
		if (playerInfo.six.value === 21) playerInfo.six.blackjack = true;
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
		if (playerInfo.seven.value === 21) playerInfo.seven.blackjack = true;
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
	else if (pressed === 'STAY') stay();
	else if (pressed === 'DOUBLE DOWN') doubleDown();
	else if (pressed === 'INS') {
		if (playerInfo.dealer.card.rank === 'A') ins();
		else return;
	}
	else {
		if (playerInfo.one.card[0] === playerInfo.one.card[1]) split();
	}
}

// Gives the player a new card when hit
function hit() {
	if (players.includes('0') === true) {
		playerCards.playerOne[card].style.visibility = 'visible';
		playerInfo.one.card = shuffledDeck.shift();
		playerCards.playerOne[card].style.backgroundImage =
			`url(../img/cards/${playerInfo.one.card.suit}/${playerInfo.one.card.face}.svg)`;
		playerInfo.one.value += playerInfo.one.card.value;
		bust(playerInfo.one.value);
		playerInfo.one.hand += 1;
		card += 1;
	}
	else if (players.includes('1') === true) {
		playerCards.playerTwo[card].style.visibility = 'visible';
		playerInfo.two.card = shuffledDeck.shift();
		playerCards.playerTwo[card].style.backgroundImage =
			`url(../img/cards/${playerInfo.two.card.suit}/${playerInfo.two.card.face}.svg)`;
		playerInfo.two.value += playerInfo.two.card.value;
		bust(playerInfo.two.value);
		playerInfo.two.hand += 1;
		card += 1;
	}
	else if (players.includes('2') === true) {
		playerCards.playerThree[card].style.visibility = 'visible';
		playerInfo.three.card = shuffledDeck.shift();
		playerCards.playerThree[card].style.backgroundImage =
			`url(../img/cards/${playerInfo.three.card.suit}/${playerInfo.three.card.face}.svg)`;
		playerInfo.three.value += playerInfo.three.card.value;
		bust(playerInfo.three.value);
		playerInfo.three.hand += 1;
		card += 1;
	}
	else if (players.includes('3') === true) {
		playerCards.playerFour[card].style.visibility = 'visible';
		playerInfo.four.card = shuffledDeck.shift();
		playerCards.playerFour[card].style.backgroundImage =
			`url(../img/cards/${playerInfo.four.card.suit}/${playerInfo.four.card.face}.svg)`;
		playerInfo.four.value += playerInfo.four.card.value;
		bust(playerInfo.four.value);
		playerInfo.four.hand += 1;
		card += 1;
	}
	else if (players.includes('4') === true) {
		playerCards.playerFive[card].style.visibility = 'visible';
		playerInfo.five.card = shuffledDeck.shift();
		playerCards.playerFive[card].style.backgroundImage =
			`url(../img/cards/${playerInfo.five.card.suit}/${playerInfo.five.card.face}.svg)`;
		playerInfo.five.value += playerInfo.five.card.value;
		bust(playerInfo.five.value);
		playerInfo.five.hand += 1;
		card += 1;
	}
	else if (players.includes('5') === true) {
		playerCards.playerSix[card].style.visibility = 'visible';
		playerInfo.six.card = shuffledDeck.shift();
		playerCards.playerSix[card].style.backgroundImage =
			`url(../img/cards/${playerInfo.six.card.suit}/${playerInfo.six.card.face}.svg)`;
		playerInfo.six.value += playerInfo.six.card.value;
		bust(playerInfo.six.value);
		playerInfo.six.hand += 1;
		card += 1;
		
	}
	else if (players.includes('6') === true) {
		playerCards.playerSeven[card].style.visibility = 'visible';
		playerInfo.seven.card = shuffledDeck.shift();
		playerCards.playerSeven[card].style.backgroundImage =
			`url(../img/cards/${playerInfo.seven.card.suit}/${playerInfo.seven.card.face}.svg)`;
		playerInfo.seven.value += playerInfo.seven.card.value;
		bust(playerInfo.seven.value);
		playerInfo.seven.hand += 1;
		card += 1;
	}
	else return;
}

// Lets player stay with current hand
function stay() {
	if (turn <= numPlayers.length) {
		turn += 1;
		turnDisplay += 1;
		card = 2;
		nextPlayer();
	}
	turnUpdater();
}


// Lets the player double down after the inital hand
function doubleDown() {
	if (players.includes('0') === true && playerInfo.one.hand === 2) {
		playerInfo.one.total -= playerInfo.one.bet;
		playerCards.playerOne[3].style.visibility = 'visible';
		playerInfo.one.card = shuffledDeck.shift();
		playerCards.playerOne[3].style.backgroundImage =
			`url(../img/cards/${playerInfo.one.card.suit}/${playerInfo.one.card.face}.svg)`;
		playerInfo.one.value += playerInfo.one.card.value;
		playerInfo.one.hand += 1;
		playerInfo.one.bet *= 2;
		stay();
	}
	else if (players.includes('1') === true && playerInfo.two.hand === 2) {
		playerInfo.two.total -= playerInfo.two.bet;
		playerCards.playerTwo[3].style.visibility = 'visible';
		playerInfo.two.card = shuffledDeck.shift();
		playerCards.playerTwo[3].style.backgroundImage =
			`url(../img/cards/${playerInfo.two.card.suit}/${playerInfo.two.card.face}.svg)`;
		playerInfo.two.value += playerInfo.two.card.value;
		playerInfo.two.hand += 1;
		playerInfo.two.bet *= 2;
		stay();
	}
	else if (players.includes('2') === true && playerInfo.three.hand === 2) {
		playerInfo.three.total -= playerInfo.three.bet;
		playerCards.playerThree[3].style.visibility = 'visible';
		playerInfo.three.card = shuffledDeck.shift();
		playerCards.playerThree[3].style.backgroundImage =
			`url(../img/cards/${playerInfo.three.card.suit}/${playerInfo.three.card.face}.svg)`;
		playerInfo.three.value += playerInfo.three.card.value;
		playerInfo.three.hand += 1;
		playerInfo.three.bet *= 2;
		stay();
	}
	else if (players.includes('3') === true && playerInfo.four.hand === 2) {
		playerInfo.four.total -= playerInfo.four.bet;
		playerCards.playerFour[3].style.visibility = 'visible';
		playerInfo.four.card = shuffledDeck.shift();
		playerCards.playerFour[3].style.backgroundImage =
			`url(../img/cards/${playerInfo.four.card.suit}/${playerInfo.four.card.face}.svg)`;
		playerInfo.four.value += playerInfo.four.card.value;
		playerInfo.four.hand += 1;
		playerInfo.four.bet *= 2;
		stay();
	}
	else if (players.includes('4') === true && playerInfo.five.hand === 2) {
		playerInfo.five.total -= playerInfo.five.bet;
		playerCards.playerFive[3].style.visibility = 'visible';
		playerInfo.five.card = shuffledDeck.shift();
		playerCards.playerFive[3].style.backgroundImage =
			`url(../img/cards/${playerInfo.five.card.suit}/${playerInfo.five.card.face}.svg)`;
		playerInfo.five.value += playerInfo.five.card.value;
		playerInfo.five.hand += 1;
		playerInfo.five.bet *= 2;
		stay();
	}
	else if (players.includes('5') === true && playerInfo.six.hand === 2) {
		playerInfo.six.total -= playerInfo.six.bet;
		playerCards.playerSix[3].style.visibility = 'visible';
		playerInfo.six.card = shuffledDeck.shift();
		playerCards.playerSix[3].style.backgroundImage =
			`url(../img/cards/${playerInfo.six.card.suit}/${playerInfo.six.card.face}.svg)`;
		playerInfo.six.value += playerInfo.six.card.value;
		playerInfo.six.hand += 1;
		playerInfo.six.bet *= 2;
		stay();
	}
	else if (players.includes('6') === true && playerInfo.seven.hand === 2) {
		playerInfo.seven.total -= playerInfo.seven.bet;
		playerCards.playerSeven[3].style.visibility = 'visible';
		playerInfo.seven.card = shuffledDeck.shift();
		playerCards.playerSeven[3].style.backgroundImage =
			`url(../img/cards/${playerInfo.seven.card.suit}/${playerInfo.seven.card.face}.svg)`;
		playerInfo.seven.value += playerInfo.seven.card.value;
		playerInfo.seven.hand += 1;
		playerInfo.seven.bet *= 2;
		stay();
	}
	else return;
}

// Allow user to split inital hand if they are the same value
function split() {
	
}

// Gives the player insurance
function ins() {
	if (players.includes('0') === true) {
		playerInfo.one.insurance = true;
		playerInfo.one.total -= (playerInfo.one.bet / 2);
	}
	else if (players.includes('1') === true) {
		playerInfo.two.insurance = true;
		playerInfo.two.total -= (playerInfo.two.bet / 2);
	}
	else if (players.includes('2') === true) {
		playerInfo.three.insurance = true;
		playerInfo.three.total -= (playerInfo.three.bet / 2);
	}
	else if (players.includes('3') === true) {
		playerInfo.four.insurance = true;
		playerInfo.four.total -= (playerInfo.four.bet / 2);
	}
	else if (players.includes('4') === true) {
		playerInfo.five.insurance = true;
		playerInfo.five.total -= (playerInfo.five.bet / 2);
	}
	else if (players.includes('5') === true) {
		playerInfo.six.insurance = true;
		playerInfo.six.total -= (playerInfo.six.bet / 2);
	}
	else if (players.includes('6') === true) {
		playerInfo.seven.insurance = true;
		playerInfo.seven.total -= (playerInfo.seven.bet / 2);
	}
	totalUpdater();
}

// Checks if the player busted
function bust(value) {
	if (value >= 21) {
		stay();
	}
}

// Skips the users turn if they have blackjack
function blackjackCheck() {
	if (turn === 1 && players.includes('0') === true);
}

// Checks who the first player should be (if players have left between rounds)
function playerChecker() {
	if (players.includes('0') === true && playerInfo.one.blackjack === false) turnDisplay = 1;
	else if (players.includes('1') === true && playerInfo.two.blackjack === false) turnDisplay = 2;
	else if (players.includes('2') === true && playerInfo.three.blackjack === false) turnDisplay =
	3;
	else if (players.includes('3') === true && playerInfo.four.blackjack === false) turnDisplay = 4;
	else if (players.includes('4') === true && playerInfo.five.blackjack === false) turnDisplay = 5;
	else if (players.includes('5') === true && playerInfo.six.blackjack === false) turnDisplay = 6;
	else if (players.includes('6') === true && playerInfo.seven.blackjack === false) turnDisplay =
	7;
}

// Changes player turns
function nextPlayer() {
	finishedPlayers.push(players.splice(0, 1));
	finishedPlayers = [].concat.apply([], finishedPlayers);
}

function turnUpdater() {
	if (turn <= numPlayers.length) textEls.playerTurnText.innerText = turnDisplay;
	else if (turn > players.length) textEls.turnText.style.visibility =
		'hidden';
	else return;
}

// Plays out the dealers hand
function dealerPlay(e) {
	if (turn > numPlayers.length) {
		playerCards.playerDealerHider.style.visibility = 'hidden';
		
		while (playerInfo.dealer.value < 17) {
			playerCards.playerDealer[card].style.visibility = 'visible';
			playerInfo.dealer.card = shuffledDeck.shift();
			playerCards.playerDealer[card].style.backgroundImage =
				`url(../img/cards/${playerInfo.dealer.card.suit}/${playerInfo.dealer.card.face}.svg)`;
			playerInfo.dealer.value += playerInfo.dealer.card.value;
			playerInfo.dealer.hand += 1;
			card += 1;
		}
		
		turn = 100;
		payOutCaller();
	}
	else return;
}

// Sends the payout function the players info and sets the players new total
function payOutCaller() {
	if (finishedPlayers.includes('o') === true) {
		playerInfo.one.lastBet = payOuts(playerInfo.one.bet, playerInfo.one.value, playerInfo.one.hand,
			playerInfo.one.insurance);
	}
	if (finishedPlayers.includes('1') === true) {
		playerInfo.two.lastBet = payOuts(playerInfo.two.bet, playerInfo.two.value, playerInfo.two.hand,
			playerInfo.two.insurance);
	}
	if (finishedPlayers.includes('2') === true) {
		playerInfo.three.lastBet = payOuts(playerInfo.three.bet, playerInfo.three.value, playerInfo
			.three.hand, playerInfo.three.insurance);
	}
	if (finishedPlayers.includes('3') === true) {
		playerInfo.four.lastBet = payOuts(playerInfo.four.bet, playerInfo.four.value, playerInfo.four
			.hand, playerInfo.four.insurance);
	}
	if (finishedPlayers.includes('4') === true) {
		playerInfo.five.lastBet = payOuts(playerInfo.five.bet, playerInfo.five.value, playerInfo.five
			.hand, playerInfo.five.insurance);
	}
	if (finishedPlayers.includes('5') === true) {
		playerInfo.six.lastBet = payOuts(playerInfo.six.bet, playerInfo.six.value, playerInfo.six.hand,
			playerInfo.six.insurance);
	}
	if (finishedPlayers.includes('6') === true) {
		playerInfo.seven.lastBet = payOuts(playerInfo.seven.bet, playerInfo.seven.value, playerInfo
			.seven.hand, playerInfo.seven.insurance);
	}

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
function payOuts(bet, value, hand, insurance) {
	insBet = bet / 2;
	
	if (insurance === true && playerInfo.dealer.value === 21 && playerInfo.dealer.hand === 2)
		insPay = insBet + insBet;
	else insPay = 0;
	
	if (value === 21 && hand === 2) {
		pay = (bet + (bet * 1.5)) + insPay;
		return pay;
	}
	else if (playerInfo.dealer.value > 21 && value < 22) {
		pay = (bet + bet);
		return pay;
	}
	else if (value > playerInfo.dealer.value && value < 22) {
		pay = (bet + bet) + insPay;
		return pay;
	}
	else if (value === playerInfo.dealer.value && value < 22) return bet;
	else return 0;
}

function totalUpdater() {
	numTotal.oneTotal.innerText = playerInfo.one.total;
	numTotal.twoTotal.innerText = playerInfo.two.total;
	numTotal.threeTotal.innerText = playerInfo.three.total;
	numTotal.fourTotal.innerText = playerInfo.four.total;
	numTotal.fiveTotal.innerText = playerInfo.five.total;
	numTotal.sixTotal.innerText = playerInfo.six.total;
	numTotal.sevenTotal.innerText = playerInfo.seven.total;
}

// Updates the post round info
function displayUpdate() {
	totalUpdater();
	
	numResults.oneResult.innerText = playerInfo.one.lastBet;
	numResults.twoResult.innerText = playerInfo.two.lastBet;
	numResults.threeResult.innerText = playerInfo.three.lastBet;
	numResults.fourResult.innerText = playerInfo.four.lastBet;
	numResults.fiveResult.innerText = playerInfo.five.lastBet;
	numResults.sixResult.innerText = playerInfo.six.lastBet;
	numResults.sevenResult.innerText = playerInfo.seven.lastBet;
	
	finishedPlayers.forEach(function(elem) {
		players.push(elem);
		players = [].concat.apply([], players);
	})
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
