const rulesArray = [
	{
		name: 'Horses',
		id: 'horses',
		description: `
			<p>Each player gets 3 rolls to roll the most dice of the highest value.</p>
			<br>
			<p>A player is not required to keep any dice after a roll, but keeping no dice will result in a forfeiture</p>
			<br>
			<p>Once a die is kept, the player can only keep dice of same value over their remaining turns</p>
			<br>
			<p>A player's final score can only be beat by another player rolling a set of dice either greater in count or same in count but with higher dice values.</p>
		`
	},
	{
		name: 'Threes Away',
		id: 'threes',
		description: `
			<p>Each player gets 3 rolls to roll the most dice of the highest value.</p>
			<br>
			<p>A player is not required to keep any dice after a roll, but keeping no dice will result in a forfeiture</p>
			<br>
			<p>Once a die is kept, the player can only keep dice of same value over their remaining turns</p>
			<br>
			<p>A player's final score can only be beat by another player rolling a set of dice either greater in count or same in count but with higher dice values.</p>
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
			<p>A player's final score can only be beat by another player rolling a set of dice either greater in count or same in count but with higher dice values.</p>
		`
	}
]

const getRuleData = gameSelection => {
	const rulesObject = rulesArray
		.find(r => {
			return r.id.toLowerCase() == gameSelection.toLowerCase();
		})
	console.log(rulesObject)
	return rulesObject
}

document.querySelector('.rule-button')
	.addEventListener('click', e => {
		let rulesModal = document.querySelector('.rules-modal')
		let gameSelect = document.querySelector('.game-select')
		let ruleData = getRuleData(gameSelect.value)

		rulesModal.querySelector('.modal-title').innerHTML = ruleData.name
		rulesModal.querySelector('.modal-content').innerHTML = ruleData.description

		rulesModal.classList.toggle('hide')
	})

document.querySelector('.close-modal-button')
	.addEventListener('click', e => {
		let rulesModal = document.querySelector('.rules-modal')
		rulesModal.classList.toggle('hide')
	})
	
document.querySelector('.modal-start-button')
	.addEventListener('click', e => {
		let menuView = document.querySelector('.new-game-view')
		let gameView = document.querySelector('.app')
		setTimeout(() => {
			menuView.classList.add('hide');
			gameView.classList.remove('hide');
			
		}, 200)

	})