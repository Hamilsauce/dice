const selected = []
const kept = [];


function rollDice() {
  const rollDisplay = document.querySelector(`.rollDisplay`)
  // const dice = [...document.querySelectorAll(".die-list")]
  const dice = document.querySelectorAll(".die-list")
  // .filter(die => {
  //   console.log('filter die: ');
  //   return die.dataset.kept = 'false';
  // })
  // console.log('post filter kept dice line 12');
  // console.log(dice);


  dice.forEach((die, index) => {
   if (die.dataset.kept != 'true') {
    registerEventListeners(die)
    toggleClasses(die);
    die.dataset.roll = getRandomNumber(1, 6);
   }
   

    let el = document.createElement('div');
    let dieClass = `dieValue${die.dataset.roll}`
    el.textContent = die.dataset.roll;

    el.classList.add(dieClass)
    rollDisplay.appendChild(el);
  });
}

function toggleClasses(die) {
  die.classList.toggle("odd-roll");
  die.classList.toggle("even-roll");
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const registerEventListeners = die => {
  const rollDisplay = document.querySelector(`.rollDisplay`)
  // let el = document.querySelector(`.${this.id}Value`);
  // dice.forEach(die => {
  die.addEventListener('click', e => {
    console.log('eve');
    console.log('target');
    console.log(e.target);
    console.log('e.currentTarget');
    console.log(e.currentTarget);
    // let keptDice = this.diceSet.getKeptDice();
    // let selectedDice = this.diceSet.selectedDice();
    // let keptVals = rollDisplay.textContent	
    // let keptCheck = keptDice.every(d => {
    //   return d.value === this.value;
    // })
    // let selectedCheck = selectedDice.every(d => {
    //   return d.value === this.value;
    // })

    die.classList.toggle('selected')
    if (die.classList.contains('selected')) {
      // selected.push(die.dataset.roll)
      selected.push(die)
      die.dataset.selected = 'true';
    } else {
      let popped = selected.pop()
      die.dataset.selected = 'false';
      console.log(popped);
    }
    console.log(die);
    console.log(selected);
    /*   
       
         if (keptCheck === false || selectedCheck === false && selectedDice.length !== 0) {
           this.selected = false;
           die.classList.remove('selected');

           console.log('must pick previously kept die val');
           return;
         } else if (this.selected) {
           this.selected = false;
           die.classList.remove('selected');
         } else {
           this.selected = true;
           die.classList.add('selected');
         }*/
  })
  // })
}
const keepDice = () => {
  const dice = [...document.querySelectorAll(".die-list")];
  let arr = [];
  console.log('checking data attrs for selscted');

  let sel = dice.filter(die => {
    console.log(die.dataset.selected === 'true');
    return die.classList.contains('selected') == true;
  })
  let unsel = dice.filter(die => {
    console.log(die.dataset.selected === false);
    return die.classList.contains('selected') == false;
  })
  sel.forEach(die => {
    // die.classList.remove('selected')
    die.classList.add('kept')
    die.dataset.kept = 'true';
  })
  console.log('sel');
  console.log(sel);
  console.log('unsel');
  console.log(unsel);
  let kept = dice.filter(die => {
    // console.log(die.dataset.selected === false);
    return die.classList.contains('kept') == true;
  })
  console.log('kep');
  console.log(kept);
}

document.getElementById("roll-button")
  .addEventListener("click", e => {
    keepDice()
    rollDice()
  });