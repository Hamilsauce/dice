import {
	Player
} from './Player.js';
import {
	store
} from './store.js';

export class Game {
	constructor(playerNames, rules) {
		this.playerCount = playerNames.length,
			this.rules = this.getRules(rules),
			this.players = playerNames.map((n, id) => new Player(n, ++id, this)),
			this.activePlayer = null,
			this.gameActive = false,
			this.gameOver = false,
			this.winner = null
	}

	getRules(ruleSet) {
		if (ruleSet.toLowerCase() == 'horses') {
			return {
				name: ruleSet,
				diceCount: 5,
				rollLimit: 3
			}
		} else if (ruleSet.toLowerCase() == 'threes') {
			return {
				name: ruleSet,
				diceCount: 5,
				rollLimit: 5
			}
		} else if (ruleSet.toLowerCase() == 'ship, captain, crew') {
			return {
				name: ruleSet,
				diceCount: 5,
				rollLimit: 3
			}
		} else {
			alert('No rules provided. Need dice count and roll limit.');
		}
	}

	toggleRollClasses(die) { //* REMEMBER: this param references actual on-page element, not die object;
		die.classList.toggle("odd-roll");
		die.classList.toggle("even-roll");
	}

	newGame() {
		this.gameActive = true;
		this.activePlayer = this.players[0];
		this.activePlayer.diceSet.renderDice()
		this.startTime = performance.now()
	}

	updateState() { //TODO need to add more statey things here
		this.activePlayer.diceSet.getSelectedDice()
		this.activePlayer.keepDice();
		this.activePlayer.diceSet.getKeptDice()
	}

	generateScore() {
		let player = this.activePlayer;
		let diceSet = player.diceSet;

		if (this.rules.name == 'horses') {
			let count = player.keptDice.length
			let value = count > 0 ? player.keptDice[0].dataset.roll : 0;

			let outputText = count > 0 ? `${player.name} rolled ${count} ${value}'s` : `${player.name} forfeit turn! n00b!`
			return outputText;
		} else if (this.rules.name == 'threes') {
			let count = player.keptDice.length
			let outputText = `${player.name} rolled ${player.finalScore.threesScore}`

			return outputText;
		}
	}

	endTurn() { //TODO Move button stuff into ui module/main.js function
		const player = this.activePlayer;

		if (this.rules.name == 'horses') {
			let count = player.keptDice.length
			let value = count >= 1 ? player.keptDice[0].dataset.roll : 0;
			player.finalScore = {
				keptCount: count,
				keptValue: value
			}

			//THREES
		} else if (this.rules.name == 'threes') {
			let sumRolls = player.keptDice
				.reduce((sum, die) => {
					let value = die.dataset.roll
					if (parseInt(value) == 3) {
						return sum + 0;
					} else {
						return sum + parseInt(value)
					}
				}, 0);
			player.finalScore = {
				threesScore: sumRolls
			}

			//SCC
		} else if (this.rules.name == 'ship, captain, crew') {
			let sumRolls = player.keptDice
				.reduce((sum, die) => {
					let value = die.dataset.roll
					return sum + parseInt(value)
				}, 0);

			const adjustedSum = sumRolls - 15;

//TODO MOVE THIS SO SCC SCORE REPLACED WITH 
//NAMES AFTER SCORE COMPARISON
			if (adjustedSum > 0) {
				player.finalScore = {
					sccScore: adjustedSum
				}
			} else if (adjustedSum == 0) {
				player.finalScore = {
					sccScore: 'Ship, Captain and Crew',
					sccScoreValue: adjustedSum
				}
			} else if (adjustedSum == -4) {
				player.finalScore = {
					sccScore: 'Ship and Captain',
					sccScoreValue: adjustedSum
				}
			} else if (adjustedSum == -9) {
				player.finalScore = {
					sccScore: 'Ship',
					sccScoreValue: adjustedSum
				}
			} else if (adjustedSum == -15) {
				player.finalScore = {
					sccScore: 'Nothing',
					sccScoreValue: adjustedSum
				}
			}
		}

		player.hasPlayed = true;
		player.diceSet.length = 0;

		let remainingPlayers = this.players
			.filter(player => {
				return player.hasPlayed === false;
			})

		if (remainingPlayers.length == 0) { // && (this.activePlayer.rollCount >= this.rules.rollLimit || this.rules.diceCount > this.activePlayer.keptDice.length)
			console.log('endgame');
			this.endGame();
		}
	}

