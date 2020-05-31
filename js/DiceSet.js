import {
  Die
} from './Die.js'

export class DiceSet {
  constructor(diceCount, player) {
    this.player = player,
      this.diceCount = diceCount,
      this.dice = this.createDice(this.diceCount).map(die => new Die(die, this)),
      this.activeDice = this.getActiveDice(),
      this.keptCount = 0,
      this.selectedValue = null
  }

  createDice(count) {
    let dice = [];
    for (var i = 1; i <= count; i++) {
      let die = `die${i}`;
      dice.push(die);
    };
    return dice;
  }

  renderRolls(dice, parentSelector) {
    const rollArea = document.querySelector(`.${parentSelector}`);
    const keptArea = document.querySelector(`.keptDisplay`);
    const activeDice = this.getActiveDice()
    const keptDice = this.getKeptDice()

    let keptDiceOutput = keptDice
      .reduce((acc, curr) => {
        // console.log(curr);
        curr.createTemplate()
        return acc += curr.template;
      }, '');

    keptArea.innerHTML = keptDiceOutput;

    let activeDiceOutput = activeDice
      .reduce((acc, curr) => {
        return acc += curr.template;
      }, '');

    rollArea.innerHTML = activeDiceOutput;

    activeDice.forEach(die => {
      die.registerEventListener(`.${die.id}Value`);
    })
  }

  getActiveDice() {
    let activeArray = this.dice
      .filter(die => die.kept === false)
    this.activeDice = activeArray;
    return this.activeDice;
  }

  getKeptDice() {
    let keptArray = this.dice
      .filter(die => {
        return die.kept === true;
      })
    this.keptDice = keptArray;
    return this.keptDice;
  }

  selectedDice() {
    let selected = this.dice
      .filter(die => {
        return die.selected === true;
      })
    return selected;
  }

  getKeptCount() {
    this.keptCount = this.keptDice.length;
    return this.keptCount;
  }
}

{
  DiceSet
}