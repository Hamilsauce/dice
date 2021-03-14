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
      this.selectedValue = []
  }

  createDice(count) {
    let die = [];
    for (let i = 1; i <= count; i++) {
      let id = i;
      die.push(id);
    };
    return die;
  }
  renderDice() {
    const rollArea = document.querySelector(`.rollDisplay`);

    const diceMarkup = document.createElement('div');
    diceMarkup.classList.add('dice')
    this.dice.forEach(die => {
      die.newTemplate();

      diceMarkup.appendChild(die.dieElement)
    })
    rollArea.appendChild(diceMarkup)

    const dieElems = document.querySelectorAll(`.die-list`);
    dieElems.forEach(die => {
      this.registerDiceListener(die)
    })

  }
  registerDiceListener(el) {
    el.addEventListener('click', e => {
      let keptDice = this.player.keptDice;
      this.getSelectedDice();

      let keptCheck = keptDice.every(d => {
        return d.dataset.roll == el.dataset.roll;
      })
      let selectedCheck = this.selectedDice.every(d => {
        return d.dataset.roll == el.dataset.roll;
      })
      if (keptCheck === true && selectedCheck === true) {

        el.classList.toggle('selected')
        if (keptCheck === false) {

        }
        const dieSides = [...el.children];
        dieSides.forEach(child => {
          child.classList.toggle('selected')

          const dots = [...child.children];
          dots.forEach(dot => {
            dot.classList.toggle('selected')
          })
        })

        if (el.classList.contains('selected')) {
          el.dataset.selected = 'true';
        } else {
          el.dataset.selected = 'false';
        }
      }
    })
  }

  getActiveDice() {
    let activeArray = [...document.querySelectorAll(`.die-list`)]
      .filter(die => die.dataset.kept === false)
    this.activeDice = activeArray;
    return this.activeDice;
  }

  getKeptDice() {
    let keptArray = [...document.querySelectorAll(`.die-list`)]
      .filter(die => {
        return die.dataset.kept === true;
      })
    this.keptDice = keptArray;
    return this.keptDice;
  }

  getSelectedDice() {
    let selected = [...document.querySelectorAll(`.die-list`)]
      .filter(die => {
        return die.dataset.selected === 'true';
      })
    this.selectedDice = selected
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