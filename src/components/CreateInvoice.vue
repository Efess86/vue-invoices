<template>
	<div>
		<form @submit.prevent="addProduct">

			<div class="add-products">
				<label :for="itemId">
					id:
					<input type="number" v-model="product.id" id="itemId" placeholder="ID" required>
					<span class="error" :class="{ visible: idExists }">Error! This id is already exists. Please enter
						another id.</span>
				</label>
				<label :for="itemName">
					Product name:
					<input type="text" v-model="product.name" id="itemName" placeholder="Name" required>
				</label>
				<label :for="itemPrice">
					Product Price €:
					<input type="number" v-model="product.unitPrice" id="itemPrice" step="0.01" required>
				</label>
				<label :for="itemTax">
					Tax %:
					<input type="number" v-model="product.tax" id="itemTax" step="0.01" required>
				</label>
				<label :for="itemDescription">
					Product description
					<input type="text" v-model="product.description" id="itemDescription" placeholder="Description"
						required>
				</label>
			</div>

			<button type="submit">Add Product</button>

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
							v-model="products[editingIndex].quantity" />
						<span v-else>{{ item.quantity }}</span>
					</td>
					<td>
						<input v-if="editingIndex === index" type="number" class="editable"
							v-model="products[editingIndex].unitPrice" />
						<span v-else>{{ item.unitPrice }}</span>
					</td>
					<td>
						<input v-if="editingIndex === index" type="number" class="editable"
							v-model="products[editingIndex].tax" />
						<span v-else>{{ item.tax }}</span>
					</td>
					<td>{{ (item.unitPrice * item.quantity + (item.unitPrice * item.quantity * item.tax / 100)).toFixed(2)
					}}
					</td>
					<td class="edit-delete">
						<button @click="deleteProduct(index)" :disabled="editingIndex !== null">Delete</button>
						<button @click="editProduct(index)">
							{{ editingIndex === index ? 'Save' : 'Edit' }}
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
			products: JSON.parse(localStorage.getItem('products')) || [
				{ id: '1', name: 'Web Design', description: 'Design of a custom website', unitPrice: 2000, tax: 14, quantity: 1 },
				{ id: '2', name: 'SEO Optimization', description: 'Optimization of website for search engines', unitPrice: 1500, tax: 12, quantity: 3 },
				{ id: '3', name: 'Content Creation', description: 'Creation of text and visual content', unitPrice: 1000, tax: 24, quantity: 1 },
				{ id: '4', name: 'Social Media Marketing', description: 'Management of social media channels and campaigns', unitPrice: 1200, tax: 20, quantity: 8 },
				{ id: '5', name: 'Email Marketing', description: 'Creation and management of email marketing campaigns', unitPrice: 800, tax: 0, quantity: 14 },
				{ id: '6', name: 'Logo Design', description: 'Design of a custom logo', unitPrice: 500, tax: 20, quantity: 1 },
				{ id: '7', name: 'Brand Consulting', description: 'Consulting services for brand development', unitPrice: 1500, tax: 4, quantity: 5 },
				{ id: '8', name: 'Market Research', description: 'In-depth market research and analysis', unitPrice: 1300, tax: 15, quantity: 1 },
				{ id: '9', name: 'Public Relations', description: 'PR services including press releases and media outreach', unitPrice: 1400, tax: 20, quantity: 2 },
				{ id: '10', name: 'Advertising Campaigns', description: 'Creation and management of advertising campaigns', unitPrice: 2000, tax: 24, quantity: 21 }
			],
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
		createEmptyProduct() {
			this.product = {
				id: '',
				name: '',
				description: '',
				unitPrice: 0,
				tax: this.tax,
			};
		},

		syncStorage() {
			localStorage.setItem('products', JSON.stringify(this.products));
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

		increaseQuantity(index) {
			this.products[index].quantity++;
			this.syncStorage();
		},

		decreaseQuantity(index) {
			if (this.products[index].quantity > 1) {
				this.products[index].quantity--;
				this.syncStorage();
			}
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

.add-products input {
	padding: 10px 35px 10px 10px;
	margin: 5px 0 0 0;
}

.add-products label {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin: 10px 0 0 0;
}

.add-products label:last-child {
	margin: 10px 0 0 0;
	flex-grow: 1;
	width: 100%;
	align-items: normal;
	text-align: left;
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