//*  This is 'Horses' specific, need to move to horses module or add conditional game check
// src: main.js line 87
if (player.rollCount == game.rules.rollLimit) { //! test if last turn, update UI
  e.target.textContent = 'End turn'
  displayMessage('Last roll!', 7000)
}

//* TODO This is 'Horses' specific, need to move to horses module or add conditional game check
// src: Game.js line 97
let count = player.keptDice.length
let value = count >= 1 ? player.keptDice[0].dataset.roll : 0;
player.finalScore = { //* 'Threes': final score should be sum of kept dice, with threes = zero
  keptCount: count,
  keptValue: value
}

//* TODO 'getWinner()' is 'Horses' specific, need to move to horses module or add conditional game check
// src: Game.js line 144
getWinner() {
  const scoreArray = this.players
    .map(player => {
      let score = Object.entries(player.finalScore);
      let nameProp = [
        ['id', player.name]
      ];
      return nameProp.concat(score)
        .reduce((obj, prop) => {
          obj[prop[0]] = prop[1];
          return obj;
        }, {});
    });
  let tie = 0;
  scoreArray.sort((a, b) => {
    if (b.keptCount - a.keptCount == 0) {
      if (b.keptValue - a.keptValue == 0) {
        tie += 1
        return 0;
      } else {
        return b.keptValue - a.keptValue;
      }
    } else {
      return b.keptCount - a.keptCount
    }
  })

  //TODO Fix tie bug - if one player wins and the losers tie, game calls tie betwen the losers
  let tieArray = [];
  if (tie >= 1) {
    tieArray = scoreArray.slice(0, tie + 1)
    let tieString = tieArray.map(pl => {
      return pl.id
    }).join(' & ');
    this.winner = `${tieString} tie!`
  } else {
    this.winner = scoreArray[0];
  }
}