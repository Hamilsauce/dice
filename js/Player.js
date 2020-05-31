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
      this.hasPlayed = false
  }
  createNameFromId() {
    // console.log(this.id);
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

  increaseRollCount(n) {
    this.rollCount += n;
    return this.rollCount;
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