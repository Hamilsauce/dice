import {
  Player
} from './Player.js'


export class Game {
  constructor(playerCount) {
    // this.ruleSet = this.getRules(ruleSet)
    this.playerCount = playerCount,
      this.players = this.createPlayers(this.playerCount).map(player => new Player(player, this)),
      this.activePlayer = null,
      this.winner = null
  }
  getRules(ruleSet) {
    if (ruleSet.toLowerCase() == 'horses') {
      console.log('making ruleset');
      return {
        name: ruleSet,
        diceCount: 5,
        rollLimit: 3
      }
    } else {
      console.log('no ruleset');
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
    this.activePlayer = this.players[0];
    console.log('in new');
    document.querySelector('.rollButton').value = 'Roll';
  }

  newTurn() {}
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

{
  Game
}