	nextPlayer() {
		let remainingPlayers = this.players
			.filter(player => {
				return player.hasPlayed === false;
			})

		if (remainingPlayers.length > 0) {
			this.activePlayer = remainingPlayers[0];
		} else if (this.activePlayer.rollCount > this.rules.rollLimit || this.rules.diceCount > this.activePlayer.keptDice.length) {
			this.endGame();
		}
	}

	endGame() {
		this.stopTime = performance.now()
		this.gameTimeSeconds = parseInt(((this.stopTime - this.startTime) / 1000).toFixed(0))
		this.gameOver = true;
		this.gameActive = false;
		this.getWinner()
	
		const gameRecord = {
			gameDate: new Date().toISOString(),
			gameName: this.rules.name,
			playerCount: this.playerCount,
			gameTime: this.gameTimeSeconds,
			winner: this.winner
		}
		store.saveGameToHistory(gameRecord)
		console.log('end of game');
		console.log(game);
		
	}
	

	getWinner() {
		//HORSES
		if (this.rules.name == 'horses') {
			const scoreArray = this.players
				.map(player => {
					let score = Object.entries(player.finalScore);
					let nameProp = [
            ['id', player.name]
          ];
					return nameProp.concat(score)
						.reduce((obj, prop) => {
							obj[prop[0]] = prop[1];
							return obj;
						}, {});
				});
			let tie = 0;
			scoreArray.sort((a, b) => {
				if (b.keptCount - a.keptCount == 0) {
					if (b.keptValue - a.keptValue == 0) {
						tie += 1
						return 0;
					} else {
						return b.keptValue - a.keptValue;
					}
				} else {
					return b.keptCount - a.keptCount
				}
			});

			//TODO Fix tie bug - if one player wins and the losers tie, game calls tie betwen the losers
			let tieArray = [];
			if (tie >= 1) {
				tieArray = scoreArray.slice(0, tie + 1)
				let tieString = tieArray.map(pl => {
					return pl.id
				}).join(' & ');
				this.winner = `${tieString} tie!`
			} else {
				this.winner = scoreArray[0];
			}

			//THREES
		} else if (this.rules.name == 'threes') {
			const scoreArray = this.players
				.map(player => {
					let score = Object.entries(player.finalScore);
					let nameProp = [
            ['id', player.name]
          ];
					return nameProp.concat(score)
						.reduce((obj, prop) => {
							obj[prop[0]] = prop[1];
							return obj;
						}, {});
				});
			let tie = 0;
			scoreArray.sort((a, b) => {
				if (b.threesScore - a.threesScore == 0) {
					tie += 1
					return 0;
				} else {
					return a.threesScore - b.threesScore;
				}
			});

			//TODO Fix tie bug - if one player wins and the losers tie, game calls tie betwen the losers
			let tieArray = [];
			if (tie >= 1) {
				tieArray = scoreArray.slice(0, tie + 1)
				let tieString = tieArray.map(pl => {
					return pl.id
				}).join(' & ');
				this.winner = `${tieString} tie!`
			} else {
				this.winner = scoreArray[0];
			}

			//SCC
		} else if (this.rules.name == 'ship, captain, crew') {
			const scoreArray = this.players
				.map(player => {
					let score = Object.entries(player.finalScore);
					let nameProp = [
            ['id', player.name]
          ];
					return nameProp.concat(score)
						.reduce((obj, prop) => {
							obj[prop[0]] = prop[1];
							return obj;
						}, {});
				});
				
			let tie = 0;
			scoreArray.sort((a, b) => {
				if (a.sccScoreValue - b.sccScoreValue == 0) {
					tie += 1
					return 0;
				} else {
					return a.sccScoreValue - b.sccScoreValue;
				}
			});

			//TODO Fix tie bug - if one player wins and the losers tie, game calls tie betwen the losers
			let tieArray = [];
			if (tie >= 1) {
				tieArray = scoreArray.slice(0, tie + 1)
				let tieString = tieArray.map(pl => {
					return pl.id
				}).join(' & ');
				this.winner = `${tieString} tie!`
			} else {
				this.winner = scoreArray[0];
			}
		}
	}
}

class Horses extends Game {
	constructor(playerCount) {
		super(playerCount);
		this.rules = {
			diceCount: 5,
			rollLimit: 3,
			winConditions() {
				//...need to 1) compare number of dice kept, 2) then compare the values of the kept dice;
			}
		}
	}

	evaluateScores() {
		//...
	}
}
export let game = undefined;

export const gameFactory = (players, rules) => {
	game = new Game(players, rules);
	// game.newGame()
	return game
}

{
	gameFactory
}