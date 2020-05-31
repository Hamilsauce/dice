import {
  Die
} from './Die.js'

export class DiceSet {
  constructor(diceCount, player) {
    this.player = player,
      this.diceCount = diceCount,
      this.dice = this.createDice(this.diceCount).map(id => new Die(id, this)),
      this.activeDice = this.getActiveDice(),
      this.keptCount = 0,
      this.selectedValue = null
  }

  createDice(count) {
    let die = [];
    for (let i = 1; i <= count; i++) {
      let id = i;
      die.push(id);
    };
    return die;
  }
  renderRolls(rollAreaSelector) {
    const rollArea = document.querySelector(`.${rollAreaSelector}`);
    const keptArea = document.querySelector(`.keptDisplay`);
    const activeDice = this.getActiveDice()
    const keptDice = this.getKeptDice()

    let keptDiceMarkup = keptDice //* get the html template for each kept die and reduce it to single html string
      .reduce((acc, curr) => {
        curr.createTemplate()
        return acc += curr.template;
      }, '');
    keptArea.innerHTML = keptDiceMarkup;

    let activeDiceMarkup = activeDice //* get the html template for each active (unkept) die and reduce it to single html string
      .reduce((acc, curr) => {
        return acc += curr.template;
      }, '');
    rollArea.innerHTML = activeDiceMarkup;

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