import {
  DiceSet
} from './DiceSet.js'

export class Player {
  constructor(id, game) {
    this.game = game,
      this.id = id,
      this.name = this.createNameFromId(),
      this.diceSet = new DiceSet(this.game.rules.diceCount, this),
      this.rollCount = 0,
      this.keptDice = [],
      this.hasPlayed = false
  }
  createNameFromId() {
    if (this.id == 1) {
      return 'Player One';
    } else if (this.id == 2) {
      return 'Player Two';
    } else if (this.id == 3) {
      return 'Player Three';
    } else if (this.id == 4) {
      return 'Player Four';
    } else if (this.id == 5) {
      return 'Player Five';
    } else {
      return 'Player (No ID)';
    }
  }
  rollDice() {
    //TODO If this is first roll, then either add event listeners to dice or enable pointerevents
    this.keepDice2();
    const rollDisplay = document.querySelector(`.rollDisplay`)
    const dice = [...document.querySelectorAll(".die-list")]
    const activeDice = dice.filter(die => {
      return die.dataset.kept != 'true';
    })

    activeDice.forEach((die, index) => {
      this.game.toggleClasses(die);
      die.dataset.roll = this.game.getRandomNumber(1, 6);
    });
  }

  increaseRollCount(n) {
    this.rollCount += n;
    return this.rollCount;
  }
  keepDice2() {

    const dice = [...document.querySelectorAll(".die-list")];

    let sel = dice.filter(die => {
      return die.dataset.selected == 'true';
    })
    sel.forEach(die => {
      const dieSides = [...die.children];

      die.classList.add('kept')
      die.classList.remove('selected')
      die.dataset.kept = 'true';
      die.dataset.selected = 'false';
      die.style.pointerEvents = 'none';

      dieSides.forEach(child => {
        child.classList.toggle('kept')
        child.classList.toggle('selected')
      })
    })

    let kept = dice.filter(die => {
      return die.dataset.kept == 'true';

    })
    this.keptDice = kept;

  }

  keepDice() {
    let dice = this.diceSet.dice;
    dice.forEach(die => {
      die.keep();
    })
  }
}


{
  Player
}