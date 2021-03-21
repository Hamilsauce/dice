import {
	game,
	gameFactory
} from './js/Game.js';
import {
	store,
	storeFactory
} from './js/store.js';
import {
	setRulesModal,
	getPlayerNames
} from './new-game-view.js';
import {
	EndGameModal
} from './js/EndModal.js';

storeFactory();
store.getLocalStorage('diceGameHistory');
store.state.themeColor = 'rgb(186, 91, 91)';
document.querySelector('.footer-container').scrollIntoView()
//@UI stuff
const uiState = () => {
	const titleText = document.querySelector('.app-title');
	const footerButtons = document.querySelectorAll('.footer-button')
	const footer = document.querySelector('.footer')

	titleText.innerText = game.rules.name;

	if (game.gameActive === true) {
		footer.classList.remove('hide')

		footerButtons.forEach(btn => {
			btn.classList.remove('hide')
		})

	} else if (game.gameActive === false) {
		footer.classList.add('hide')

		footerButtons.forEach(btn => {
			btn.classList.add('hide')
		})
	}

	if (game.gameOver == true) {
		setTimeout(() => {
			const endModal = new EndGameModal(document.querySelector('.player-list-body'), store.state.scoreArray, game.rules.name, game.gameTimeSeconds);
			endModal.createWinnerHeader()
			endModal.createGameNameText()
			endModal.createGameTimeText()
			endModal.createListItems();
			document.querySelector('.end-game-modal-dimmer').classList.toggle('hide')
		}, 1000)
	}
}

const displayMessage = (message, displayTime) => {
	let board = document.querySelector('.scoreDisplay')

	if (typeof displayTime != 'number') {
		board.classList.add('show')
		return;
	}

	board.classList.remove('show')
	board.textContent = '';

	setTimeout(() => {
		board.textContent = message;
		board.classList.add('show')
		setTimeout(() => {
			board.classList.remove('show')
		}, displayTime)
	}, 200)
}
//@ End UI stuff

export const handleRollAction = game => {
		const player = game.activePlayer;
		const diceSet = player.diceSet;
		let diceCount = diceSet.diceCount - diceSet.keptCount;
		const rollButton = document.querySelector('.rollButton')
		const nextPlayerButton = document.querySelector('.nextPlayerButton')

	game.updateState();
	// let diceCount = diceSet.diceCount - diceSet.keptCount;
	playerTurn(player, diceCount);

	game.updateState();
	player.rollCount += 1;

	//HORSES
	console.log(player.rollCount);
	// console.log(player.rollCount);
	if (game.rules.name == 'horses') {
		if (player.rollCount >= game.rules.rollLimit ) { //! test if last turn, update UI
			rollButton.textContent = 'End turn'
			displayMessage('Last roll!', 7000)
		}

		if (game.gameOver === true) {
			let nextPlayerButton = document.querySelector('.nextPlayerButton')
			rollButton.textContent = 'Game Over'

			//TODO Refactor: if tie, then game.winner is a string of tied players
			//TODO if no tie, game.winner is an object of winner
			if (typeof game.winner == 'string') {
				let winnerMsg = game.winner
				displayMessage(winnerMsg, 7000)
			} else {
				let winnerMsg = `${game.winner.name} wins with ${game.winner.score}`
				displayMessage(winnerMsg, 7000)
			}
		}

		//THREES
	} else if (game.rules.name == 'threes') {
		if (player.keptDice.length >= game.rules.rollLimit - 1) { //! test if last turn, update UI
			rollButton.textContent = 'End turn'
		}

		if (game.gameOver === true) {
			let nextPlayerButton = document.querySelector('.nextPlayerButton')
			rollButton.textContent = 'Game Over'

			//TODO Refactor: if tie, then game.winner is a string of tied players
			//TODO if no tie, game.winner is an object of winner
			if (typeof game.winner == 'string') {
				let winnerMsg = game.winner
				displayMessage(winnerMsg, 20000)
			} else {
				let winnerMsg = `${game.winner.name} wins with ${game.winner.score}`
				displayMessage(winnerMsg, 20000)
			}
		}

		//SCC
	} else if (game.rules.name == 'ship, captain, crew') {
		if (player.keptDice.length == 5 || player.rollCount >= game.rules.rollLimit) { //! test if last turn, update UI
			rollButton.textContent = 'End turn'
		}

		if (game.gameOver === true) {
			let nextPlayerButton = document.querySelector('.nextPlayerButton')
			rollButton.textContent = 'Game Over'

			//TODO Refactor: if tie, then game.winner is a string of tied players
			//TODO if no tie, game.winner is an object of winner
			if (typeof game.winner == 'string') {
				let winnerMsg = game.winner
				displayMessage(winnerMsg, 20000)
			} else {
				let winnerMsg = `${game.winner.name} wins with ${game.winner.score}`
				displayMessage(winnerMsg, 20000)
			}
		}
	}
	uiState()
}

