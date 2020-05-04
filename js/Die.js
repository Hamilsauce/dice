export class Die {
  constructor(id, diceSet) {
    this.diceSet = diceSet
    this.id = id,
      this.value = null,
      this.kept = false,
      this.selected = false;
      this.name = this.createIdAsName();
  }
  createIdAsName() {
    if (this.id == 'die1') {
      return 'Die One';
    } else if (this.id == 'die2') {
      return 'Die Two';
    } else if (this.id == 'die3') {
      return 'Die Three';
    } else if (this.id == 'die4') {
      return 'Die Four';
    } else if (this.id == 'die5') {
      return 'Die Five';
    } else {
      return 'Die (No ID)';
    }
  }
  roll(min, max) {
    if (this.kept === true) {
      return;
    } else {
      min = Math.ceil(min);
      max = Math.floor(max);
      this.value = Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive

      this.createTemplate();
      return this.value;
    }
  }
  createTemplate() {
    // let parent = document.querySelector(parentClass);
    if (this.kept === false) {
      let checkboxId = `checkbox-${this.id}`;
      this.template = /*html */ `
      <li class="dieItem ${this.id}Item">
          <div class="label-div">
            <div class="dieLabel">${this.name}: </div>
            <div class="dieValue ${this.id}Value">
            ${this.value}
            </div>
          </div>
      </li>`;
    } else {
      this.template = this.template;
    }
  }
  registerEventListener() {
    let el = document.querySelector(`.${this.id}Value`);
  	el.addEventListener('click', e => {
  	  console.log('click2');
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
  
  registerEventListener2() {
    let el = document.querySelector(`.checkbox-${this.id}`);
    el.addEventListener('change', e => {
      console.log('click');
      let keptDice = this.diceSet.keptDice();
      let selectedDice = this.diceSet.selectedDice();

      let keptCheck = keptDice.every(d => {
        return d.value === this.value;
      })
      let selectedCheck = selectedDice.every(d => {
        return d.value === this.value;
      })

      if (keptCheck === false || selectedCheck === false && selectedDice.length !== 0) {
        el.checked = false;
        // el.classList.add('noMatch');
        document.querySelector(`.${this.id}Value`).classList.remove('selected');

        console.log('must pick previously kept die val');
        this.selected = false;
        return;
      } else if (el.checked) {
        el.disabled = false;
        this.selected = true;
        document.querySelector(`.${this.id}Value`).classList.add('selected');
      } else if (!el.checked) {
        el.disabled = false;
        document.querySelector(`.${this.id}Value`).classList.remove('selected');

        this.selected = false;
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