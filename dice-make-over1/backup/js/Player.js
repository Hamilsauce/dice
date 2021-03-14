import {
  DiceSet
} from './DiceSet.js'

export class Player {
  constructor(id, game) {
    this.game = game,
      this.id = id,
      this.name = this.createIdAsName(),
      this.diceSet = new DiceSet(5),
      this.rollCount = 0
  }
  createIdAsName() {
    console.log(this.id);
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
}

{
  Player
}