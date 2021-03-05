const toggleNav = () => {
	const nav = document.querySelector('.nav1');
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
	const nav = document.querySelector('.nav1');
	// nav.style.width = '0px';
	nav.classList.toggle('navExpand')

}

document.querySelector('.menu-button')
	.addEventListener('click', e => {
		toggleNav();
	})

document.querySelector('.close-nav')
	.addEventListener('click', e => {
		toggleNav();
		window.navigator.vibrate(1000); // 
	})

document.querySelector('.rules-menu-button')
	.addEventListener('click', e => {
		const rulesModal = document.querySelector('.rules-modal')
		rulesModal.classList.toggle('hide')
		toggleNav();
	})
	
document.querySelector('.new-game-menu-button')
	.addEventListener('click', e => {
		const newGameView = document.querySelector('.new-game-view')
		newGameView.classList.toggle('hide')
		toggleNav();
	})



window.navigator.vibrate(1000); // 