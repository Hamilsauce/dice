import {
	store
} from './store.js';
import {
	game
} from './Game.js';

export class EndGameModal {
	constructor(listBodyElement, playerRanks, gameName, gameTime) {
		this.listBodyElement = listBodyElement,
			this.playerRanks = playerRanks,
			this.gameName = gameName,
			this.gameTime = gameTime,
			this.winnerClassName = 'end-modal-winner',
			this.gameNameClassName = 'game-name-display',
			this.gameTimeClassName = 'game-time-display',
			this.listItemClassName = 'player-list-item',
			this.itemRankClassName = 'player-item-rank',
			this.itemNameClassName = 'player-item-name',
			this.itemScoreClassName = 'player-item-score'
	}
	buildElement(tag, className) {
		const el = document.createElement(tag);
		el.classList.add(className);
		return el;
	}
	createWinnerHeader() {
		const winnerName = this.playerRanks[0].name;
		const endModalWinner = document.querySelector(`.${this.winnerClassName}`);
		endModalWinner.textContent = `${winnerName} Wins!`;
	}
	createGameNameText() {
		const gameNameDisplay = document.querySelector(`.${this.gameNameClassName}`)
		const formattedGameName = this.gameName.charAt(0).toUpperCase().concat(this.gameName.slice(1));
		gameNameDisplay.textContent = `Game: ${formattedGameName}`
	}
	createGameTimeText() {
		const gameTimeDisplay = document.querySelector(`.${this.gameTimeClassName}`)
		// const formattedGameName = this.gameName.charAt(0).toUpperCase().concat(this.gameName.slice(1));
		gameTimeDisplay.textContent = `Time: ${this.gameTime}s`
	}
	createListItems() {
		const newItemProperty = (tag, className, content) => {
			const el = this.buildElement(tag, className);
			el.textContent = content;
			return el;
		}
		// let scoreProp = this.gameName.toLowerCase();
		
		while (this.listBodyElement.firstChild) { // Remove all current task item elements
			this.listBodyElement.removeChild(this.listBodyElement.firstChild);
		}

		this.playerRanks.forEach((pl, i) => {
			const listItem = this.buildElement('div', this.listItemClassName)
			let rankValue = i + 1;
			let rankOut = `${rankValue})`

			const rankEl = newItemProperty('div', this.itemRankClassName, rankOut)
			listItem.appendChild(rankEl)

			let nameOut = pl.name
			const nameEl = newItemProperty('div', this.itemNameClassName, nameOut)
			listItem.appendChild(nameEl)

			let scoreOut = pl['score']
			console.log(scoreOut);
			const scoreEl = newItemProperty('div', this.itemScoreClassName, scoreOut)
			listItem.appendChild(scoreEl)
			
			this.listBodyElement.appendChild(listItem)
	console.log('game in endmodal');
	console.log(game);
		})
	}
	replayGame() {
		// document.querySelector('.end-replay-button')
			// .addEventListener('click', e => {
				// console.log('end modal');
				// console.log(endModal);
				// endModal.replayGame()
		const dimmer = document.querySelector('.end-game-modal-dimmer')
		dimmer.classList.toggle('hide')
		console.log('new game replay button');
		game.newGame();
		console.log(game);
		// uiState
		
				
				
			// })
	} 
}

{
	EndGameModal
}