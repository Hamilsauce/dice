import {
  Die
} from './Die.js'

export class DiceSet {
  constructor(diceCount) {
    this.diceCount = diceCount,
      this.dice = this.createDice(this.diceCount).map(die => new Die(die, this)),
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
    const parent = document.querySelector(`.${parentSelector}`);

    let output = dice
      .reduce((acc, curr) => {
        return acc += curr.template;
      }, '');

    parent.innerHTML = output;

    dice.forEach(die => {
      let dieVal = document.querySelector(`.${die.id}Value`)
      let selector = `checkbox-${die.id}`;
      let checkbox = document.querySelector(`.${selector}`);
      if (die.kept == false) {
        die.registerEventListener(selector);
        dieVal.classList.toggle('dieValue')
        dieVal.classList.toggle('dieValue')
        // document.querySelector(`.${die.id}Value`).classList.toggle('dieValue')
      } else {
        checkbox.classList.add('kept');
        checkbox.disabled = true;
      }
      setTimeout(() => {}, 500);
    })
  }
  keptDice() {
    let keptArray = this.dice
      .filter(die => {
        return die.kept === true;
      })
    return keptArray;
  }
  selectedDice() {
    let selected = this.dice
      .filter(die => {
        return die.selected === true;
      })
    return selected;
  }
  getKeptCount() {
    let kept = this.dice
      .reduce((sum, curr) => {
        if (curr.kept == true) {
          return sum += 1;
        } else {
          return sum += 0;
        }
      }, 0);
    this.keptCount = kept;
    return kept;
  }
  keepDice() {
    this.dice.forEach(die => {
      die.keep();
    })
  }
  generateScore() {
    let count = this.keptDice().length;
    let value = this.keptDice()[0].value;
    return `Player rolled ${count} ${value}'s`;
  }
}

{
  DiceSet
}