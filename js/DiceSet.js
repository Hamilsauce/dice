import {
	Die
} from './Die.js'

export class DiceSet {
	constructor(diceCount, player) {
		this.player = player;
		this.diceCount = diceCount;
		this.dice = this.createDice(this.diceCount).map(id => new Die(id, this));
		this.activeDice = this.getActiveDice();
		this.keptCount = 0;
		this.selectedValue = [];
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
		rollArea.appendChild(diceMarkup)

		const diceElement = rollArea.querySelector('.dice')
		diceMarkup.classList.add('dice')
		this.dice.forEach(die => {
			die.newTemplate();
			diceMarkup.appendChild(die.dieTemplate)
			die.dieElement = diceElement.lastElementChild;
		})

		this.dice.forEach(die => {
			die.registerDiceListener(this, this.player)
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
			});
			
		this.keptDice = keptArray;
		
		return this.keptDice;
	}

	getSelectedDice() {
		let selected = [...document.querySelectorAll(`.die-list`)]
			.filter(die => {
				return die.dataset.selected === 'true';
			});
			
		this.player.selectedDice = selected;
	
		return selected;
	}
}

{
	DiceSet
}
