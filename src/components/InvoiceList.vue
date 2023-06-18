<template>
	<div>
		<h1>Invoices</h1>

		<Button label="Create Invoice" @click="createInvoice" />

		<input type="text" placeholder="Search invoice...">
	</div>
</template>

<script>
import Button from '../UI/Button.vue';

export default {
	components: {
		Button,
	},
	methods: {
		createInvoice() {
			this.$router.push({ name: 'CreateInvoice' })
		}
	}
}
</script>

<style lang="scss" scoped></style>