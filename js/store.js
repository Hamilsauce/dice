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
		// const lStore = localStorage;
		const newHistoryData = JSON.stringify(data)
		console.log(newHistoryData);
		localStorage.setItem(key, newHistoryData)

		// return 'data y/successfully stored'
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