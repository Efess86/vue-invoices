<template>
	<div>
		<h1>CreateInvoice</h1>
		<Button label="Back to invoices list" @click="goToInvoices" />
	</div>
</template>

<script>
import Button from '../UI/Button.vue';
export default {
	components: {
		Button,
	},
	methods: {
		goToInvoices() {
			this.$router.push({ name: 'InvoiceList' })
		}
	}
}
</script>

<style scoped></style>