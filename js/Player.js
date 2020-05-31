import {
  DiceSet
} from './DiceSet.js'

export class Player {
  constructor([id, index], game) {
    this.game = game,
      this.id = id,
      this.index = index,
      this.name = this.createIdAsName(),
      this.diceSet = new DiceSet(this.game.rules.diceCount, this),
      this.rollCount = 0,
      this.hasPlayed = false
  }
  createIdAsName() {
    // console.log(this.id);
    if (this.id == 'player1') {
      return 'Player One';
    } else if (this.id == 'player2') {
      return 'Player Two';
    } else if (this.id == 'player3') {
      return 'Player Three';
    } else if (this.id == 'player4') {
      return 'Player Four';
    } else if (this.id == 'player5') {
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