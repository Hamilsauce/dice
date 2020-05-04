import {
  DiceSet
} from './js/DiceSet.js';
import {
  Die
} from './js/Die.js';
import {
  Player
} from './js/Player.js';
import {
  Game
} from './js/Game.js';


const game = new Game(1)
game.newGame()
// const diceSet = new DiceSet(5);
let diceSet = game.activePlayer.diceSet
console.log(diceSet);

let diceCount = 5 - diceSet.getKeptDice().length;
let rollCount = 0;
  const rollLimit = 3;

//horses
const playerTurn = (rollCount, diceCount) => {
  console.log(diceSet);

  if (rollCount >= rollLimit || diceSet.diceCount <= 0) {
    console.log('no more rolls!');
    
    diceSet.keepDice();
    let scoreDisplay = document.querySelector('.scoreDisplay')
    let output = diceSet.generateScore();
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
    
  }
}


document.querySelector('.rollButton')
  .addEventListener('click', e => {
  diceSet.keepDice()
    diceCount = 5 - diceSet.getKeptDice().length;
    playerTurn(rollCount, diceCount);

    rollCount += 1;
    if (rollCount >= rollLimit) {
    	e.target.value = 'End Turn'
    }
  });


document.querySelector('.nextPlayerButton')
  .addEventListener('click', e => {
    location.reload();
  });