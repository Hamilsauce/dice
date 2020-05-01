 let output = Object.entries(roll)
   .map(([die, value]) => {
     let html = `
        <li class="dieItem ${die}Item">
          <label class="itemLabel" for="checkbox${die}">
            <span class="dieId">${die}: </span><span class="dieValue">${value}</span>
          </label>
          <input 
            class="dieCheck"
            type="checkbox" 
            value="${value}"
            data-die="${diceSet}"
            data-die-value="${value}"
            name="checkbox${die}"
          />
        </li>`;
     return html;
   })
   
   // for (var i = 1; i <= diceCount; i++) {
   //   let roll = rollDie(1, 6);
   // rolledDice.push(roll);
   //rolledDice as an array of arrays: rolledDice.push([`die${i}`,roll]);
   }
   
   let rollResults = rolledDice
     .reduce((obj, die, index) => {
       obj[`die${index}`] = die
       return obj;
     }, {})
     
     const renderRoll = dice => {
       const rollDisplay = document.querySelector('.rollDisplay')
     
       let output = dice
         .reduce((acc, curr) => {
           return acc += curr.markup;
         }, '');
     
       rollDisplay.innerHTML = output;
       // disableInvalidChoices();
     
     }