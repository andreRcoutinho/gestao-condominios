<!-- <template>
	<v-app>
		<NavDrawer />
		<AppNav />

		<v-content>
			<div class="main">
				<router-view />
			</div>
		</v-content>
	</v-app>
</template> -->

<template>
	<v-app>
		<component :is="layout" class="bg">
			<router-view :layout.sync="layout" />
		</component>
	</v-app>
</template>

<script>
export default {
	name: 'App',
	data: () => {
		return {
			layout: 'div',
		};
	},
};
</script>

<style scoped>
#app {
	background-color: #fafafa;
}
</style>
