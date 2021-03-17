import {
	store,
	storeFactory
} from './js/store.js'

storeFactory()
store.getLocalStorage('diceGameHistory')
store.reIndexGames()

// const firstGame = store.state.gameHistory[[0]]

// const gameDate = new Date(firstGame.gameDate)
const headerRow = document.querySelector('.sticky-container')
console.log(headerRow);
const headerPos = headerRow.offsetTop;

const stickyHeader = () => {
	console.log(headerPos);
	if (window.pageYOffset > headerPos) {
		headerRow.classList.add("sticky");
	} else {
		headerRow.classList.remove("sticky");
	}
}


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
		winnerField.innerText = game.winner.name ? game.winner.name : game.winner.id
		row.appendChild(winnerField)
	}
	return row
}

const buildTable = () => {
	const games = store.state.gameHistory
	const body = document.querySelector('.table-body')
	games.forEach(game => {
		const row = buildRow(game)
		body.appendChild(row)
	})
}
buildTable();

let colNum = null;
let rowNum = null;

//Hilight col when header clicked
document.querySelectorAll('.table-header')
	.forEach(head => {
		head.addEventListener('click', e => {
			const col = e.target.dataset.column;
			colNum = col;
			const fields = document.querySelectorAll('.table-field')

			fields.forEach(field => {
				if (field.dataset.column == col) {
					field.classList.toggle('col-selected')
				} else {
					field.classList.remove('col-selected')
				}
					// console.log(rowNum);
					// console.log(field.parentElement.id);

				if (field.parentElement.id == rowNum && field.dataset.column == colNum) {
					field.classList.add('intersect-field')
				} else {
					field.classList.remove('intersect-field')
				}
				// console.log(colNum);
				// console.log(rowNum);
			})
		})
	})

//highlight row when row cell clicked
document.querySelectorAll('.table-field')
	.forEach(field => {
		field.addEventListener('click', e => {
			const id = e.target.parentElement.dataset.id;
			const rowNum = id
			const fields = document.querySelectorAll('.table-field')

			fields.forEach(field => {
				if (field.dataset.id == id) {
					field.classList.toggle('row-selected')
				} else {
					field.classList.remove('row-selected')
				}
				if (field.dataset.id == rowNum && field.dataset.column == colNum) {
					field.classList.add('intersect-field')
				} else {
					field.classList.remove('intersect-field')
				}
			})
		})
	})
	
	document.querySelector('.top-button')
		.addEventListener('click', e => {
		console.log('clixk');
			document.documentElement.scrollTop = 0;
			document.body.scrollTop = 0;
			// window.pageYOffset = `0px`;
	})
	

window.onscroll = function() { stickyHeader() };