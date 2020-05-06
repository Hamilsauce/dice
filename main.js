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

// let options = document.querySelector('.options-container')
// options.classList.toggle('show');

//horses
const uiState = () => {
let options = document.querySelector('.action-bar')
	if (game.gameStarted === true) {
		options.classList.remove('show')
	} else {

		options.classList.add('show')
	}
}

const toggleScore = (displayTime) => {
  console.log(typeof displayTime);
  if (typeof displayTime != 'number') {
    console.log('toggleScore param invalid');
    document.querySelector('.scoreDisplay').classList.add('show')
    return;
  }
  document.querySelector('.scoreDisplay').classList.toggle('show')
  setTimeout(() => {
    document.querySelector('.scoreDisplay').classList.toggle('show')
  }, displayTime)
}

const playerTurn = (player, diceCount) => {
  const rollLimit = game.rules.rollLimit;
  let activePlayer = game.activePlayer;
  let diceSet = activePlayer.diceSet;
  let dice = diceSet.dice;

  game.updateState();

  if (player.rollCount >= rollLimit || diceCount <= 0) {
    let scoreDisplay = document.querySelector('.scoreDisplay')
    player.keepDice();
    game.updateState()

    let output = game.generateScore();
    toggleScore(20000)
    scoreDisplay.textContent = output;
    return;
  } else {
    dice.forEach(die => {
      if (die.kept === true) return;
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
    if (player.rollCount == game.rules.rollLimit) {
      e.target.textContent = 'End Turn'
      toggleScore(3000)
      document.querySelector('.scoreDisplay').textContent = 'Last roll!'
    }
  });

document.querySelector('.nextPlayerButton')
  .addEventListener('click', e => {
    location.reload();
  });

document.querySelector('.start-button')
  .addEventListener('click', e => {
    let gameSelect = document.querySelector('.game-select')

    let gameRules = gameSelect.options[gameSelect.selectedIndex].value
    let playerCount = document.querySelector('.player-count-input').value;
    gameFactory(playerCount, gameRules);
    game.newGame()
    uiState()
    console.log(game);

    document.querySelector('.action-bar').classList.toggle('disabled');
  });