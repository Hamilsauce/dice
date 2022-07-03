import {
	EndGameModal
} from './js/EndModal.js';

const listBody = document.querySelector('.player-list-body')

const ranks = [
	{
		name: 'Jake',
		id: '1',
		threesScore: '8 Sixes'
	}
	]

const endModal = new EndGameModal(listBody, ranks, 'horses1', 9);
endModal.createWinnerHeader()
endModal.createGameNameText()
endModal.createGameTimeText()
endModal.createListItems();
document.querySelector('.end-game-modal-dimmer').classList.toggle('hide')
