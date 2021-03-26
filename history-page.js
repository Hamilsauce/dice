import {
	store,
	storeFactory
} from './js/store.js'




storeFactory()
store.getLocalStorage('diceGameHistory')
store.reIndexGames()

window.onscroll = function() {
	stickyHeader()
};


const headerRow = document.querySelector('.sticky-container')
const topButton = document.querySelector('.top-button')
let headerPos = headerRow.offsetTop;

const stickyHeader = () => {
	if (window.pageYOffset > headerPos) {
		headerRow.classList.add("sticky");
		topButton.classList.remove("hide");

	} else {
		headerRow.classList.remove("sticky");
		topButton.classList.add("hide");
	}
}

const getFormattedDate = dateString => {
	return dayjs(dateString).format("MM/DD/YYYY");
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

const buildTable = (games) => {
	// const games = store.state.gameHistory
	const body = document.querySelector('.table-body')
	while (body.firstChild) {
		body.removeChild(body.firstChild)
	}

	games.forEach(game => {
		const row = buildRow(game)
		body.appendChild(row)
	})
}
buildTable(store.state.gameHistory);

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

				if (field.parentElement.id == rowNum && field.dataset.column == colNum) {
					field.classList.add('intersect-field')
				} else {
					field.classList.remove('intersect-field')
				}
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

//filter button click
document.querySelector('.filter-button')
	.addEventListener('click', e => {
		const paramSelect = document.querySelector('.filter-param-select')
		const filterInput = document.querySelector('.filter-input')
		let paramValue = paramSelect.value
	
		const hist = store.state.gameHistory;
		if (!filterInput.value) {
			buildTable(hist)
		} else {
			const filteredHist = hist
				.filter(game => {
					if (paramValue == 'winner') {
						if (typeof game.winner == 'string') {
							return game.winner == filterInput.value
						} else {
							let gameWinnerName = game.winner.id || game.winner.name
							return gameWinnerName == filterInput.value
						}
					} else if (paramValue == 'gameDate') {
						let gDate = getFormattedDate(game.gameDate)
						return gDate == filterInput.value
					} else {
						return game[paramValue].toUpperCase() == filterInput.value.toUpperCase()
					}
				})
			buildTable(filteredHist)
		}
	})

document.querySelector('.top-button')
	.addEventListener('click', e => {
		let currHeaderPos = headerRow.offsetTop
		console.log(currHeaderPos);
		while (currHeaderPos > 0) {
			currHeaderPos = currHeaderPos - 1
			document.documentElement.scrollTop = currHeaderPos;
			document.body.scrollTop = currHeaderPos;

		}
	})

// const toggleTopButton = () => {

// }