<template>
	<v-app-bar app clipped-left fixed flat color="primary" height="85">
		<div>
			<v-img
				alt="Logo"
				contain
				src="@/assets/logo_full.png"
				transition="scale-transition"
				width="175"
				class="ml-6"
			/>
		</div>
		<v-spacer></v-spacer>

		<v-btn text tile to="/home" class="mr-5">
			Home
		</v-btn>

		<v-btn icon large outlined class="mr-3" @click="logout">
			<v-icon>{{ 'mdi-power' }}</v-icon>
		</v-btn>
	</v-app-bar>
</template>

<script>
import { authComputed } from '../store/helpers.js';

export default {
	computed: {
		...authComputed,
	},
	methods: {
		logout() {
			this.$store.dispatch('logout');
		},
	},
};
</script>
