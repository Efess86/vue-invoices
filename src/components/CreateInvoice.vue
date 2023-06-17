<template>
	<div>
		<h2>BILL TO:</h2>
		<form @submit.prevent="createInvoice" class="invoice">
			<div class="add-invoice">

				<label for="companyName">
					COMPANY NAME
					<input type="text" v-model="invoice.companyName" id="companyName" placeholder="Enter company name"
						required>
				</label>

				<label for="address">
					ADDRESS
					<input type="text" v-model="invoice.address" id="address" placeholder="Enter address" required>
				</label>

				<label for="city">
					CITY
					<input type="text" v-model="invoice.city" id="city" placeholder="Enter city" required>
				</label>

				<label for="country">
					COUNTRY
					<input type="text" v-model="invoice.country" id="country" placeholder="Enter country" required>
				</label>

				<label for="zip">
					ZIP CODE
					<input type="number" v-model="invoice.zip" id="zip" required>
				</label>
			</div>
			<div class="add-invoice">
				<label for="invoiceNumber">INVOICE #</label>
				<input type="text" v-model="invoice.number" id="invoiceNumber" required>
				<label for="invoiceDate">DATE</label>
				<input type="date" v-model="invoice.date" id="invoiceDate" required>
				<label for="invoiceDueDate">INVOICE DUE DATE</label>
				<input type="date" v-model="invoice.dueDate" id="invoiceDueDate" required>

				<button type="submit">&#x274F; Create Invoice</button>
			</div>
		</form>

		<hr>

		<form @submit.prevent="addProduct" v-if="invoice.id">
			<div class=" add-products">
				<label :for="itemId">
					id:
					<input type="text" v-model="product.id" id="itemId" placeholder="ID" required>
					<span class="error" :class="{ visible: idExists }">Error! This id is already exists. Please enter
						another id.</span>
				</label>
				<label :for="itemName">
					Product name:
					<input type="text" v-model="product.name" id="itemName" placeholder="Name" required>
				</label>
				<label :for="itemPrice">
					Product Price €:
					<input type="number" v-model="product.unitPrice" id="itemPrice" step="0.01" min="100" required>
				</label>
				<label :for="itemTax">
					Tax %:
					<input type="number" v-model="product.tax" id="itemTax" step="0.01" min="0" required>
				</label>
				<label :for="itemDescription">
					Product description
					<input type="text" v-model="product.description" id="itemDescription" placeholder="Description"
						required>
				</label>
			</div>

			<button type="submit">+ Add Product</button>

		</form>
		<hr>
		<table>
			<thead>
				<tr>
					<th>id</th>
					<th>Name</th>
					<th>Description</th>
					<th>Quantity</th>
					<th>Product Price €</th>
					<th>Tax %</th>
					<th>Total Price €</th>
					<th>Edit Entry</th>
				</tr>
			</thead>
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
						<input v-if="editingIndex === index" type="number" class="editable"
							v-model="products[editingIndex].tax" min="0" />
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
		</table>

		<div>
			<h2>Total: {{ total.toFixed(2) }}€</h2>
		</div>
	</div>
</template>
  
<script>
export default {
	data() {
		return {
			idExists: false,
			product: {
				id: '',
				name: '',
				description: '',
				unitPrice: 0,
				tax: 24,
			},
			invoice: {
				id: '',
				companyName: '',
				address: '',
				city: '',
				country: '',
				zip: 0,
				number: '',
				date: '',
				dueDate: '',
			},
			products: JSON.parse(localStorage.getItem('products')) || [],
			editingIndex: null,
		};
	},

	computed: {
		total() {
			return this.products.reduce((sum, product) => {
				return sum + product.unitPrice * product.quantity + (product.unitPrice * product.quantity * product.tax / 100);
			}, 0)
		},
	},

	methods: {

		createInvoice() {
			this.invoice.id = this.invoice.number;
			this.invoice = {
				id: '',
				companyName: '',
				address: '',
				city: '',
				country: '',
				zip: 0,
				lineItems: [],
				number: '',
				date: '',
				dueDate: ''
			};
		},

		syncStorage() {
			localStorage.setItem('products', JSON.stringify(this.products));
		},

		createEmptyProduct() {
			this.product = {
				id: '',
				name: '',
				description: '',
				unitPrice: 0,
				tax: this.tax,
			};
		},


		addProduct() {
			const exists = this.products.find(p => p.id === this.product.id);
			if (exists) {
				this.idExists = true;
				this.createEmptyProduct();
				setTimeout(() => {
					this.idExists = false;
				}, 4000);
				return;
			}

			const newProduct = { ...this.product, quantity: 1 };
			this.products.unshift(newProduct);
			this.syncStorage();
			this.createEmptyProduct();
			this.idExists = false;
		},

		deleteProduct(index) {
			this.products.splice(index, 1);
			this.syncStorage();
		},

		editProduct(index) {
			if (this.editingIndex === index) {
				this.saveProduct();
			} else {
				this.editingIndex = index;
			}
		},

		saveProduct() {
			this.editingIndex = null;
			this.syncStorage();
		},

	},
};
</script>
  
  
<style scoped>
h2 {
	text-align: left;
}

.invoice {
	display: flex;
	gap: 30px;
}

.error {
	visibility: hidden;
	color: red;
}

.error.visible {
	visibility: visible;
}

.add-products {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin: 0 0 25px 0;
}

.add-invoice {
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	flex: 1 1 auto;
}

.add-products input,
.add-invoice input {
	padding: 10px 35px 10px 10px;
	margin: 5px 0 0 0;
}

.add-products label,
.add-invoice label {
	display: flex;
	flex-direction: column;
	text-align: left;
	margin: 10px 0 0 0;
}

.add-products label:last-child {
	margin: 10px 0 0 0;
	flex-grow: 1;
	width: 100%;
	align-items: normal;
	text-align: left;
}

.add-invoice button {
	margin: 35px 0 0 0;
}

.editable {
	width: 90%;
	height: 40px;
	font-size: 18px;
	border: 2px solid rgb(255, 255, 255);
}

.editable:focus {
	background-color: #4CAF50;
}

.edit-delete {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

hr {
	margin: 30px 0;
}

table {
	width: 100%;
	border-collapse: collapse;
	margin-bottom: 20px;
	table-layout: fixed;
}

th,
td {
	border: 1px solid #ddd;
	padding: 8px;
	color: rgb(10, 10, 10);
	font-size: 18px;
	font-family: Arial, Helvetica, sans-serif;
	font-weight: 500;
	word-wrap: break-word;
}

th {
	background-color: #4CAF50;
}

tr {
	background-color: #658486;
}

tr:nth-child(even) {
	background-color: #8ab3b6;
}
</style>