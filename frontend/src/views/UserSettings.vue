<template>
	<div>
		<v-row class="ml-6 pageHeight" align="center">
			<span class="ml-8 mt-8 text-h4">Conta Pessoal</span>
			<v-row justify="start" class="ma-8">
				<!-- LEFT SIDE -->
				<v-col>
					<v-row class="my-6 ml-12 mr-0">
						<v-row class="mb-3">
							<span class="text-h5 grey--text">Atualizar informação</span>
						</v-row>
						<v-form @submit.prevent="updateUser">
							<v-row justify="center" class="mb-3">
								<v-col cols="6">
									<v-text-field
										v-model="editedUser.firstName"
										label="Primeiro Nome"
										color="secondary"
										hide-details
									></v-text-field>
								</v-col>
								<v-col cols="6">
									<v-text-field
										v-model="editedUser.lastName"
										label="Último Nome"
										color="secondary"
										hide-details
									></v-text-field>
								</v-col>
							</v-row>
							<v-row justify="center" class="mb-3">
								<v-col cols="12">
									<v-text-field
										v-model="editedUser.email"
										label="Email"
										color="secondary"
										hide-details
									></v-text-field>
								</v-col>
							</v-row>
							<v-row justify="center">
								<v-col cols="12">
									<v-text-field
										v-model="editedUser.IBAN"
										label="IBAN"
										color="secondary"
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field
										v-model="editedUser.NIF"
										label="NIF"
										color="secondary"
									></v-text-field>
								</v-col>
							</v-row>

							<v-row>
								<v-col>
									<v-row justify="start" class="ml-0">
										<v-btn color="secondary" tile type="submit">
											Guardar Alterações
										</v-btn>
									</v-row>
								</v-col>
								<v-col>
									<v-icon v-if="editedUser.success" color="green">
										mdi-check
									</v-icon>
									<v-icon v-if="editedUser.error" color="red">
										mdi-cancel
									</v-icon>
								</v-col>
							</v-row>
							<v-row justify="center" class="mt-12">
								<!-- Update Contacts -->
								<v-col>
									<v-dialog
										v-model="editedUser.updateContactsDialog.show"
										persistent
										max-width="450px"
									>
										<template v-slot:activator="{ on }" class="text-xs-center">
											<v-btn v-on="on" outlined>
												Atualizar Contactos
											</v-btn>
										</template>
										<v-card>
											<v-card-title class="ml-2 pt-5">
												<span>
													Atualizar Contactos
												</span>
											</v-card-title>

											<v-card-text>
												<v-row justify="center" class="mt-3">
													<v-list v-if="userContacts.length !== 0">
														<v-list-item
															v-for="(contact, i) in userContacts"
															:key="i"
														>
															<v-list-item-icon>
																<v-icon small>mdi-phone</v-icon>
															</v-list-item-icon>
															<v-list-item-content>
																<v-list-item-title>{{
																	contact.phone_number
																}}</v-list-item-title>
															</v-list-item-content>
															<v-list-item-action>
																<v-btn
																	x-small
																	icon
																	@click="removeContact(contact.id, i)"
																>
																	<v-icon>mdi-delete</v-icon>
																</v-btn>
															</v-list-item-action>
														</v-list-item>
													</v-list>
													<v-alert
														v-else-if="userContacts.length === 0"
														type="info"
														text
														color="secondary"
														>O utilizador não tem contactos.</v-alert
													>
												</v-row>

												<v-row justify="center">
													<v-form ref="form" @submit.prevent>
														<v-text-field
															v-model="editedUser.updateContactsDialog.newContact"
															label="Novo Contacto"
															color="secondary"
															:append-icon="`mdi-plus`"
															@click:append="addContact"
															:rules="editedUser.updateContactsDialog.contactRules"
														>
														</v-text-field>
													</v-form>
												</v-row>

												<v-row class="mt-3">
													<v-spacer></v-spacer>
													<v-btn color="red" text @click="closeContactsDialog"
														>Fechar</v-btn
													>
												</v-row>
											</v-card-text>
										</v-card>
									</v-dialog>
								</v-col>
								<!-- Update Password -->
								<v-col>
									<v-dialog
										v-model="editedUser.updatePwdDialog.show"
										persistent
										max-width="600px"
									>
										<template v-slot:activator="{ on }" class="text-xs-center">
											<v-btn v-on="on" outlined color="red">
												Atualizar Palavra-passe
											</v-btn>
										</template>
										<v-card>
											<v-card-title class="ml-2 pt-5">
												<span>
													Atualizar Palavra-passe
												</span>
											</v-card-title>

											<v-card-text>
												<v-form
													v-model="pwdFormValidity"
													ref="formPwd"
													@submit.prevent="updatePassword"
												>
													<v-row justify="center" class="mb-8">
														<v-col cols="12">
															<v-text-field
																v-model="editedUser.updatePwdDialog.activePwd"
																:rules="editedUser.updatePwdDialog.activePwdRules"
																label="Palavra-passe antiga"
																color="secondary"
																:type="showPassword1 ? 'text' : 'password'"
																prepend-icon="mdi-lock"
																:append-icon="
																	showPassword1 ? 'mdi-eye' : 'mdi-eye-off'
																"
																@click:append="showPassword1 = !showPassword1"
																required
															></v-text-field>
														</v-col>
														<v-col cols="12">
															<v-text-field
																v-model="editedUser.updatePwdDialog.newPwd"
																:rules="editedUser.updatePwdDialog.newPwdRules"
																label="Nova palavra-passe"
																color="secondary"
																:type="showPassword2 ? 'text' : 'password'"
																prepend-icon="mdi-lock"
																:append-icon="
																	showPassword2 ? 'mdi-eye' : 'mdi-eye-off'
																"
																@click:append="showPassword2 = !showPassword2"
																required
															></v-text-field>
														</v-col>
														<v-col cols="12">
															<v-text-field
																v-model="editedUser.updatePwdDialog.repeatPwd"
																:rules="editedUser.updatePwdDialog.repeatPwdRules"
																label="Repetir palavra-passe"
																color="secondary"
																:type="showPassword3 ? 'text' : 'password'"
																prepend-icon="mdi-lock"
																:append-icon="
																	showPassword3 ? 'mdi-eye' : 'mdi-eye-off'
																"
																@click:append="showPassword3 = !showPassword3"
																required
															></v-text-field>
														</v-col>
														<!-- FORGOT PASSWORD -->
														<v-col>
															<v-dialog
																v-model="forgotPwdDialog.show"
																persistent
																max-width="600px"
															>
																<template
																	v-slot:activator="{ on }"
																	class="text-xs-center"
																>
																	<v-row justify="center">
																		<v-btn v-on="on" text small
																			>Esqueceu-se da palavra-passe?</v-btn
																		>
																	</v-row>
																</template>
																<v-card>
																	<v-card-title class="pt-5">
																		<span>
																			Recuperar Palavra-passe
																		</span>
																	</v-card-title>

																	<v-card-text>
																		<v-form @submit.prevent="resetPassword">
																			<v-row justify="center" class="mb-8">
																				<v-col cols="12">
																					<span
																						>Enviar email para o seguinte
																						endereço?</span
																					>
																					<v-text-field
																						:value="userInfo.email"
																						color="secondary"
																						outlined
																						disabled
																						hide-details
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
																					Email Enviado!
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

																			<v-row>
																				<v-spacer></v-spacer>
																				<v-btn
																					color="secondary"
																					text
																					type="submit"
																				>
																					Enviar
																				</v-btn>
																				<v-btn
																					color="red"
																					text
																					@click="forgotPwdDialog.show = false"
																					>Cancelar</v-btn
																				>
																			</v-row>
																		</v-form>
																	</v-card-text>
																</v-card>
															</v-dialog>
														</v-col>
													</v-row>
													<v-row justify="center">
														<v-alert
															v-if="changePwdSuccess"
															class="mb-3"
															text
															type="success"
															transition="fade-transition"
														>
															{{ changePwdSuccess }}
														</v-alert>

														<v-alert
															v-else-if="changePwdError"
															class="mb-3"
															text
															type="error"
															transition="fade-transition"
														>
															{{ changePwdError }}
														</v-alert>
													</v-row>
													<v-row>
														<v-spacer></v-spacer>
														<v-btn
															color="secondary"
															text
															type="submit"
															:disabled="!pwdFormValidity"
														>
															Guardar Alterações
														</v-btn>
														<v-btn color="red" text @click="closePwdDialog"
															>Fechar</v-btn
														>
													</v-row>
												</v-form>
											</v-card-text>
										</v-card>
									</v-dialog>
								</v-col>
							</v-row>
						</v-form>
					</v-row>
				</v-col>

				<v-divider vertical inset></v-divider>

				<!-- RIGHT SIDE -->
				<v-col>
					<v-row class="my-6 ml-12">
						<v-row>
							<span class="text-h5 grey--text">Informações da conta</span>
						</v-row>
						<v-container class="mt-2">
							<v-row justify="center">
								<v-col cols="12">
									<span class="text-h6 font-weight-bold">Tipo de Utilizador</span> <br />
									<span class="button text-uppercase">{{ userInfo.role_name }}</span>
								</v-col>

								<v-col cols="6">
									<span class="text-h6 font-weight-bold">Nome</span> <br />
									<span class="button text-uppercase">{{ userInfo.name }}</span>
								</v-col>

								<v-col cols="6">
									<span class="text-h6 font-weight-bold">Email</span> <br />
									<span class="button text-uppercase">{{ userInfo.email }}</span>
								</v-col>

								<v-col cols="6" md="12">
									<span class="text-h6 font-weight-bold">IBAN</span> <br />
									<span class="button text-uppercase">{{ userInfo.iban }}</span>
								</v-col>

								<v-col cols="6" md="12">
									<span class="text-h6 font-weight-bold">NIF</span> <br />
									<span class="button text-uppercase">{{ userInfo.nif }}</span>
								</v-col>

								<v-col>
									<span class="text-h6 font-weight-bold">Contacto</span>
									<v-list-item
										v-for="(ctct, i) in userContacts"
										:key="i"
										class="px-0 listLineH"
									>
										<v-list-item-icon>
											<v-icon small>mdi-phone</v-icon>
										</v-list-item-icon>
										<v-list-item-content class="py-0">
											<v-list-item-title
												class="listItem"
												v-text="ctct.phone_number"
											></v-list-item-title>
										</v-list-item-content>
									</v-list-item>
								</v-col>
							</v-row>
						</v-container>
					</v-row>
				</v-col>
			</v-row>
		</v-row>
	</div>
