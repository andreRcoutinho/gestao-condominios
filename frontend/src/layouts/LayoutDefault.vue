<template>
	<div class="LayoutDefault">
		<NavDrawer />
		<NavBar />
		<v-main class="LayoutDefault__main">
			<slot />
		</v-main>
	</div>
</template>

<script>
import NavBar from '@/components/NavBar';
import NavDrawer from '@/components/NavDrawer';

export default {
	components: {
		NavBar,
		NavDrawer,
	},
};
</script>

<style>
.LayoutDefault__main > div:first-child {
	margin: 20px 20px auto 20px;
	padding: 10px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	min-height: 88vh;
	background-color: #ffffff;
}
</style>
