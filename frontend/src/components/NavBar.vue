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

		<v-btn v-if="!loggedIn" icon large outlined to="/login" class="mr-3">
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
};
</script>
