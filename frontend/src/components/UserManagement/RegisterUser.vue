<template>
	<div>
		<v-row class="ma-0">
			<v-form
				v-model="newUserInfo.validity"
				ref="formNewUser"
				@submit.prevent="registerNewUser"
				class="mt-12"
				@keydown.enter.prevent="registerNewUser"
			>
				<v-container fluid>
					<v-row justify="center">
						<v-col cols="5">
							<v-text-field
								v-model="newUserInfo.firstName"
								label="Primeiro Nome"
								color="secondary"
								:rules="newUserInfo.nameRules"
								required
							></v-text-field>
						</v-col>
						<v-col cols="5">
							<v-text-field
								v-model="newUserInfo.lastName"
								label="Último Nome"
								color="secondary"
								:rules="newUserInfo.nameRules"
								required
							></v-text-field>
						</v-col>
						<v-col cols="5">
							<v-text-field
								v-model="newUserInfo.email"
								label="Email"
								color="secondary"
								:rules="newUserInfo.emailRules"
								required
							></v-text-field>
						</v-col>
						<v-col cols="5">
							<v-select
								v-model="newUserInfo.role"
								:items="roles"
								label="Permissões"
								item-text="role_name"
								item-value="id"
								color="secondary"
								item-color="secondary"
							></v-select>
						</v-col>
						<v-col cols="5">
							<v-text-field
								v-model="newUserInfo.NIF"
								label="NIF"
								color="secondary"
							></v-text-field>
						</v-col>
						<v-col cols="5">
							<v-text-field
								v-model="newUserInfo.IBAN"
								label="IBAN"
								color="secondary"
							></v-text-field>
						</v-col>
						<v-col cols="5">
							<v-text-field
								v-model="newUserInfo.contactValue"
								label="Contacto"
								color="secondary"
								:append-icon="`mdi-plus`"
								@click:append="addContactToArray"
								@keydown.enter="addContactToArray"
							>
							</v-text-field>
							<v-list dense>
								<v-list-item v-for="(c, i) in newUserInfo.contacts" :key="i">
									<v-list-item-icon>
										<v-icon small>mdi-phone</v-icon>
									</v-list-item-icon>
									<v-list-item-content>
										<v-list-item-subtitle>
											{{ c }}
										</v-list-item-subtitle>
									</v-list-item-content>
									<v-list-item-action class="my-0">
										<v-btn x-small icon @click="newUserInfo.contacts.splice(i, 1)">
											<v-icon>mdi-delete</v-icon>
										</v-btn>
									</v-list-item-action>
								</v-list-item>
							</v-list>
						</v-col>
						<v-col cols="5">
							<v-select
								v-model="newUserInfo.units"
								:items="units"
								label="Parcela(s)"
								item-text="unit"
								item-value="id"
								color="secondary"
								item-color="secondary"
								chips
								small-chips
								deletable-chips
								multiple
								required
							></v-select>
						</v-col>
					</v-row>
					<v-row>
						<v-spacer></v-spacer>
						<v-btn
							class="mt-12 mr-12"
							color="secondary"
							text
							type="submit"
							:disabled="!newUserInfo.validity"
						>
							Registar
						</v-btn>
					</v-row>
				</v-container>
			</v-form>
		</v-row>
		<v-row justify="center" class="mt-12">
			<v-alert
				v-if="success"
				class="mb-3"
				text
				type="success"
				transition="fade-transition"
				elevation="1"
			>
				{{ success }}
			</v-alert>

			<v-alert v-else-if="errorMsg" class="mb-3" text type="error" transition="fade-transition">
				{{ errorMsg }}
			</v-alert>
		</v-row>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'RegisterUser',
	data: () => ({
		newUserInfo: {
			firstName: '',
			lastName: '',
			nameRules: [(v) => !!v || 'Campo obrigatório.'],
			email: '',
			emailRules: [
				(v) =>
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
						v
					) || 'O email tem que ser válido.',
			],
			NIF: '',
			nifRules: [(v) => /^\d{9}$/.test(v) || 'Introduza um NIF válido.'],
			IBAN: '',
			ibanRules: [(v) => /^([a-zA-Z]{2}\d{2})?\d{21}$/.test(v) || 'Introduza um IBAN válido.'],
			contacts: [],
			contactValue: null,
			otherContact: false,
			role: -1,
			units: [],
			validity: false,
			unitRules: [(v) => !!v || 'Selecione pelo menos uma fração.'],
		},
		success: null,
		errorMsg: null,

		units: [],
		roles: [],
	}),
	mounted() {
		axios.get('//localhost:3333/api/units/').then((res) => (this.units = res.data.data));
		axios.get('//localhost:3333/api/roles').then((res) => (this.roles = res.data.data));
	},
	methods: {
		addContactToArray() {
			if (this.newUserInfo.contactValue) {
				this.newUserInfo.contacts.push(this.newUserInfo.contactValue);
			}
			this.newUserInfo.otherContact = true;
			this.newUserInfo.contactValue = null;
			console.log(this.newUserInfo.contacts);
		},
		registerNewUser() {
			axios
				.post('//localhost:3333/api/sign-up', {
					first_name: this.newUserInfo.firstName,
					last_name: this.newUserInfo.lastName,
					email: this.newUserInfo.email,
					role_id: this.newUserInfo.role,
					units_id: this.newUserInfo.units,
					NIF: this.newUserInfo.NIF,
					IBAN: this.newUserInfo.IBAN,
					contacts: this.newUserInfo.contacts,
				})
				.then((res) => {
					this.success = res.data.message;

					setTimeout(() => {
						this.success = null;
					}, 3000);

					this.newUserInfo.contacts = [];
					this.$refs.formNewUser.reset();
					console.log(res);
				})
				.catch((err) => {
					this.errorMsg = err.response.data.error;
					setTimeout(() => {
						this.errorMsg = null;
					}, 3000);
					console.log(err);
				});
		},
	},
};
</script>

<style scoped></style>
