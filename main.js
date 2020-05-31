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

const uiState = () => {
  let actionBar = document.querySelector('.action-bar')
  if (game.gameStarted === true) {
    actionBar.classList.add('fade')
    actionBar.classList.remove('show')
  } else {
    actionBar.classList.remove('fade')
    actionBar.classList.add('show')
  }
}

const displayMessage = (message, displayTime) => {
  let board = document.querySelector('.scoreDisplay')
  // console.log(typeof displayTime);
  if (typeof displayTime != 'number') {
    // console.log('displayMessage param invalid');
    board.classList.add('show')
    return;
  }
  board.classList.toggle('show')
  board.textContent = message;
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
    game.endTurn()
    scoreDisplay.textContent = output;

    displayMessage(output, 20000)
    return;
  } else {
    dice.forEach(die => {
      if (die.kept === true) return;
      die.createDieValue(1, 6, 'rollDisplay');
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
    player.rollCount += 1;

    if (player.rollCount == game.rules.rollLimit) {
      e.target.textContent = 'End turn'
      displayMessage('End Turn', 3000)
      document.querySelector('.scoreDisplay').textContent = 'Last roll!'
    }

    if (game.gameOver === true) {
      let nextPlayerButton = document.querySelector('.nextPlayerButton')
      e.target.textContent = 'Game Over'
      nextPlayerButton.disabled = true;
      nextPlayerButton.style.opacity = '0.7'

      let winnerMsg = `${game.winner.id} wins with ${game.winner.keptCount} ${game.winner.keptValue}'s`
      displayMessage(winnerMsg, 20000)
    }
  });

document.querySelector('.nextPlayerButton')
  .addEventListener('click', e => {
    const rollArea = document.querySelector(`.rollDisplay`);
    const keptArea = document.querySelector(`.keptDisplay`);
    let rollButton = document.querySelector('.rollButton')
    // location.reload();
    rollButton.textContent = 'Roll';
    game.nextPlayer([rollArea, keptArea])
    uiState()

    let msg = `${game.activePlayer.name}'s turn. Roll on!`
    displayMessage(msg, 5000)
    // console.log(game);


  });

document.querySelector('.start-button')
  .addEventListener('click', e => {
    let gameSelect = document.querySelector('.game-select')

    let gameRules = gameSelect.options[gameSelect.selectedIndex].value
    let playerCount = document.querySelector('.player-count-input').value;
    gameFactory(playerCount, gameRules);
    game.newGame()
    uiState()

    let msg = `${game.activePlayer.name}'s turn. Roll on!`
    displayMessage(msg, 5000)
    // console.log(game);

    document.querySelector('.action-bar').classList.toggle('disabled');
  });