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

		<v-btn text rounded to="/home">
			Home
		</v-btn>

		<v-btn text rounded :to="{ name: 'about' }">
			About
		</v-btn>
	</v-app-bar>
</template>

<script>
export default {};
</script>
