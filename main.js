import {
  game,
  gameFactory
} from './js/Game.js';

//@UI stuff
const uiState = () => {
  let footerButtons = document.querySelectorAll('.footer-button')
  let footer = document.querySelector('.footer')
  let actionBar = document.querySelector('.action-bar')
  if (game.gameActive === true) {
    actionBar.classList.add('fade')
    actionBar.classList.remove('show')
    footer.classList.remove('hide')

    footerButtons.forEach(btn => {
      btn.classList.remove('hide')
    })
  } else if (game.gameActive === false) {
    actionBar.classList.remove('fade')
    actionBar.classList.add('show')
    footer.classList.add('hide')

    footerButtons.forEach(btn => {
      btn.classList.add('hide')
    })
  }
}

const displayMessage = (message, displayTime) => {
  let board = document.querySelector('.scoreDisplay')
  if (typeof displayTime != 'number') {
    board.classList.add('show')
    return;
  }
  board.classList.remove('show')

  board.textContent = '';
  setTimeout(() => {
    board.textContent = message;
    board.classList.add('show')
    setTimeout(() => {
      board.classList.remove('show')
    }, displayTime)
  }, 500)

}
//@ End UI stuff

const playerTurn = (player, diceCount) => {
  const rollLimit = game.rules.rollLimit;
  let activePlayer = game.activePlayer;
  let diceSet = activePlayer.diceSet;
  let dice = diceSet.dice;

  game.updateState();

  if (player.rollCount >= rollLimit || diceCount <= 0) { //! test if roll limit reached, end turn if so
    let scoreDisplay = document.querySelector('.scoreDisplay')
    player.keepDice();
    game.updateState()
    let output = game.generateScore();
    game.endTurn()
    scoreDisplay.textContent = output;

    displayMessage(output, 20000)
  } else if (game.rules.name == 'horses') {
    console.log('in horses roll rules');
    player.keepDice()
    player.rollDice();
  } else if (game.rules.name == 'threes') {
    console.log('in threes roll rules');
    // player.selectedDice = diceSet.getSelectedDice()
    if (player.rollCount == 0) {
      console.log('threes - first turn');
      player.keepDice()
      player.rollDice();
    } else if (player.selectedCount > 0) {
      console.log('threes - player selected at least 1 die');
      player.keepDice()
      player.rollDice();
    } else {
      player.rollCount = player.rollCount - 1;
      console.log('threes - no die selected for keeping');
    }
  }
}

document.querySelector('.rollButton')
  .addEventListener('click', e => {

    console.log(game);
    const player = game.activePlayer;
    let diceSet = player.diceSet;

    game.updateState();
    let diceCount = diceSet.diceCount - diceSet.keptCount;
    playerTurn(player, diceCount);

    game.updateState();
    player.rollCount += 1;

    //*  This is 'Horses' specific, need to move to horses module or add conditional game check
    if (player.rollCount == game.rules.rollLimit) { //! test if last turn, update UI
      e.target.textContent = 'End turn'
      displayMessage('Last roll!', 7000)
    }

    if (game.gameOver === true) {
      let nextPlayerButton = document.querySelector('.nextPlayerButton')
      e.target.textContent = 'Game Over'

      //TODO Refactor: if tie, then game.winner is a string of tied players
      //TODO if no tie, game.winner is an object of winner
      if (typeof game.winner == 'string') {
        let winnerMsg = game.winner
        displayMessage(winnerMsg, 20000)
      } else {
        let winnerMsg = `${game.winner.id} wins with ${game.winner.keptCount} ${game.winner.keptValue}'s`
        displayMessage(winnerMsg, 20000)
      }
      uiState()
    }
    console.log(game);
  });

document.querySelector('.nextPlayerButton')
  .addEventListener('click', e => {
    const rollArea = document.querySelector(`.rollDisplay`);
    const keptArea = document.querySelector(`.keptDisplay`);
    let rollButton = document.querySelector('.rollButton')
    rollButton.textContent = 'Roll';
    game.nextPlayer([rollArea, keptArea]);
    e.target.disabled = true;
    e.target.style.opacity = '0.7'

    uiState()

    let msg = `${game.activePlayer.name}'s turn. Roll on!`
    displayMessage(msg, 7000)

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
    displayMessage(msg, 7000)

    document.querySelector('.action-bar').classList.toggle('disabled');
  });