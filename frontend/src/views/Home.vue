<template>
	<div class="home">
		<h1>This is the home page</h1>
	</div>
</template>

<script>
import LayoutDefault from '@/layouts/LayoutDefault';

export default {
	name: 'Home',
	created() {
		this.$emit('update:layout', LayoutDefault);
	},
};
</script>

<style>
/* .home {
	margin: 20px;
	padding: 10px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	min-height: 88vh;
	background-color: #ffffff;
} */
</style>
