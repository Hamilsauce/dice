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
  game,
  gameFactory
} from './js/Game.js';


// const game = new Game(1, 'horses')
// game.newGame()

// let diceCount = 5 - diceSet.getKeptDice().length;
// let rollCount = 0;
//horses

const playerTurn = (player, diceCount) => {
  const rollLimit = game.rules.rollLimit;
  let activePlayer = game.activePlayer;
  let diceSet = activePlayer.diceSet;
  let dice = diceSet.dice;
  game.updateState();

  document.querySelector('.scoreDisplay').textContent = 'Last roll!'

  if (player.rollCount >= rollLimit || diceCount <= 0) {
    console.log('no more rolls!');

    player.keepDice();
    game.updateState()
    let scoreDisplay = document.querySelector('.scoreDisplay')
    let output = game.generateScore();
    scoreDisplay.textContent = output;

    return;

  } else {
    dice.forEach(die => {
      if (die.kept === true) {
        return;
      }
      die.roll(1, 6, 'rollDisplay');
    });
    diceSet.renderRolls(dice, 'rollDisplay');

  }
}


document.querySelector('.rollButton')
  .addEventListener('click', e => {
    const player = game.activePlayer;
    let diceSet = player.diceSet;

    game.updateState();

    let diceCount = diceSet.diceCount - diceSet.keptCount;
    playerTurn(player, diceCount);

    game.updateState();
    console.log(game);

    player.rollCount += 1;
    if (player.rollCount >= game.rules.rollLimit) {
      e.target.value = 'End Turn'
    }
  });


document.querySelector('.nextPlayerButton')
  .addEventListener('click', e => {
    location.reload();
  });

document.querySelector('.start-button')
  .addEventListener('click', e => {
    // const createGame = new Event('createGame');
    let gameSelect = document.querySelector('.game-select')

    let gameRules = gameSelect.options[gameSelect.selectedIndex].value
    let playerCount = document.querySelector('.player-count-input').value;
    gameFactory(playerCount, gameRules);
    console.log(game);

    document.querySelector('.button-container').classList.add('show');
    document.querySelector('.options-container').classList.toggle('disabled');
  });