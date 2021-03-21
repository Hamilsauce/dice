import {
	handleRollAction
} from '../main.js';
import {
	game
} from './Game.js';

const diceTable = document.querySelector('.table')
const header = document.querySelector('.subtitle')

let startY;
const endTouch = (e) => {
	const swipeMin = Math.round(parseInt(getComputedStyle(diceTable).height.replace('px', '')) * 0.36)
	const finishingTouch = e.changedTouches[0].clientY

	if (startY < (finishingTouch - swipeMin)) {
		handleRollAction(game)
	} else if (startY > (finishingTouch + swipeMin)) {}

	diceTable.querySelectorAll('.die-item').forEach(die => {
		die.style.boxShadow = `0px 0px 10px 0px rgba(220, 220, 200, 0.47)`;
		shadowLength = 10;
	})
	diceTable.removeEventListener('touchmove', moveTouch)
	diceTable.removeEventListener('touchend', endTouch)
}

let shadowLength = 10;

const moveTouch = (e) => {
	const progressY = startY - e.touches[0].clientY
	const translation = progressY > 0 ?
		parseInt(-Math.abs(progressY)) :
		parseInt(Math.abs(progressY))

	diceTable.querySelectorAll('.die-item').forEach(die => {
		die.style.boxShadow = `0px ${shadowLength - 8}px ${shadowLength}px 0px rgba(255, 255, 255, 0.7)`
	})
	shadowLength = shadowLength + 1
}

const startTouch = (e) => {
	const { touches } = e
	if (touches && touches.length === 1) {
		const touch = touches[0]
		startY = touch.clientY
		diceTable.querySelectorAll('.die-item').forEach(die => {
			die.style.boxShadow = `0px px ${5}px 0px rgba(255, 255, 255, 0.47)`
		})
		diceTable.addEventListener('touchmove', moveTouch)
		diceTable.addEventListener('touchend', endTouch)
	}
}

diceTable.addEventListener('touchstart', startTouch)

const addSwipeAction = (el, dir, swipeFunc) => {

}