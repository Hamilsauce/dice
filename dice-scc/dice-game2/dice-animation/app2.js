// const selected = []
// const kept = [];


function rollDice() {
  const rollDisplay = document.querySelector(`.rollDisplay`)
  const dice = [...document.querySelectorAll(".die-list")]

  let activeDice = [...document.querySelectorAll(".die-list")]
    .filter(die => {
      console.log('filter die: ');
      return die.dataset.kept != 'true';
    })

  activeDice.forEach((die, index) => {
    registerEventListener(die)
    toggleClasses(die);
    die.dataset.roll = getRandomNumber(1, 6);

    let dieClass = `dieValue${die.dataset.roll}`
    console.log(dieClass);
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

const registerEventListener = die => {
  const rollDisplay = document.querySelector(`.rollDisplay`)


  die.addEventListener('click', e => {
    e.stopPropagation()

    //! This commented code is for setting selected and kept die in diceSet/player
    // let keptDice = this.diceSet.getKeptDice();
    // let selectedDice = this.diceSet.selectedDice();
    // let keptVals = rollDisplay.textContent
    // let keptCheck = keptDice.every(d => {
    //   return d.value === this.value;
    // })
    // let selectedCheck = selectedDice.every(d => {
    //   return d.value === this.value;
    // })
    const dieSides = [...die.children];
    dieSides.forEach(child => {
      child.classList.toggle('selected')
    })

    die.classList.toggle('selected')
    if (die.classList.contains('selected')) {

      die.dataset.selected = 'true';
    } else {
      die.dataset.selected = 'false';
    }
    console.log(die);
  })
    //! This commented code is for checking selected and kept die in diceSet/player
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
  // })
}
const keepDice = () => {
  const dice = [...document.querySelectorAll(".die-list")];

  let arr = [];
  console.log('checking data attrs for selscted');

  let sel = dice.filter(die => {
    return die.classList.contains('selected') == true;
  })

  let unsel = dice.filter(die => {
    return die.classList.contains('selected') != true;
  })
  sel.forEach(die => {
    const selectedSides = [...die.children];
    die.classList.add('kept')
    die.dataset.kept = 'true';
    die.classList.remove('selected')

    selectedSides.forEach(child => {
      child.classList.toggle('kept')
      die.classList.remove('selected')

      let selectedDots = [...child.children]
      selectedDots.forEach(dot => {
        dot.classList.toggle('kept')
        die.classList.remove('selected')
      })
    })
  })

  let kept = dice.filter(die => {
    // console.log(die.dataset.selected === false);
    return die.classList.contains('kept') == true;
  })
}

document.getElementById("roll-button")
  .addEventListener("click", e => {
    keepDice()
    rollDice()
  });