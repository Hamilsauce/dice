const rulesArray = [
	{
		name: 'Horses',
		id: 'horses',
		description: `
			<p>Each player gets three rolls with five to roll the most dice of the highest value.</p>
			<br>
			<p>A player is not required to keep any dice after a roll, but keeping no dice by the end of their turn will result in a forfeiture.</p>
			<br>
			<p> A player can only keep matching dicd. Once a die is kept, the player can only keep dice of same value over their remaining turns</p>
			<br>
			<p>A player's final score can only be beat by another player keeping a set of dice either equal in values and greater in count, or same in count but with higher dice values.</p>
		`
	},
	{
		name: 'Threes Away',
		id: 'threes',
		description: `
			<p>The goal is to roll a number smaller than the other players when the values of all kept dice are summed (with threes being worth zero).</p>
			<br>
			<p>The player is required to keep at least one die per roll, but may keep as many dice as they wish. The maximum number of rolls per a turn is five, minimum one if all dice are kept on the first turn.</p>
			<br>
			<p>Once all dice have been kept, the player's turn is over. A player's final score is the sum of all dice at the end of their turn (with threes being worth zero).</p>
			<br>
		`
	},
	{
		name: 'Ship, Captain, Crew',
		id: 'ship, captain, crew',
		description: `
			<p>Each player gets 3 rolls to roll the most dice of the highest value.</p>
			<br>
			<p>A player is not required to keep any dice after a roll, but keeping no dice will result in a forfeiture</p>
			<br>
			<p>Once a die is kept, the player can only keep dice of same value over their remaining turns</p>
			<br>
			<p>A player's final score can only be beat by another player rolling a set of dice either equal in values and greater in count or same in count but with higher dice values.</p>
		`
	}
]
document.querySelector('.new-game-view').style.backgroundColor = '#BA5B5B'
// document.getElementById('menu-view').style.backgroundColor = '#35B0F1'

const getRuleData = gameSelection => {
	const rulesObject = rulesArray
		.find(r => {
			return r.id.toLowerCase() == gameSelection.toLowerCase();
		})
	return rulesObject
}

const getPlayerNames = () => {
	const nameInputs = document.querySelectorAll('.name-input');
	const pNames = [];

	if (nameInputs.length > 0) {
		nameInputs.forEach(input => {
			let playerName = input.value ? input.value : `Player ${input.dataset.playerNumber}`;
			pNames.push(playerName)
		})
		return pNames
	} else {
		const playerCount = document.querySelector('.player-count-input').value
		for (var i = 1; i <= playerCount; i++) {
			const playerName = `Player ${i}`;
			pNames.push(playerName)
		}
		return pNames
	}
	return pNames
}

const createNameInputs = (playerCount, parentEl) => {
	playerCount = parseInt(playerCount);

	while (parentEl.firstChild) {
		parentEl.removeChild(parentEl.firstChild);
	}

	for (let i = 1; i <= playerCount; ++i) {
		const classAndName = ['name-input', `name-input-${i}`];

		const container = document.createElement('div');
		container.classList.add('name-input-container');

		const nameLabel = document.createElement('label');
		nameLabel.classList.add('name-label');
		nameLabel.setAttribute('for', classAndName[1])
		nameLabel.innerText = `Player ${i}`;

		const nameInput = document.createElement('input');
		nameInput.type = 'text';
		nameInput.setAttribute('name', classAndName[1]);
		nameInput.classList.add(classAndName[0]);
		nameInput.dataset.playerNumber = `${i}`;

		container.appendChild(nameLabel);
		container.appendChild(nameInput);
		parentEl.appendChild(container)
	}
}


const setRulesModal = () => {
	let rulesModal = document.querySelector('.rules-modal')
	let gameSelect = document.querySelector('.game-select')
	let ruleData = getRuleData(gameSelect.value)

	rulesModal.querySelector('.modal-title').innerHTML = ruleData.name
	rulesModal.querySelector('.modal-content').innerHTML = ruleData.description
}

window.onload = e => {
	let rulesModal = document.querySelector('.rules-modal')
	setRulesModal();
}

document.querySelector('.rule-button')
	.addEventListener('click', e => {
		setRulesModal();
		let rulesModal = document.querySelector('.rules-modal')
		rulesModal.classList.toggle('hide')
	})

//Rules modal close
document.querySelector('.rules-modal').querySelector('.close-modal-button')
	.addEventListener('click', e => {
		e.target.parentElement.parentElement.classList.toggle('hide')
	})

document.querySelector('.name-button')
	.addEventListener('click', e => {
		let nameModal = document.querySelector('.name-modal');
		let playerSelect = document.querySelector('.player-count-input');
		const modalContent = nameModal.querySelector('.modal-content');
		let count = playerSelect.value;
		console.log(playerSelect.value);
		nameModal.classList.toggle('hide');
		console.log('count');
		createNameInputs(count, modalContent)
	})

//name modal close
document.querySelector('.name-modal').querySelector('.close-modal-button')
	.addEventListener('click', e => {
		const namesArray = getPlayerNames()
		console.log(namesArray);
		e.target.parentElement.parentElement.classList.toggle('hide')
	})

document.querySelector('.color-toggle')
	.addEventListener('click', e => {
		const colors = ['rgb(186, 91, 91)', 'rgb(53, 176, 241)', 'rgb(142, 191, 64)']
		// const newGameView = document.querySelector('.menu-view')
		const newGameView = document.querySelector('.new-game-view')
		let currentBackground = newGameView.style.backgroundColor
		let colorIndex = colors.indexOf(currentBackground)
		let nextColorIndex = colorIndex >= (colors.length - 1) ? 0 : colorIndex + 1;
		newGameView.style.backgroundColor = colors[nextColorIndex]
	})



const setBackgroundColor = (el, colorString) => {
	el.style.backgroundColor = colorString
}