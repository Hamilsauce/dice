import {
  Player
} from './Player.js'


export class Game {
  constructor(playerCount, rules) {
    this.playerCount = playerCount,
      this.rules = this.getRules(rules),
      this.players = this.createPlayers(this.playerCount).map(player => new Player(player, this)),
      this.activePlayer = null,
      this.gameStarted = false,
      this.winner = null
  }
  getRules(ruleSet) {
    if (ruleSet.toLowerCase() == 'horses') {
      return {
        name: ruleSet,
        diceCount: 5,
        rollLimit: 3
      }
    } else {
      alert('No rules provided. Need dice count and roll limit.');
    }
  }

  createPlayers(count) {
    let players = [];
    for (var i = 1; i <= count; i++) {
      let player = `player${i}`;
      players.push(player);
    };

    return players;
  }
  newGame() {
  	this.gameStarted = true;
    this.activePlayer = this.players[0];
    console.log('in new');
    document.querySelector('.rollButton').value = 'Roll';
  }
  
  updateState() {
    this.activePlayer.keepDice();
    this.activePlayer.diceSet.getKeptDice()
    this.activePlayer.diceSet.getKeptCount()
    this.activePlayer.diceSet.getActiveDice()
  }
  
  generateScore() {
    this.updateState();
    let player = this.activePlayer;
    let diceSet = player.diceSet;
    let count = diceSet.keptCount;
    let value = diceSet.keptDice[0].value;

    return `${player.name} rolled ${count} ${value}'s`;
  }
  newTurn() {
  }
  /*
  1.save the final keptDice from diceSet in the score prop
    of of game.activePlayer

  2. Reset game state, create new diceSet

  3. switch activePlayer to 'hasRolled',
    activate next player

  */
  endGame() {}

  getWinner() {}
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

export const gameFactory = (playerCount, rules) => {
  // const newGame = new Game(playerCount, rules);
  game = new Game(playerCount, rules);
  game.newGame()
  return game

}


{
  gameFactory
}