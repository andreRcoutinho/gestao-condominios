<template>
	<div class="parent">
		<v-card width="400" class="px-6 py-12">
			<v-img
				alt="Logo"
				src="@/assets/logo_full.png"
				contain
				transition="scale-transition"
				max-height="85"
				id="img_logo"
			/>
			<v-card-text>
				<v-form ref="logInForm" v-model="formValidity" @submit.prevent="login">
					<v-text-field
						v-model="email"
						label="Email"
						type="email"
						prepend-icon="mdi-account-circle"
						:rules="emailRules"
						required
						color="#949494"
					></v-text-field>

					<v-text-field
						v-model="password"
						label="Password"
						:type="showPassword ? 'text' : 'password'"
						prepend-icon="mdi-lock"
						:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append="showPassword = !showPassword"
						:rules="pwdRules"
						required
						color="#949494"
					/>

					<v-card-actions class="justify-center">
						<v-btn
							class="mt-4 mb-4"
							type="submit"
							color="secondary"
							:disabled="!formValidity"
						>
							Entrar
						</v-btn>
					</v-card-actions>
					<v-alert
						v-if="errorMsg"
						class="mt-7 mb-0"
						icon="mdi-shield-lock-outline"
						text
						type="error"
					>
						{{ errorMsg }}
					</v-alert>
				</v-form>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
import LayoutAuth from '@/layouts/LayoutAuth';

export default {
	name: 'Login',
	created() {
		this.$emit('update:layout', LayoutAuth);
	},
	data() {
		return {
			email: '',
			emailRules: [
				(v) => !!v || 'O email é necessário.',
				(v) =>
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
						v
					) || 'O email tem que ser válido.',
			],
			password: '',
			pwdRules: [(v) => !!v || 'A password é necessária.'],
			showPassword: false,
			formValidity: false,
			errorMsg: null,
		};
	},
	methods: {
		login() {
			this.$store
				.dispatch('login', {
					email: this.email,
					password: this.password,
				})
				.then(() => {
					this.$router.push({ name: 'home' });
				})
				.catch((err) => {
					this.errorMsg = err.response.data.error;
				});
			//this.$store.dispatch('print');
		},
	},
};
</script>

<style scoped>
.parent {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
}

#img_logo {
	margin: 25px auto;
}
</style>
