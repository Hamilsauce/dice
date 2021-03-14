//! Update 5.31 - Dice are fully selectable/keypable wuith no errors
//TODO get this into die module
const selected = []
const kept = [];


function rollDice() {
  //TODO If this is first roll, then either add event listeners to dice or enable pointerevents

  const rollDisplay = document.querySelector(`.rollDisplay`)
  const dice = [...document.querySelectorAll(".die-list")]
  const activeDice = dice.filter(die => {
    return die.dataset.kept != 'true';
  })

  activeDice.forEach((die, index) => {
    toggleClasses(die);
    die.dataset.roll = getRandomNumber(1, 6);
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

  die.addEventListener('click', e => {
    //! This commented code is for checking against selected and kept die in diceSet/player
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
    console.log(die);
  })
  //! This commented code is for checking selected and kept die in diceSet/player
  /* if (keptCheck === false || selectedCheck === false && selectedDice.length !== 0) {
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
  // })
}
const keepDice = () => {
  const dice = [...document.querySelectorAll(".die-list")];

  let sel = dice.filter(die => {
    return die.dataset.selected == 'true';
  })

  sel.forEach(die => {
    const dieSides = [...die.children];

    die.classList.add('kept')
    die.classList.remove('selected')
    die.dataset.kept = 'true';
    die.dataset.selected = 'false';
    die.style.pointerEvents = 'none';

    dieSides.forEach(child => {
      child.classList.toggle('kept')
      child.classList.toggle('selected')
    })
  })

  let kept = dice.filter(die => {
        return die.dataset.kept == 'true';

  })
  console.log('kept');
  console.log(kept);
}

document.getElementById("roll-button")
  .addEventListener("click", e => {
    keepDice()
    rollDice()
  });

window.onload = () => {
  const dice = [...document.querySelectorAll(".die-list")]
  dice.forEach(die => {
    registerEventListeners(die)
  })
};