const playerTurn = (player, diceCount) => {
	const rollLimit = game.rules.rollLimit;
	const activePlayer = game.activePlayer;
	const diceSet = activePlayer.diceSet;
	const dice = diceSet.dice;

	const scoreDisplay = document.querySelector('.scoreDisplay')
	const rollButton = document.querySelector('.rollButton')
	const nextPlayerButton = document.querySelector('.nextPlayerButton')

	game.updateState();

	//HORSES
	if (game.rules.name == 'horses') {
		if (player.rollCount >= rollLimit || diceCount <= 0) { //! test if roll limit reached, end turn if so

			player.keepDice();
			game.updateState()

			let output = game.generateScore();

			displayMessage(output, 5000)
			game.endTurn()

			nextPlayerButton.disabled = false;
			nextPlayerButton.style.opacity = '1';

			rollButton.disabled = true;
			rollButton.style.opacity = '0.7';

		} else {
			player.keepDice()
			player.rollDice();
		}

		//THREES
	} else if (game.rules.name == 'threes') {
		if (player.keptDice.length >= 5) { //! test if roll limit reached, end turn if so
			player.keepDice();
			game.updateState();
			game.endTurn();

			nextPlayerButton.disabled = false;
			nextPlayerButton.style.opacity = '1';

			rollButton.disabled = true;
			rollButton.style.opacity = '0.7';

			let outputText = `${activePlayer.name} rolled ${activePlayer.finalScore.score}`
			displayMessage(outputText, 5000)
		} else if (player.rollCount == 0) {
			player.keepDice()
			player.rollDice();
		}

		if (player.selectedCount > 0) {
			player.keepDice();
			player.selectedCount = 0
			player.rollDice();
		}

		//SCC
	} else if (game.rules.name == 'ship, captain, crew') {
		if (player.rollCount == (rollLimit) || player.keptDice.length == 5) { //! test if roll limit reached, end turn if so
			player.keepDice();
			game.updateState()
			game.endTurn()

			nextPlayerButton.disabled = false;
			nextPlayerButton.style.opacity = '1';

			rollButton.disabled = true;
			rollButton.style.opacity = '0.7';

			let outputText = `${activePlayer.name} rolled ${activePlayer.finalScore.score}`
			displayMessage(outputText, 5000)
		} else if (player.rollCount == 0) {
			player.keepDice()
			player.rollDice();
		} else if (player.selectedDice.length == 0) {
			player.keepDice();
			player.rollDice();
		}
	}
}

//double click roll display
document.querySelector('.table')
	.addEventListener('dblclick', e => {
		if (e.target.classList.contains('die-list') || e.target.classList.contains('die-list') || e.target.classList.contains('die-item') || e.target.classList.contains('dot')) {
			e.stopPropagation();
			e.preventDefault()
			return
		}
		handleRollAction(game)
	});


//roll button
document.querySelector('.rollButton')
	.addEventListener('click', e => {
		handleRollAction(game)
	})

