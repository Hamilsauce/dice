const temp = `
	<div class="tableContainer">
		<form class="search" @submit.prevent="">
			Search <input name="query" v-model="searchQuery" />
		</form>
		<div>
			<table>
				<thead>
					<tr>
						<th
							v-for="key in columns"
							@click="sortBy(key)"
							:key="key"
							:class="{ active: sortKey == key }"
						>
							{{ key | capitalize }}
							<span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'"> </span>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="entry in filteredDataSet"
						id="entry.date"
						:key="entry.date"
						@click="selectedRow = entry.date"
						:class="{ hilight: selectedRow == entry.date }"
						@dblclick="rowDoubleClick(entry.date)"
					>
						<td v-for="key in columns" :key="key">
							{{ entry[key] }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>`;

export default {
	template: temp,
	props: {
		heroes: Array,
		columns: Array,
		dataSet: Array,
		dataReady: Boolean
	},
	data: function() {
		let sortOrders = {};
		this.columns.forEach(function(key) {
			sortOrders[key] = 1;
		});
		return {
			sortKey: "",
			sortOrders: sortOrders,
			searchQuery: "",
			selectedRow: ""
		};
	},
	watch: {
		dataSet: function(val, oldVal) {
			if (val !== oldVal) {
				this.dataRready = true;
			}
		}
	},
	computed: {
		newData() {
			console.log("inside new data");
			console.log(this.dataSet.confirmed);
			return this.dataSet;
		},
		filteredDataSet: function() {
			let sortKey = this.sortKey;
			let searchQuery = this.searchQuery && this.searchQuery.toLowerCase();
			let order = this.sortOrders[sortKey] || 1;
			let dataSet = this.dataSet;
			if (searchQuery) {
				dataSet = dataSet.filter(function(row) {
					return Object.keys(row).some(function(key) {
						return (
							String(row[key])
								.toLowerCase()
								.indexOf(searchQuery) > -1
						);
					});
				});
			}
			if (sortKey) {
				dataSet = dataSet.slice().sort(function(a, b) {
					a = a[sortKey];
					b = b[sortKey];
					return (a === b ? 0 : a > b ? 1 : -1) * order;
				});
			}
			return dataSet;
		}
	},
	filters: {
		capitalize: function(str) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		}
	},
	methods: {
		sortBy: function(key) {
			this.sortKey = key;
			this.sortOrders[key] = this.sortOrders[key] * -1;
		},
		rowDoubleClick(rowDate) {
			console.log("dble");
			console.log(rowDate);

			let selectedDate = rowDate.toString();
			this.searchQuery = selectedDate;
		}
	}
};