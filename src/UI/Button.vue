<template>
	<button class="button" @click="onClick">{{ label }}</button>
</template>
  
<script>
export default {
	name: "Button",
	props: {
		label: {
			type: String,
			default: 'Button'
		},
		onClick: {
			type: Function,
			default: () => { }
		},
	}
}
</script>
  
<style scoped>
.button {
	background: linear-gradient(to right, #ff7e5f, #feb47b);
	color: white;
	padding: 10px 20px;
	border: none;
	border-radius: 50px;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.3s ease;
	box-shadow: 0px 10px 10px -10px rgba(0, 0, 0, 0.15);
	outline: none;
}

.button:hover {
	transform: translateY(-2px);
	box-shadow: 0px 15px 15px -10px rgba(0, 0, 0, 0.15);
}

.button:active {
	transform: translateY(0);
	box-shadow: 0px 10px 10px -10px rgba(0, 0, 0, 0.15);
}
</style>
  