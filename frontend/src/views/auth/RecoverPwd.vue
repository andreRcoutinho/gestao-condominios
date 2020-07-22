<template>
	<div class="parent">
		<v-card width="400" class="px-6 py-8">
			<router-link to="/login">
				<v-img
					alt="Logo"
					:src="require('@/assets/logo_full.png')"
					contain
					transition="scale-transition"
					max-height="85"
					id="img_logo"
				/>
			</router-link>
			<v-card-title class="ml-2 pt-5">
				<v-row justify="center">
					<span>
						Recuperar Palavra-passe
					</span>
				</v-row>
			</v-card-title>
			<v-card-text>
				<v-form @submit.prevent="forgotPassword">
					<v-row justify="center" class="mb-8">
						<v-col cols="12">
							<v-alert outlined color="secondary" class="text-center">
								Introduza o endereço de email e siga as instruções recebidas.
							</v-alert>
							<v-text-field
								v-model="email"
								color="secondary"
								label="Email"
								hide-details
							></v-text-field>
						</v-col>
					</v-row>
					<v-row justify="center">
						<v-alert
							v-if="forgotPwdSuccess"
							class="mb-3"
							text
							type="success"
							transition="fade-transition"
						>
							Email Enviado!
						</v-alert>

						<v-alert
							v-else-if="forgotPwdErrorMsg"
							class="mb-3"
							text
							type="error"
							transition="fade-transition"
						>
							{{ forgotPwdErrorMsg }}
						</v-alert>
					</v-row>

					<v-row justify="center" class="mt-1">
						<v-btn color="secondary" tile type="submit">
							Enviar
						</v-btn>
					</v-row>
				</v-form>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
import axios from 'axios';

import LayoutAuth from '@/layouts/LayoutAuth';

export default {
	name: 'RecoverPassword',
	created() {
		this.$emit('update:layout', LayoutAuth);
	},
	data: () => ({
		email: '',
		forgotPwdSuccess: null,
		forgotPwdErrorMsg: null,
	}),
	methods: {
		forgotPassword() {
			axios
				.post(`http://localhost:3333/api/forgot-password`, {
					email: this.email,
				})
				.then((res) => {
					this.forgotPwdSuccess = true;
					setTimeout(() => {
						this.forgotPwdSuccess = null;
					}, 1500);
					console.log(res);
				})
				.catch((err) => {
					this.forgotPwdErrorMsg = err.response.data.error;
					setTimeout(() => {
						this.forgotPwdErrorMsg = null;
					}, 3000);
					console.log(err);
				});
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
