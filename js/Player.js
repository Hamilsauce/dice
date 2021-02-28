import {
  DiceSet
} from './DiceSet.js'

export class Player {
  constructor(id, game) {
    this.game = game,
      this.id = id,
      this.name = this.createNameFromId(),
      this.diceSet = new DiceSet(this.game.rules.diceCount, this),
      this.rollCount = 0,
      this.keptDice = [],
      this.selectedDice = [],
      this.selectedCount = 0,
      this.hasPlayed = false,
      this.finalScore
  }
  createNameFromId() {
    if (this.id == 1) {
      return 'Player One';
    } else if (this.id == 2) {
      return 'Player Two';
    } else if (this.id == 3) {
      return 'Player Three';
    } else if (this.id == 4) {
      return 'Player Four';
    } else if (this.id == 5) {
      return 'Player Five';
    } else {
      return 'Player (No ID)';
    }
  }
  rollDice() {
    //TODO If this is first roll, then either add event listeners to dice or enable pointerevents
    //TODO 2) ideally move toggleClasses() into each die object and trigger it from there on each element.
    this.keepDice();
    // let diceObjects = this.diceSet.dice
    
    const rollDisplay = document.querySelector(`.rollDisplay`)
    const dice = [...document.querySelectorAll(".die-list")]
    const activeDice = dice.filter(die => {
      return die.dataset.kept != 'true';
    })

    const getRandomNumber = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    activeDice.forEach(die => {
      this.game.toggleRollClasses(die);
      let newRollValue = getRandomNumber(1, 6);
      die.dataset.roll = newRollValue
      
      // console.log(diceObjects);
      // let dieDataObject = diceObjects.find(dieObj => {
	     // 	// return parseInt(dieObj.id) == parseInt(die.dataset.id)
	     // 	return die == dieDataObject.dieElement
	     // })
      // console.log(dieDataObject);
      // dieDataObject.rollValue = newRollValue;
      
      
      
      
      // this.dices
    });
  }

  increaseRollCount(n) {
    this.rollCount += n;
    return this.rollCount;
  }
  
  keepDice() {
    const dice = [...document.querySelectorAll(".die-list")];
		this.diceSet.getSelectedDice();
		console.log('keep dice game');
		console.log(this.game);
    let sel = dice.filter(die => {
      return die.dataset.selected == 'true';
    })
    
    this.selectedCount = this.selectedCount + sel.length;
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
    
    this.selectedDice.length = 0;
    this.keptDice = kept;
  }
  
  keepDiceThrees() {
    const dice = [...document.querySelectorAll(".die-list")];

    let sel = dice.filter(die => {
      return die.dataset.selected == 'true';
    })
    
    this.selectedCount = this.selectedCount + sel.length;
    console.log(this.game);
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
    this.keptDice = kept;
  }
}


{
  Player
}