document.querySelector('.nextPlayerButton')
	.addEventListener('click', e => {
		const rollArea = document.querySelector(`.rollDisplay`);
		const keptArea = document.querySelector(`.keptDisplay`);
		let rollButton = document.querySelector('.rollButton')

		rollButton.textContent = 'Roll';
		game.nextPlayer()

		let rollDisplay = document.querySelector('.rollDisplay')
		let dice = document.querySelector('.dice')
		dice.classList.add('newDice')

		setTimeout(() => { //! wait 1 sec to let newDice animation play, then delete all current die Elemets
			rollDisplay.innerHTML = '';
			game.activePlayer.diceSet.renderDice()

			rollButton.disabled = false;
			rollButton.style.opacity = '1';
			rollButton.textContent = 'Roll';
		}, 800);

		e.target.disabled = true;
		e.target.style.opacity = '0.7'

		uiState()
		let msg = `${game.activePlayer.name}'s turn. Roll on!`
		displayMessage(msg, 7000)
	});

document.querySelector('.start-button')
	.addEventListener('click', e => {
		let gameSelect = document.querySelector('.game-select')
		let gameRules = gameSelect.options[gameSelect.selectedIndex].value
		let playerCount = document.querySelector('.player-count-input').value;

		const app = document.querySelector('.app')
		app.style.backgroundColor = store.state.themeColor;
		setRulesModal();
		
		//in newgameview js
		const nameArray = getPlayerNames();
		if (playerCount < 2) {
			playerCountInput.select();
			let msg = 'Must have at least two players'
			displayMessage(msg, 4000)
		} else {
			gameFactory(nameArray, gameRules);

			let rollDisplay = document.querySelector('.rollDisplay')
			rollDisplay.innerHTML = '';

			let rollButton = document.querySelector('.rollButton')
			rollButton.disabled = false;
			rollButton.style.opacity = '1';
			rollButton.textContent = 'Roll';

			game.newGame()
			uiState()
			let originalShadow = getComputedStyle(document.querySelector('.die-item')).boxShadow


			let nextPlayerButton = document.querySelector('.nextPlayerButton')
			nextPlayerButton.disabled = true;
			nextPlayerButton.style.opacity = '0.7';

			let msg = `${game.activePlayer.name}'s turn. Roll on!`
			displayMessage(msg, 4000)

			document.querySelector('.new-game-view').classList.add('hide');
			document.querySelector('.app').classList.toggle('hide');
		}
	});

document.querySelector('.end-new-button')
	.addEventListener('click', e => {
		const newGameView = document.querySelector('.new-game-view')
		let gameView = document.querySelector('.app')
		const eModal = document.querySelector('.end-game-modal-dimmer')
		setTimeout(() => {
			newGameView.classList.remove('hide');
			gameView.classList.add('hide');
			eModal.classList.add('hide')
		}, 400)
	})

// document.querySelector('.end-replay-button')
// .addEventListener('click', e => {
// 	let gameSelect = document.querySelector('.game-select')
// 	let gameRules = gameSelect.options[gameSelect.selectedIndex].value
// 	let playerCount = document.querySelector('.player-count-input').value;

// 	// setRulesModal();

// 	//in newgameview js
// 	const nameArray = getPlayerNames();
// 	if (playerCount < 2) {
// 		playerCountInput.select();
// 		let msg = 'Must have at least two players'
// 		displayMessage(msg, 4000)
// 	} else {
// 		// gameFactory(nameArray, gameRules);

// 		let rollDisplay = document.querySelector('.rollDisplay')
// 		rollDisplay.innerHTML = '';

// 		let rollButton = document.querySelector('.rollButton')
// 		rollButton.disabled = false;
// 		rollButton.style.opacity = '1';
// 		rollButton.textContent = 'Roll';

// 		game.newGame()
// 		uiState()
// 		console.log('game in replay');
// 		console.log(game);

// 		let nextPlayerButton = document.querySelector('.nextPlayerButton')
// 		nextPlayerButton.disabled = true;
// 		nextPlayerButton.style.opacity = '0.7';

// 		let msg = `${game.activePlayer.name}'s turn. Roll on!`
// 		displayMessage(msg, 4000)

// 		// document.querySelector('.new-game-view').classList.toggle('hide');
// 		document.querySelector('.end-game-modal-dimmer').classList.toggle('hide');
// 	}
// });


// document.querySelector('.end-replay-button')
// 	.addEventListener('click', e => {
// 		console.log('end modal');
// 		console.log(endModal);
// 		endModal.replayGame()
// 	})


{
	handleRollAction
}