</template>

<script>
import LayoutDefault from '@/layouts/LayoutDefault';

import axios from 'axios';

export default {
	name: 'UserSettings',
	data: () => ({
		editedUser: {
			firstName: '',
			lastName: '',
			email: '',
			IBAN: '',
			NIF: '',
			updateContactsDialog: {
				show: false,
				newContact: '',
				contactRules: [(v) => /^\d{9}$/.test(v) || 'Introduza um contacto válido.'],
			},
			updatePwdDialog: {
				show: false,
				activePwd: '',
				activePwdRules: [(v) => !!v || 'Introduza a palavra-passe atual.'],
				newPwd: '',
				newPwdRules: [(v) => !!v || 'Introduza a nova palavra-passe.'],
				repeatPwd: '',
				repeatPwdRules: [(v) => !!v || 'Introduza de novo a nova palavra-passe.'],
			},
			success: false,
			error: false,
		},

		pwdFormValidity: false,
		showPassword1: false,
		showPassword2: false,
		showPassword3: false,

		forgotPwdDialog: {
			show: false,
		},

		resetPwdSuccess: null,
		resetPwdErrorMsg: null,

		changePwdSuccess: null,
		changePwdError: null,

		userInfo: [],
		userContacts: [],
	}),
	async mounted() {
		let userID = this.$store.state.user.id;
		let userFirstName = this.$store.state.user.first_name;
		let userLastName = this.$store.state.user.last_name;

		await axios.get(`//localhost:3333/api/users/${userID}`).then((res) => {
			this.userInfo = res.data.data;
			this.userContacts = res.data.data.contacts;
		});

		this.editedUser.firstName = userFirstName;
		this.editedUser.lastName = userLastName;
		this.editedUser.email = this.userInfo.email;
		this.editedUser.IBAN = this.userInfo.iban;
		this.editedUser.NIF = this.userInfo.nif;
	},
	created() {
		this.$emit('update:layout', LayoutDefault);
	},
	methods: {
		closeContactsDialog: function() {
			this.editedUser.updateContactsDialog.show = false;
			this.$refs.form.reset();
		},
		updateUser: function() {
			axios
				.put(`http://localhost:3333/api/users/${this.userInfo.id}`, {
					first_name: this.editedUser.firstName,
					last_name: this.editedUser.lastName,
					email: this.editedUser.email,
					IBAN: this.editedUser.IBAN,
					NIF: this.editedUser.NIF,
				})
				.then(() => {
					this.editedUser.success = true;

					setTimeout(() => {
						this.editedUser.success = null;
					}, 3000);

					axios.get(`//localhost:3333/api/users/${this.userInfo.id}`).then((res) => {
						this.userInfo = res.data.data;
					});
				})
				.catch((err) => {
					this.editedUser.error = true;
					setTimeout(() => {
						this.editedUser.error = null;
					}, 3000);
					console.log(err);
				});
		},
		addContact: function() {
			axios
				.put(`http://localhost:3333/api/users/${this.userInfo.id}/add-contact`, {
					phone_number: this.editedUser.updateContactsDialog.newContact,
				})
				.then(() => {
					this.userContacts.push({
						phone_number: this.editedUser.updateContactsDialog.newContact,
					});
					this.editedUser.updateContactsDialog.newContact = '';
					this.$refs.form.reset();
				})
				.catch((err) => {
					console.log(err);
				});
		},
		removeContact: function(id, contactIndex) {
			axios
				.put(`http://localhost:3333/api/users/${this.userInfo.id}/delete-contact`, {
					contact_id: id,
				})
				.then((res) => {
					this.userContacts.splice(contactIndex, 1);
					console.log(res);
				})
				.catch((err) => {
					console.log(err);
				});
		},
		closePwdDialog: function() {
			this.editedUser.updatePwdDialog.show = false;
			this.$refs.formPwd.reset();
		},
		resetPassword: function() {
			axios
				.post(`http://localhost:3333/api/forgot-password`, {
					email: this.userInfo.email,
				})
				.then((res) => {
					this.resetPwdSuccess = true;
					setTimeout(() => {
						this.resetPwdSuccess = null;
						this.forgotPwdDialog.show = false;
					}, 1500);
					console.log(res);
				})
				.catch((err) => {
					this.resetPwdErrorMsg = err.response.data.error;
					setTimeout(() => {
						this.resetPwdErrorMsg = null;
					}, 3000);
					console.log(err);
				});
		},
		updatePassword: function() {
			axios
				.put(`http://localhost:3333/api/users/update-password/${this.userInfo.id}`, {
					old_password: this.editedUser.updatePwdDialog.activePwd,
					new_password: this.editedUser.updatePwdDialog.newPwd,
					new_password_repeat: this.editedUser.updatePwdDialog.repeatPwd,
				})
				.then((res) => {
					this.changePwdSuccess = res.data.message;

					setTimeout(() => {
						this.changePwdSuccess = null;
					}, 3000);
					this.$refs.formPwd.reset();
					console.log(res);
				})
				.catch((err) => {
					this.changePwdError = err.response.data.error;
					setTimeout(() => {
						this.changePwdError = null;
					}, 3000);
					console.log(err);
				});
		},
	},
};
</script>

<style scoped>
.pageHeight {
	height: 80vh;
}

@media only screen and (max-width: 1280px) {
	.pageHeight {
		height: auto;
	}
}

.listLineH {
	min-height: 28px !important;
}

.listItem {
	-webkit-user-select: text;
	-moz-user-select: text;
	-ms-user-select: text;
	user-select: text;
	padding-top: 0 !important;
}

.v-list-item__icon {
	margin-right: 8px !important;
	margin-top: 14px !important;
	margin-bottom: 12px !important;
	align-self: center;
}
</style>
