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
  toggleClasses(die) {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
  }

  getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  newGame() {
    let nextPlayerButton = document.querySelector('.nextPlayerButton')
    nextPlayerButton.disabled = true;
    nextPlayerButton.style.opacity = '0.7';

    this.gameActive = true;
    this.activePlayer = this.players[0];
    this.nextPlayer()
    // this.activePlayer.diceSet.renderDice()

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
    let count = player.keptDice.length
    let value = player.keptDice[0].dataset.roll;

    return `${player.name} rolled ${count} ${value}'s`;
  }
  
  endTurn() {
    let rollButton = document.querySelector('.rollButton')
    let nextPlayerButton = document.querySelector('.nextPlayerButton')

    nextPlayerButton.disabled = false;
    nextPlayerButton.style.opacity = '1';

    rollButton.disabled = true;
    rollButton.style.opacity = '0.7';

    this.activePlayer.finalScore = {
      keptCount: this.activePlayer.keptDice.length,
      keptValue: this.activePlayer.keptDice[0].dataset.roll
    }
    this.activePlayer.hasPlayed = true;

    let remainingPlayers = this.players
      .filter(player => {
        return player.hasPlayed === false;
      })

    //! If remaining players exist, set activeplayer to next in array
    //! else end game
    if (remainingPlayers.length > 0) {
      this.activePlayer = remainingPlayers[0];
    } else {
      this.endGame();
    }
  }


  nextPlayer() {
    let rollDisplay = document.querySelector('.rollDisplay')


    rollDisplay.innerHTML = '';
    let rollButton = document.querySelector('.rollButton')
    this.activePlayer.diceSet.renderDice()

    rollButton.disabled = false;
    rollButton.style.opacity = '1';
    rollButton.textContent = 'Roll';


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
      let tieString = tieArray.map(pl => { return pl.id }).join(' & ');
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