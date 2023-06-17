<template>
	<table>
		<thead>
			<tr>
				<th>ID</th>
				<th>Recipient/Customer</th>
				<th>Invoice Date</th>
				<th>Invoice Number</th>
				<th>Status</th>
				<th>Line Items</th>
				<th>Total</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>

		<tbody>
			<tr v-for="(item, index) in products" :key="index">
				<td>{{ item.id }}</td>
				<td>
					<input v-if="editingIndex === index" type="text" class="editable"
						v-model="products[editingIndex].name" />
					<span v-else>{{ item.name }}</span>
				</td>
				<td>
					<input v-if="editingIndex === index" type="text" class="editable"
						v-model="products[editingIndex].description" />
					<span v-else>{{ item.description }}</span>
				</td>
				<td>
					<input v-if="editingIndex === index" type="number" class="editable"
						v-model="products[editingIndex].quantity" min="1" />
					<span v-else>{{ item.quantity }}</span>
				</td>
				<td>
					<input v-if="editingIndex === index" type="number" class="editable"
						v-model="products[editingIndex].unitPrice" min="100" />
					<span v-else>{{ item.unitPrice }}</span>
				</td>
				<td>
					<input v-if="editingIndex === index" type="number" class="editable" v-model="products[editingIndex].tax"
						min="0" />
					<span v-else>{{ item.tax }}</span>
				</td>
				<td>{{ (item.unitPrice * item.quantity + (item.unitPrice * item.quantity * item.tax / 100)).toFixed(2)
				}}
				</td>
				<td class="edit-delete">
					<button @click="deleteProduct(index)" :disabled="editingIndex !== null">Delete &#10005;</button>
					<button @click="editProduct(index)">
						{{ editingIndex === index ? 'Save' : 'Edit' }} &nbsp;&#x1F589;
					</button>
				</td>
			</tr>
		</tbody>

		</tbody>
	</table>
</template>

<script>
export default {

}
</script>

<style scoped></style>