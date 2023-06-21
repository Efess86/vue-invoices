<template>
	<table class="table">
		<thead>
			<tr>
				<th v-for="header in tableHeaders" :key="header" class="table-header">{{ header }}</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="item in tableData" :key="item.id" class="table-row">
				<td v-for="header in tableHeaders" :key="header" class="table-cell">{{ item[header] }}</td>
			</tr>
		</tbody>
	</table>
</template>
  
<script>
export default {
	name: "Table",
	props: {
		tableHeaders: {
			type: Array,
			required: true,
		},
		tableData: {
			type: Array,
			required: true,
		},
	},
};
</script>
  

<style scoped>
.table {
	width: 100%;
	border-collapse: collapse;
	margin: 25px 0 0 0;
}

.table-header,
.table-cell {
	padding: 8px;
	text-align: left;
	border-bottom: 1px solid rgb(189, 189, 189);
}

.table-header {
	background-color: #62b5d6;
	font-weight: bold;
}

.table-row:nth-child(even) {
	background-color: #444444;
}
</style>