import {
  Player
} from './Player.js'

export class Game {
  constructor(playerCount, rules) {
    this.playerCount = playerCount,
      this.rules = this.getRules(rules),
      this.players = this.createPlayers(this.playerCount).map(id => new Player(id, this)),
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
        diceCount: 3,
        rollLimit: 6
      }
    } else {
      alert('No rules provided. Need dice count and roll limit.');
    }
  }

  createPlayers(count) {
    let players = [];
    for (let i = 1; i <= count; i++) {
      let id = i;
      players.push(id);
    };
    return players;
  }

  toggleRollClasses(die) { //* REMEMBER: this param references actual on-page element, not die object;
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
  }

  newGame() {
    let nextPlayerButton = document.querySelector('.nextPlayerButton')
    nextPlayerButton.disabled = true;
    nextPlayerButton.style.opacity = '0.7';

    this.gameActive = true;
    this.activePlayer = this.players[0];

    let rollDisplay = document.querySelector('.rollDisplay')

    rollDisplay.innerHTML = '';
    let rollButton = document.querySelector('.rollButton')
    this.activePlayer.diceSet.renderDice()

    rollButton.disabled = false;
    rollButton.style.opacity = '1';
    rollButton.textContent = 'Roll';
    document.querySelector('.rollButton').value = 'Roll'; //TODO Move button stuff into ui module/main.js function

  }

  updateState() { //TODO need to add more statey things here
    this.activePlayer.keepDice();
    this.activePlayer.diceSet.getKeptDice()
  }

  generateScore() {
    this.updateState();
    let player = this.activePlayer;
    let diceSet = player.diceSet;
    let count = player.keptDice.length
    let value = count > 0 ? player.keptDice[0].dataset.roll : 0;

    let outputText = count > 0 ? `${player.name} rolled ${count} ${value}'s` : `${player.name} forfeit turn! n00b!`
    return outputText;
    // return `${player.name} rolled ${count} ${value}'s`;
  }

  endTurn() { //TODO Move button stuff into ui module/main.js function
    const player = this.activePlayer;
    let rollButton = document.querySelector('.rollButton')
    let nextPlayerButton = document.querySelector('.nextPlayerButton')

    nextPlayerButton.disabled = false;
    nextPlayerButton.style.opacity = '1';

    rollButton.disabled = true;
    rollButton.style.opacity = '0.7';

    let count = player.keptDice.length
    let value = count >= 1 ? player.keptDice[0].dataset.roll : 0;
    player.finalScore = {
      keptCount: count,
      keptValue: value
    }

    player.hasPlayed = true;
    player.diceSet.length = 0;
    let remainingPlayers = this.players
      .filter(player => {
        return player.hasPlayed === false;
      })

    //! If remaining players exist, set activeplayer to next in array else end game
    if (remainingPlayers.length > 0) {
      this.activePlayer = remainingPlayers[0];
    } else {
      this.endGame();
    }
  }


  nextPlayer() {
    let rollDisplay = document.querySelector('.rollDisplay')
    let rollButton = document.querySelector('.rollButton')
    let dice = document.querySelector('.dice')
    dice.classList.add('newDice')

    setTimeout(() => { //! wait 1 sec to let newDice animation play, then delete all current die Elemets
      rollDisplay.innerHTML = '';
      this.activePlayer.diceSet.renderDice()

      rollButton.disabled = false;
      rollButton.style.opacity = '1';
      rollButton.textContent = 'Roll';
    }, 800);

  }

  endGame() {
    this.gameOver = true;
    this.gameActive = false;
    this.getWinner()
  }

  getWinner() {
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
    })

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
  game = new Game(playerCount, rules);
  game.newGame()
  return game

}


{
  gameFactory
}