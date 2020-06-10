export class Die {
  constructor(id, diceSet) {
    this.value = null,
      this.id = id,
      this.name = this.createNameFromId(),
      this.dieValueClass = `die${this.id}Value`,
      this.selected = false,
      this.diceSet = diceSet,
      this.kept = false
  }
  createNameFromId() {
    if (this.id == 1) {
      return 'Die One';
    } else if (this.id == 2) {
      return 'Die Two';
    } else if (this.id == 3) {
      return 'Die Three';
    } else if (this.id == 4) {
      return 'Die Four';
    } else if (this.id == 5) {
      return 'Die Five';
    } else {
      return 'Die (No ID)';
    }
  }
  // createDieValue(min, max) {
  //   if (this.kept === false) {
  //     min = Math.ceil(min);
  //     max = Math.floor(max);
  //     this.value = Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  //   }
  //   return this.value;
  // }

  toggleRollClasses() {
    this.dieElement.classList.toggle("odd-roll");
    this.dieElement.classList.toggle("even-roll");
  }

  newTemplate() {
    const oddEven = this.id % 2 == 0 ? 'even-roll' : 'odd-roll';
    const dieList = document.createElement('ol');
    dieList.classList.add('die-list', oddEven);
    dieList.setAttribute('id', `die-${this.id}`);
    dieList.dataset.roll = '1';
    dieList.dataset.selected = 'false';
    dieList.dataset.kept = 'false';

    let sideCount = 6;
    for (let i = 1; i <= sideCount; i++) {
      const dieSide = document.createElement('li');
      dieSide.classList.add('die-item');
      dieSide.dataset.side = i;

      for (let j = 1; j <= i; j++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dieSide.appendChild(dot);
      }
      dieList.appendChild(dieSide)
    }

    this.dieTemplate = dieList;
  }
  registerDiceListener(diceSet, player) {
    this.dieElement.addEventListener('click', e => {
      let die = this.dieElement
      let keptDice = player.keptDice;
      let selectedDice = diceSet.getSelectedDice();

      let keptCheck = keptDice.every(d => { //! checks if clicked die has been selected/kept
        return d.dataset.roll == die.dataset.roll;
      })

      let selectedCheck = selectedDice.every(d => { //! checks if clicked die has been selected/kept
        return d.dataset.roll == die.dataset.roll;
      })

      if (keptCheck === true && selectedCheck === true && player.rollCount !== 0) { //! if die isn't already selected/kept AND player has rolled
        die.classList.toggle('selected')
        const dieSides = [...die.children];
        dieSides.forEach(child => {
          child.classList.toggle('selected')

          const dots = [...child.children];
          dots.forEach(dot => {
            dot.classList.toggle('selected')
          })
        })

        if (die.classList.contains('selected')) {
          die.dataset.selected = 'true';
        } else {
          die.dataset.selected = 'false';
        }
      }
    })
  }
}

{
  Die
}