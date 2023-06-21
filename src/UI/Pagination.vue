<template>
	<nav class="pagination">
		<ul>
			<li :class="{ disabled: currentPage === 1 }">
				<a @click="goToPage(1)">First</a>
			</li>
			<li :class="{ disabled: currentPage === 1 }">
				<a @click="goToPage(currentPage - 1)">Previous</a>
			</li>
			<li v-for="page in pages" :key="page" :class="{ active: page === currentPage }">
				<a @click="goToPage(page)">{{ page }}</a>
			</li>
			<li :class="{ disabled: currentPage === totalPages }">
				<a @click="goToPage(currentPage + 1)">Next</a>
			</li>
			<li :class="{ disabled: currentPage === totalPages }">
				<a @click="goToPage(totalPages)">Last</a>
			</li>
		</ul>
	</nav>
</template>
  
<script>
export default {
	name: "Pagination",
	props: {
		currentPage: {
			type: Number,
			required: true,
		},
		totalPages: {
			type: Number,
			required: true,
		},
	},
	computed: {
		pages() {
			const pagesArray = [];
			for (let i = 1; i <= this.totalPages; i++) {
				pagesArray.push(i);
			}
			return pagesArray;
		},
	},
	methods: {
		goToPage(page) {
			if (page === this.currentPage) {
				return; // Ничего не делаем, если выбрана текущая страница
			}
			this.$emit("page-change", page); // Излучаем событие изменения страницы
		},
	},
};
</script>
  
<style scoped>
.pagination {
	margin-top: 16px;
}

.pagination ul {
	display: flex;
	list-style-type: none;
	padding: 0;
}

.pagination li {
	margin-right: 8px;
}

.pagination a {
	display: block;
	padding: 8px 12px;
	text-decoration: none;
	border: 1px solid #ddd;
	border-radius: 4px;
	color: rgb(139, 139, 139);
	cursor: pointer;
	user-select: none;
}

.pagination a:hover {
	background-color: #f5f5f5;
}

.pagination .disabled a {
	cursor: not-allowed;
	opacity: 0.5;
}

.pagination .active a {
	background-color: #333;
	color: #fff;
}
</style>
  