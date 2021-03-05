const rulesArray = [
	{
		name: 'Horses',
		id: 'horses',
		description: 'Roll real good'
	},
	{
		name: 'Threes Away',
		id: 'threes',
		description: 'Roll real good 2'
	},
	{
		name: 'Ship, Captain, Crew',
		id: 'ship, captain, crew',
		description: 'Roll real good'
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
		menuView.classList.toggle('hide')
	})