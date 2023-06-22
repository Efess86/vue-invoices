<template>
	<div>
		<h1>Invoices</h1>

		<div><Button label="Create Invoice" @click="createInvoice" /></div>

		<div><input type="text" placeholder="Search invoice..."></div>
	</div>

	<Table :tableHeaders="tableHeaders" :tableData="tableData" />

	<Pagination :currentPage="currentPage" :totalPages="totalPages" @page-change="handlePageChange" />
</template>

<script>
import Button from '../UI/Button.vue';
import Table from '../UI/Table.vue';
import Pagination from '../UI/Pagination.vue';

export default {
	components: {
		Button,
		Table,
		Pagination,
	},

	data() {
		return {
			tableHeaders: ['id', 'Recipient/Customer', 'Invoice Date', 'Invoice Number', 'Status', 'Line Items', 'Total'],
			tableData: [
				{ 'id': 'INV-0001', 'Recipient/Customer': 'Microsoft', 'Invoice Date': '11-02-2023', 'Invoice Number': '5123', 'Status': 'Paid', 'Line Items': [], 'Total': 12890 },
				{ 'id': 'INV-1431', 'Recipient/Customer': 'Dell', 'Invoice Date': '15-06-2021', 'Invoice Number': '5423', 'Status': 'Sent, not Paid', 'Line Items': [], 'Total': 9200 },
				{ 'id': 'INV-5121', 'Recipient/Customer': 'Nike', 'Invoice Date': '09-10-2012', 'Invoice Number': '1163', 'Status': 'Unsent', 'Line Items': [], 'Total': 2200 },
				{ 'id': 'INV-5531', 'Recipient/Customer': 'Jaguar', 'Invoice Date': '24-05-2017', 'Invoice Number': '8123', 'Status': 'Paid', 'Line Items': [], 'Total': 4550 },
			],
			currentPage: 1,
			totalPages: 10,
		}
	},
	methods: {
		createInvoice() {
			this.$router.push({ name: 'CreateInvoice' })
		},
		handlePageChange(page) {
			// Обработка изменения страницы
			// Здесь вы можете обновить данные на основе выбранной страницы
			// Например, сделать запрос к API для загрузки данных этой страницы
			this.currentPage = page;
		},
	}
}
</script>

<style scoped></style>