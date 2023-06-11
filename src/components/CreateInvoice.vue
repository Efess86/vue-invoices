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
				</tr>
			</thead>
			<tr v-for="(item, index) in products" :key="index">
				<td>{{ item.id }}</td>
				<td>{{ item.name }}</td>
				<td class="product-description">{{ item.description }} </td>
				<td>
					<button @click="decreaseQuantity(index)">-</button>
					{{ item.quantity }}
					<button @click="increaseQuantity(index)">+</button>
				</td>
				<td>{{ item.unitPrice }}€</td>
				<td>{{ item.tax }}%</td>
				<td>{{ (item.unitPrice * item.quantity + (item.unitPrice * item.quantity * item.tax / 100)).toFixed(2) }}
				</td>
			</tr>
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
			products: JSON.parse(localStorage.getItem('products')) || [],
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
		addProduct() {

			const exists = this.products.find(p => p.id === this.product.id);
			if (exists) {
				this.idExists = true;
				this.product = {
					id: '',
					name: '',
					description: '',
					unitPrice: 0,
					tax: 24,
				}; setTimeout(() => {
					this.idExists = false;
				}, 4000);
				return;
			}

			const newProduct = { ...this.product, quantity: 1 };
			this.products.push(newProduct);
			localStorage.setItem('products', JSON.stringify(this.products));

			this.product = {
				id: '',
				name: '',
				description: '',
				unitPrice: 0,
				tax: 24,
			};
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
		syncStorage() {
			localStorage.setItem('products', JSON.stringify(this.products));
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

.product-description {
	width: 150px;
	word-wrap: break-word;
}

hr {
	margin: 30px 0;
}

table {
	width: 100%;
	border-collapse: collapse;
	margin-bottom: 20px;
}

th,
td {
	border: 1px solid #ddd;
	padding: 8px;
	color: rgb(10, 10, 10);
	font-size: 18px;
	font-family: Arial, Helvetica, sans-serif;
	font-weight: 500;
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