Vue.component('editable-text', {
  data: function() {
    return {
      message: "Change me"
    }
  },
  template: `
	      <div v-for="(el, i) in items" :key="i">
					<p>Message is: {{ message }}</p>
					<p>{{ el.name }} {{ i }}</p>
					<input v-model="message" placeholder="edit me" />
				</div>
		    <div>
			    <p>Message is: {{ message }}</p>
			    <input v-model="message" placeholder="edit me" />
		    </div>`
  })

Vue.component('table-row', {
  props: ['game'],
  data: function() {
    return {
      message: "table row"
    }
  },
  template: `
		<tr class="table-row" data-id="game.id">
			<td class="column1 game-id-field" data-column="1">{{ game.id }}</td>
			<td class="column2 game-name-field" data-column="2">{{ game.name }}</td>
			<td class="column3 game-winner-field" data-column="3">{{ game.winner }}</td>
		</tr>`
})

Vue.component('game-table', {
  components: {},
  props: ['games'],
  data: function() {
    return {
      message: "Change me"
    }
  },
  template: `
		<table class="game-table">
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Winner</th>
				</tr>
			</thead> 
			<tbody>
				<table-row v-for="game in games" :game="game" :key="game.id"></table-row>
			</tbody>
		</table>`
})


var study = new Vue({
  el: "#vue-app",
  data: {
    heading: "Vue.js",
    text: "Happiness makes up in height what it lacks in length.",
    games: [],
    games1: [
      {
        id: 1,
        name: "horses",
        winner: "bob"
			  },
      {
        id: 2,
        name: "horses",
        winner: "sally"
			  },
      {
        id: 3,
        name: "threes",
        winner: "tom"
			  },
      {
        id: 4,
        name: "scc",
        winner: "jake"
			  }
			]


  },
  methods: {
    getGames() {
      const gameString = localStorage.getItem('diceGameHistory')
      this.games = JSON.stringify(gameString)
      console.log(this.games);
    }
  },
  mounted() {
    this.getGames()
  }
});

console.log(study);