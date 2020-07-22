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
						Nova Palavra-passe
					</span>
				</v-row>
			</v-card-title>
			<v-card-text>
				<v-form v-model="pwdFormValidity" @submit.prevent="resetPassword">
					<v-row justify="center" class="mb-8">
						<v-col cols="12">
							<v-alert outlined color="secondary" class="text-center">
								Introduza a nova palavra-passe.
							</v-alert>

							<v-text-field
								v-model="newPwd"
								label="Nova palavra-passe"
								color="secondary"
								:type="showPassword1 ? 'text' : 'password'"
								prepend-icon="mdi-lock"
								:append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
								@click:append="showPassword1 = !showPassword1"
								required
							></v-text-field>

							<v-text-field
								v-model="repeatNewPwd"
								:rules="[rules.required, passwordConfirmationRule]"
								label="Repetir palavra-passe"
								color="secondary"
								:type="showPassword2 ? 'text' : 'password'"
								prepend-icon="mdi-lock"
								:append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
								@click:append="showPassword2 = !showPassword2"
								required
							></v-text-field>
						</v-col>
					</v-row>
					<v-row justify="center">
						<v-alert
							v-if="resetPwdSuccess"
							class="mb-3"
							text
							type="success"
							transition="fade-transition"
						>
							{{ resetPwdSuccess }}
						</v-alert>

						<v-alert
							v-else-if="resetPwdErrorMsg"
							class="mb-3"
							text
							type="error"
							transition="fade-transition"
						>
							{{ resetPwdErrorMsg }}
						</v-alert>
					</v-row>

					<v-row justify="center" class="mt-1">
						<v-btn color="secondary" tile type="submit" :disabled="!pwdFormValidity">
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
	name: 'ResetPassword',
	created() {
		this.$emit('update:layout', LayoutAuth);
	},
	data: () => ({
		email: '',

		pwdFormValidity: false,
		showPassword1: false,
		showPassword2: false,

		newPwd: '',
		repeatNewPwd: '',
		rules: {
			required: (v) => !!v || 'Este campo é necessário.',
		},
		resetPwdSuccess: null,
		resetPwdErrorMsg: null,
	}),
	computed: {
		passwordConfirmationRule() {
			return this.newPwd === this.repeatNewPwd || 'As palavras-passe têm que ser iguais';
		},
	},
	methods: {
		resetPassword() {
			axios
				.post(`http://localhost:3333/api/reset-password`, {
					email: this.$route.query.email,
					token: this.$route.query.token,
					new_password: this.newPwd,
					new_password_repeat: this.repeatNewPwd,
				})
				.then((res) => {
					this.resetPwdSuccess = res.data.message;
					setTimeout(() => {
						this.resetPwdSuccess = null;
					}, 1500);
					//console.log(res);
				})
				.catch((err) => {
					this.resetPwdErrorMsg = err.response.data.error;
					setTimeout(() => {
						this.resetPwdErrorMsg = null;
					}, 3000);
					//console.log(err);
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
