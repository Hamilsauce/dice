export class Die {
	constructor(id, diceSet) {
		this.rollValue = null;
		this.id = id;
		this.name = this.createNameFromId();
		this.dieValueClass = `die${this.id}Value`;
		this.selected = false;
		this.diceSet = diceSet;
		this.kept = false;
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

	toggleRollClasses() {
		this.dieElement.classList.toggle("odd-roll");
		this.dieElement.classList.toggle("even-roll");
	}

	toggleDieSelect() {
		const die = this.dieElement
		const player = this.diceSet.player
		let keptDice = player.keptDice;
		let selectedDice = this.diceSet.getSelectedDice();

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

	newTemplate() {
		const dieList = document.createElement('ol');
		const oddEven = this.id % 2 == 0 ? 'even-roll' : 'odd-roll';
		dieList.classList.add('die-list', oddEven);
		dieList.setAttribute('id', `die-${this.id}`);
		dieList.dataset.roll = '1';
		dieList.dataset.selected = 'false';
		dieList.dataset.kept = 'false';

		let sideCount = 6;
		for (let i = 1; i <= sideCount; i++) { //create a side of the die until 6 is reached
			const dieSide = document.createElement('li');
			dieSide.classList.add('die-item');
			dieSide.dataset.side = i;

			for (let j = 1; j <= i; j++) { //create one dot up to the die side number/index
				const dot = document.createElement('span');
				dot.classList.add('dot');
				dieSide.appendChild(dot);
			}
			dieList.appendChild(dieSide)
		}
		this.dieTemplate = dieList;
	}

	getRollSum() {
		let die = this.dieElement
		let player = this.diceSet.player
		let keptDice = player.keptDice;
		let selectedDice = this.diceSet.getSelectedDice();

		let sumKeptRolls = player.keptDice
			.reduce((sum, die) => {
				let value = die.dataset.roll
				return sum + parseInt(value)
			}, 0);

		let sumSelectedRolls = selectedDice
			.reduce((sum, die) => {
				let value = die.dataset.roll
				return sum + parseInt(value)
			}, 0);

		let sumRoll = sumKeptRolls + sumSelectedRolls
		return sumRoll
	}

	registerDiceListener(diceSet, player) {
		this.dieElement.addEventListener('click', e => {
			const die = this.dieElement
			let keptDice = player.keptDice;
			let selectedDice = this.diceSet.getSelectedDice();
			const ruleSet = this.diceSet.player.game.rules;

			if (ruleSet.name == 'horses') {
				const keptCheck = keptDice.every(d => { //! checks if clicked die has been selected/kept
					return d.dataset.roll == die.dataset.roll;
				})

				const selectedCheck = selectedDice.every(d => { //! checks if clicked die has been selected/kept
					return d.dataset.roll == die.dataset.roll;
				})

				if (keptCheck === true && selectedCheck === true && player.rollCount !== 0) { //! if die isn't already selected/kept AND player has rolled
					this.toggleDieSelect();
				}
			} else if (ruleSet.name == 'threes') {
				if (player.rollCount != 0) { //! if die isn't already selected/kept AND player has rolled
					this.toggleDieSelect()
				}
			} else if (ruleSet.name == 'ship, captain, crew') {
				const rollCheck = this.getRollSum() - 15;
				if (rollCheck >= 0) { //! if die isn't already selected/kept AND player has rolled
					this.toggleDieSelect();
				} else if (rollCheck == parseInt(-4) && die.dataset.roll == 4) {
					this.toggleDieSelect()
				} else if (rollCheck == parseInt(-9) && die.dataset.roll == 5) {
					this.toggleDieSelect()
				} else if (rollCheck == -15 && die.dataset.roll == 6) {
					this.toggleDieSelect()
				} else {

				}
			}
			this.diceSet.getSelectedDice()
		})
	}
}

{
	Die
}