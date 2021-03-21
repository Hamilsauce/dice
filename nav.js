import {
	setRulesModal
} from './new-game-view.js'

const toggleNav = () => {
	const nav = document.querySelector('.nav');
	// nav.style.width = '250px';
	if (nav.classList.contains('navExpand')) {
		setTimeout(() => {
			nav.classList.toggle('navExpand')
		}, 200)
	} else {
		setTimeout(() => {
			nav.classList.toggle('navExpand')
		}, 200)
	}
}
const closeNav = () => {
	const nav = document.querySelector('.nav');
	// nav.style.width = '0px';
	nav.classList.toggle('navExpand')

}

document.querySelectorAll('.menu-button')
	.forEach(btn => {
		btn.addEventListener('click', e => {
			toggleNav();
		})
	})

document.querySelector('.close-nav')
	.addEventListener('click', e => {
		toggleNav();
		window.navigator.vibrate(1000); //
	})

document.querySelector('.rules-menu-button')
	.addEventListener('click', e => {
			let rulesModal = document.querySelector('.rules-modal')
			setRulesModal();
			rulesModal.style.display = 'grid';
	
			setTimeout(() => {
				rulesModal.classList.remove('hide')
	
			}, 100)
	
		// const rulesModal = document.querySelector('.rules-modal')
		// toggleNav();
		// rulesModal.classList.remove('hide')
	})

document.querySelector('.new-game-menu-button')
	.addEventListener('click', e => {
		const newGameView = document.querySelector('.new-game-view')
		let gameView = document.querySelector('.app')
		toggleNav();
		// let menuView = document.querySelector('.new-game-view')
		setTimeout(() => {
			newGameView.classList.remove('hide');
			gameView.classList.add('hide');


		}, 400)


		// newGameView.classList.remove('hide')
	})