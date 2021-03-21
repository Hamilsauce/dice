const root = document.documentElement
const body = document.querySelector('.table')
const header = document.querySelector('.subtitle')
const swipeLimit = 50

let startX
const endTouch = (e) => {
	const finishingTouch = e.changedTouches[0].clientX
	if (startX < (finishingTouch - swipeLimit)) {
		header.textContent = 'Swiped Right ➡️'
	} else if (startX > (finishingTouch + swipeLimit)) {
		header.textContent = 'Swiped Left ⬅️'
	}
	body.removeEventListener('touchmove', moveTouch)
	body.removeEventListener('touchend', endTouch)
}

const moveTouch = (e) => {
	const progressX = startX - e.touches[0].clientX
	const translation = progressX > 0 ?
		parseInt(-Math.abs(progressX)) :
		parseInt(Math.abs(progressX))
	root.style.setProperty('--translate', translation)
}

const startTouch = (e) => {
	const { touches } = e
	if (touches && touches.length === 1) {
		const touch = touches[0]
		startX = touch.clientX
		root.style.setProperty('--bg', '#e74c3c')
		body.addEventListener('touchmove', moveTouch)
		body.addEventListener('touchend', endTouch)
	}
}

body.addEventListener('touchstart', startTouch)

const addSwipeAction = (el, dir, swipeFunc) => {

}