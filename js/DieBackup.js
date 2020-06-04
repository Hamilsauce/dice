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
    this.createTemplate();
    return this.value;
  }
  createTemplate() {
    let valueLabel = `${this.id}Value`;
    if (this.kept === false) {
      this.template = /*html */ `
      <li class="dieItem ${this.id}Item">
          <div class="label-div">
            <div class="dieValue ${this.dieValueClass} activeDie">
            ${this.value}
            </div>
          </div>
      </li>`;
    } else {
      this.template = /*html */ `
      <li class="dieItem die${this.id}Item">
          <div class="label-div">
            <!-- <div class="dieLabel">${this.name}: </div> -->
            <div class="dieValue ${this.dieValueClass} keptDie">
            ${this.value}
            </div>
          </div>
      </li>`;
    }
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

        console.log('must pick previously kept die val');
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