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
  createDieValue(min, max) {
    if (this.kept === false) {
      min = Math.ceil(min);
      max = Math.floor(max);
      this.value = Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }
    return this.value;
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

    this.dieElement = dieList;
  }
  registerEventListener2() {
    let el = this.dieElement;
    el.addEventListener('click', e => {
      let keptDice = this.diceSet.getKeptDice();
      let selectedDice = this.diceSet.selectedDice();

      let keptCheck = keptDice.every(d => {
        return d.value === this.value;
      })

      let selectedCheck = selectedDice.every(d => {
        return d.value === this.value;
      })

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

    })
  }

  registerEventListener() {
    let el = document.querySelector(`.${this.dieValueClass}`);

    el.addEventListener('click', e => {
      let keptDice = this.diceSet.getKeptDice();
      let selectedDice = this.diceSet.selectedDice();

      let keptCheck = keptDice.every(d => {
        return d.value === this.value;
      })

      let selectedCheck = selectedDice.every(d => {
        return d.value === this.value;
      })

      if (keptCheck === false || selectedCheck === false && selectedDice.length !== 0) {
        this.selected = false;
        el.classList.remove('selected');

        return;
      } else if (this.selected) {
        this.selected = false;
        el.classList.remove('selected');
      } else {
        this.selected = true;
        el.classList.add('selected');
      }
    })
  }

  keep() {
    this.selected == true ? this.kept = true : this.selected = false;
    this.selected = false;
  }
}

{
  Die
}