//TODO Parse 



export class Store {
	constructor() {
		this.state = {
			gameHistory: []
		}
	}
	saveGameToHistory(gameData) {
		this.state.gameHistory.push(gameData);
		this.setLocalStorage('diceGameHistory', this.state.gameHistory)
	}

	getLocalStorage(key) {
		const lStore = localStorage;
		if (key in lStore) {
			this.state.gameHistory = JSON.parse(lStore.getItem(key))
			console.log('key found in store');
		} else {
			this.state.gameHistory = [];
			console.log('no key found');
		}
	}

	setLocalStorage(key, data) {
		const newHistoryData = JSON.stringify(data)
		localStorage.setItem(key, newHistoryData)
	}
	reIndexGames() {
		this.state.gameHistory
			.forEach((game, i) => {
				game.id = i + 1;
			})
		this.setLocalStorage('diceGameHistory', this.state.gameHistory)
		this.getLocalStorage('diceGameHistory')
	}

	getWinnerName(gameToFind) {
		// console.log(gameToFind);
		let game = this.state.gameHistory
			.find(({ id }) => {
				return id = gameToFind.id
			})
			if (typeof game.winner == 'string') {
				return game.winner
			} else {
				let winnerName = game.winner.id ? game.winner.id : game.winner.name
			// console.log(winnerName);
				return winnerName
				// return game.winner.id || game.winner.name;
			}
	}
}

export let store = undefined;

export const storeFactory = () => {
	store = new Store();
	return store
}



{
	storeFactory
}