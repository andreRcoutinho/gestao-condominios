<template>
	<v-app>
		<v-app-bar app color="primary" dark>
			<div class="d-flex align-center">
				<v-img
					alt="Vuetify Logo"
					class="shrink mr-2"
					contain
					src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
					transition="scale-transition"
					width="40"
				/>
			</div>

			<v-spacer></v-spacer>

			<v-btn text rounded to="/">
				Home
			</v-btn>

			<v-btn text rounded :to="{ name: 'about' }">
				About
			</v-btn>
		</v-app-bar>

		<v-content>
			<router-view class="page" />
		</v-content>
	</v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';

export default {
	name: 'App',

	components: {
		// HelloWorld
	},

	data: () => ({
		//
	})
};
</script>
