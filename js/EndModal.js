import {
	store
} from './store.js';

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

		let scoreProp = this.gameName.toLowerCase() == 'horses' ?
			'score' :
			'threes' ? 'threesScore' :
			'ship, captain, crew' || 'scc' ? 'sccScore' : 'score'

		this.playerRanks.forEach((pl, i) => {
			
			const listItem = this.buildElement('div', this.listItemClassName)
			let rankValue = i + 1;
			let rankOut = `${rankValue}).`
		
			const rankEl = newItemProperty('div', this.itemRankClassName, rankOut)
			listItem.appendChild(rankEl)
			
			let nameOut = pl.name
			const nameEl = newItemProperty('div', this.itemNameClassName, nameOut)
			listItem.appendChild(nameEl)
			
		this.listBodyElement.appendChild(listItem)
			
		})
	}

	showModal(dimmerEl) {


	}
}

{
	EndGameModal
}