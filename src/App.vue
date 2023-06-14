<script>
import CreateInvoice from './components/CreateInvoice.vue';
import InvoiceList from './components/InvoiceList/InvoiceList.vue'

export default {
	components: {
		CreateInvoice,
		InvoiceList,
	}
}

</script>

<template>
	<div class="container">
		<!-- <CreateInvoice /> -->
		<InvoiceList />
	</div>
</template>

<style scoped>
.container {
	width: 1280px;
}
</style>
