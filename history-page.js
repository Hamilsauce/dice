import {
	store,
	storeFactory
} from './js/store.js'

storeFactory()
store.getLocalStorage('diceGameHistory')
store.reIndexGames()
const firstGame = store.state.gameHistory[[0]]

const gameDate = new Date(firstGame.gameDate)

const getFormattedDate = dateString => {
	const day = new Date(dateString).getDate()
	const mo = new Date(dateString).getMonth() + 1
	const yr = new Date(dateString).getFullYear();
	const formattedDate = `${mo}/${day}/${yr}`;

	return formattedDate;
}

const buildRow = game => {
	const row = document.createElement('tr')
	row.classList.add('table-row');
	row.dataset.id = game.id

	const dateField = document.createElement('td')
	dateField.classList.add('table-field');
	dateField.dataset.id = game.id;

	dateField.dataset.column = 1;
	dateField.innerText = getFormattedDate(game.gameDate)
	row.appendChild(dateField)

	const nameField = document.createElement('td')
	nameField.classList.add('table-field');
	nameField.dataset.column = 2;
	nameField.dataset.id = game.id;

	nameField.innerText = game.gameName
	row.appendChild(nameField)

	const winnerField = document.createElement('td')
	winnerField.classList.add('table-field');
	winnerField.dataset.column = 3;
	winnerField.dataset.id = game.id;
	
	if (typeof game.winner == 'string') {
		winnerField.innerText = game.winner
		row.appendChild(winnerField)

	} else {
		// if (game.winner.name) {
		winnerField.innerText = game.winner.name ? game.winner.name : game.winner.id
		row.appendChild(winnerField)

		// } else {

		// }
	}

	return row

}

const buildTable = () => {
	const games = store.state.gameHistory
	console.log(store.state.gameHistory);
	const body = document.querySelector('.table-body')
	console.log();
	games.forEach(game => {
		const row = buildRow(game)
		body.appendChild(row)
	})

}
console.log(store.state.gameHistory);
buildTable();

console.log(getFormattedDate(firstGame.gameDate));

document.querySelectorAll('.table-header')
	.forEach(head => {
		head.addEventListener('click', e => {
			const col = e.target.dataset.column;

			const fields = document.querySelectorAll('.table-field')
			fields.forEach(field => {
				if (field.dataset.column == col) {
					field.classList.toggle('col-selected')
				} else {
					field.classList.remove('col-selected')

				}

			})


		})
	})
document.querySelectorAll('.table-field')
	.forEach(field => {
		field.addEventListener('click', e => {
			const id = e.target.parentElement.dataset.id;

			const fields = document.querySelectorAll('.table-field')
			fields.forEach(field => {
				if (field.dataset.id == id) {
					field.classList.toggle('row-selected')
				} else {
					field.classList.remove('row-selected')

				}

			})


		})
	})