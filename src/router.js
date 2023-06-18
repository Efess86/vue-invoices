import { createRouter, createWebHistory } from 'vue-router';
import CreateInvoice from './components/CreateInvoice.vue';
import InvoiceList from './components/InvoiceList.vue';

const routes = [
	{
		path: '/',
		name: 'InvoiceList',
		component: InvoiceList
	},
	{
		path: '/create-invoice',
		name: 'CreateInvoice',
		component: CreateInvoice
	},

]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
}
)

export default router;