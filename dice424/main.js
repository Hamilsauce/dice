import {Game} from './js/Game.js';
import {
  Player
} from './js/Player.js';
import {
  DiceSet
} from './js/DiceSet.js';
import {
  Die
} from './js/Die.js';
console.log('in main');

/*
class hierarchy:

Game class is context for player class,
Player is context for diceSet class,
DiceSet is context for Die class

??? Should dice set be merged with player?
*/

// const diceSet = new DiceSet(5);
const game = new Game(1)
game.newGame();
// let diceCount = 5 - diceSet.keptDice().length;
// let rollCount = 0;

const playerTurn = (player, diceSet) => {
  const rollLimit = 3;
  let rollCount = player.rollCount
  let diceCount = 5 - diceSet.keptDice().length;

  if (rollCount >= rollLimit || diceSet.diceCount <= 0) {
    console.log('no more rolls!');
    let scoreDisplay = document.querySelector('.scoreDisplay')
    let output = diceSet.generateScore();

    game.newTurn()
    game.activePlayer = game.players[players.indexOf(game.activePlayer) + 1];

    //use below code when player and game set up
    // let output = diceSet.renderScore(game.activePlayer);
    scoreDisplay.textContent = output;
    return;
  } else {
    diceSet.dice.forEach(die => {
      if (die.kept === true) {
        return;
      }
      die.roll(1, 6, 'rollDisplay');
    });
    diceSet.renderRolls(diceSet.dice, 'rollDisplay');

    rollCount += 1;
  }
}

// eventListeners
document.querySelector('.rollButton').addEventListener('click', e => {
    // let diceCount = game.rules.diceCount - diceSet.keptDice().length;
    let diceCount = 5 - diceSet.keptDice().length;
    let player = game.activePlayer;
    console.log('player',player);
    console.log('player.rules',player.rules);
    console.log('diceCount',diceCount);
    // console.log('rollcount',player);

    playerTurn(player, player.diceSet);

  });

document.querySelector('.keepButton').addEventListener('click', e => {
    diceSet.keepDice();
  });

document.querySelector('.nextPlayerButton').addEventListener('click', e => {
    location.reload();
  });