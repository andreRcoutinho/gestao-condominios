<template>
	<div class="movements">
		<v-tabs v-model="tab" grow color="black">
			<v-tab v-for="(t, index) in tabs" :key="`${index}-${t.tab}`">
				{{ t.tab }}
			</v-tab>
		</v-tabs>

		<v-tabs-items v-model="tab">
			<!-- OWNERS -->
			<v-tab-item>
				<!-- SEARCH BAR -->
				<v-row justify="center">
					<v-col cols="6">
						<v-text-field
							v-model="ownersTableOptions.search"
							append-icon="mdi-magnify"
							label="Search"
							single-line
							hide-details
							color="#949494"
							class="mt-8"
						></v-text-field>
					</v-col>
				</v-row>
				<!-- OWNERS TABLE -->
				<v-row justify="space-around">
					<v-col cols="8">
						<v-data-table
							:headers="ownersTableOptions.headers"
							:items="owners"
							:search="ownersTableOptions.search"
							hide-default-footer
							:page.sync="ownersTableOptions.page"
							:items-per-page="ownersTableOptions.itemsPerPage"
							class="elevation-1"
							@page-count="ownersTableOptions.pageCount = $event"
							:sort-by="['name']"
							:sort-desc="[false]"
							item-key="name"
						>
							<template v-slot:item.actions="props">
								<v-icon class="mr-2" @click="openOwnerInfo(props.item)">
									mdi-plus
								</v-icon>
							</template>
						</v-data-table>
						<v-dialog v-model="ownerRowDlog.show" max-width="600px">
							<v-card>
								<v-card-title class="ml-2 pt-5">
									<span>{{ ownerRowDlog.name }}</span>
								</v-card-title>

								<v-card-text>
									<v-row class="ml-6">
										<v-col cols="6">
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-subtitle>IBAN</v-list-item-subtitle>
													<v-list-item-title>{{
														ownerRowDlog.IBAN
													}}</v-list-item-title>
												</v-list-item-content>
											</v-list-item>
										</v-col>
										<v-col cols="6">
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-subtitle>NIF</v-list-item-subtitle>
													<v-list-item-title>{{ ownerRowDlog.NIF }}</v-list-item-title>
												</v-list-item-content>
											</v-list-item>
										</v-col>
										<v-col cols="6">
											<v-list disabled>
												<v-subheader class="mb-0">Fração</v-subheader>
												<v-list-item v-for="(unit, i) in ownerRowDlog.units" :key="i">
													<v-list-item-icon>
														<v-icon>mdi-home</v-icon>
													</v-list-item-icon>
													<v-list-item-content>
														<v-list-item-title
															class="listItem"
															v-text="ownerRowDlog.units[i]"
														></v-list-item-title>
													</v-list-item-content>
												</v-list-item>
											</v-list>
										</v-col>
										<v-col cols="6">
											<v-list disabled>
												<v-subheader>Contacto</v-subheader>
												<v-list-item
													v-for="(ctct, i) in ownerRowDlog.contacts"
													:key="i"
												>
													<v-list-item-icon>
														<v-icon>mdi-phone</v-icon>
													</v-list-item-icon>
													<v-list-item-content>
														<v-list-item-title
															class="listItem"
															v-text="ownerRowDlog.contacts[i]"
														></v-list-item-title>
													</v-list-item-content>
												</v-list-item>
											</v-list>
										</v-col>
									</v-row>
									<v-row class="mr-2">
										<v-spacer></v-spacer>
										<v-btn color="blue darken-1" text @click="closeOwnerInfo"
											>Fechar</v-btn
										>
										<!-- <v-btn color="blue darken-1" text>Editar</v-btn> -->
										<!-- <v-btn color="blue darken-1" text>Eliminar</v-btn> -->
									</v-row>
								</v-card-text>
							</v-card>
						</v-dialog>
						<div class="text-center pt-3">
							<v-pagination
								v-model="ownersTableOptions.page"
								:length="ownersTableOptions.pageCount"
								:total-visible="7"
								color="secondary"
							></v-pagination>
						</div>
					</v-col>
				</v-row>
			</v-tab-item>

			<!-- SUPPLIERS -->
			<v-tab-item>
				<!-- SEARCH BAR -->
				<v-row justify="center">
					<v-col cols="6">
						<v-text-field
							v-model="ownersTableOptions.search"
							append-icon="mdi-magnify"
							label="Search"
							single-line
							hide-details
							color="#949494"
							class="mt-8"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row justify="space-around">
					<v-col cols="8">
						<v-data-table
							:headers="suppliersTableOptions.headers"
							:items="suppliers"
							:search="suppliersTableOptions.search"
							hide-default-footer
							:page.sync="suppliersTableOptions.page"
							:items-per-page="suppliersTableOptions.itemsPerPage"
							class="elevation-1"
							@page-count="suppliersTableOptions.pageCount = $event"
							:sort-by="['company_name']"
							:sort-desc="[false]"
							item-key="name"
						>
							<template v-slot:item.actions="props">
								<v-icon class="mr-2" @click="openSupplierInfo(props.item)">
									mdi-plus
								</v-icon>
							</template>
						</v-data-table>

						<v-dialog v-model="supplierRowDlog.show" max-width="600px">
							<v-card>
								<v-card-title class="ml-2 pt-5">
									<span>
										{{ `${supplierRowDlog.company_name} - ${supplierRowDlog.name}` }}
									</span>
								</v-card-title>

								<v-card-text>
									<v-row class="ml-6">
										<v-col cols="6">
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-subtitle>IBAN</v-list-item-subtitle>
													<v-list-item-title v-if="supplierRowDlog.IBAN">
														{{ supplierRowDlog.IBAN }}
													</v-list-item-title>
													<v-list-item-title v-else>
														Não disponível
													</v-list-item-title>
												</v-list-item-content>
											</v-list-item>
										</v-col>
										<v-col cols="6">
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-subtitle>NIF</v-list-item-subtitle>
													<v-list-item-title>{{
														supplierRowDlog.NIF
													}}</v-list-item-title>
												</v-list-item-content>
											</v-list-item>
										</v-col>
										<v-col cols="6">
											<v-list disabled>
												<v-subheader>Tipo de Serviço</v-subheader>
												<v-list-item
													v-for="(st, i) in supplierRowDlog.service_types"
													:key="i"
												>
													<v-list-item-icon>
														<v-icon>mdi-hammer-wrench</v-icon>
													</v-list-item-icon>
													<v-list-item-content>
														<v-list-item-title
															class="listItem"
															v-text="supplierRowDlog.service_types[i].service_type"
														></v-list-item-title>
													</v-list-item-content>
												</v-list-item>
											</v-list>
										</v-col>
										<v-col cols="6">
											<v-list disabled>
												<v-subheader>Contacto</v-subheader>
												<v-list-item
													v-for="(ctct, i) in supplierRowDlog.contacts"
													:key="i"
												>
													<v-list-item-icon>
														<v-icon>mdi-phone</v-icon>
													</v-list-item-icon>
													<v-list-item-content>
														<v-list-item-title
															class="listItem"
															v-text="supplierRowDlog.contacts[i].phone_number"
														></v-list-item-title>
													</v-list-item-content>
												</v-list-item>
											</v-list>
										</v-col>
									</v-row>
									<v-row class="mr-2">
										<v-spacer></v-spacer>
										<v-btn color="blue darken-1" text @click="closeSupplierInfo">
											Fechar
										</v-btn>
										<!-- <v-btn color="blue darken-1" text>Editar</v-btn> -->
										<!-- <v-btn color="blue darken-1" text>Eliminar</v-btn> -->
									</v-row>
								</v-card-text>
							</v-card>
						</v-dialog>

						<div class="text-center pt-3">
							<v-pagination
								v-model="suppliersTableOptions.page"
								:length="suppliersTableOptions.pageCount"
								:total-visible="7"
								color="secondary"
							></v-pagination>
						</div>
					</v-col>
				</v-row>
			</v-tab-item>
			<!-- NEW SUPPLIER -->
			<v-tab-item>
				<v-form
					v-model="newSupplierInfo.validity"
					ref="formNewSupplier"
					@submit.prevent="registerNewSupplier"
					class="mt-12"
					@keydown.enter.prevent="registerNewSupplier"
				>
					<v-container fluid>
						<v-row justify="center">
							<v-col cols="5">
								<v-text-field
									v-model="newSupplierInfo.firstName"
									label="Primeiro Nome"
									color="secondary"
									:rules="newSupplierInfo.nameRules"
									required
								></v-text-field>
							</v-col>
							<v-col cols="1"> </v-col>
							<v-col cols="5">
								<v-text-field
									v-model="newSupplierInfo.lastName"
									label="Último Nome"
									color="secondary"
									:rules="newSupplierInfo.nameRules"
									required
								></v-text-field>
							</v-col>
							<v-col cols="5">
								<v-text-field
									v-model="newSupplierInfo.email"
									label="Email"
									color="secondary"
								></v-text-field>
							</v-col>
							<v-col cols="1"> </v-col>
							<v-col cols="5">
								<v-text-field
									v-model="newSupplierInfo.companyName"
									label="Empresa"
									color="secondary"
									:rules="newSupplierInfo.companyNameRules"
									required
								></v-text-field>
							</v-col>
							<v-col cols="5">
								<v-text-field
									v-model="newSupplierInfo.NIF"
									label="NIF"
									color="secondary"
								></v-text-field>
							</v-col>
							<v-col cols="1"> </v-col>
							<v-col cols="5">
								<v-text-field
									v-model="newSupplierInfo.IBAN"
									label="IBAN"
									color="secondary"
								></v-text-field>
							</v-col>
							<v-col cols="5">
								<v-text-field
									v-model="newSupplierInfo.contactValue"
									label="Contacto"
									color="secondary"
									:append-icon="`mdi-plus`"
									@click:append="addContactToArray"
									@keydown.enter="addContactToArray"
								>
								</v-text-field>
								<v-list dense>
									<v-list-item v-for="(c, i) in newSupplierInfo.contacts" :key="i">
										<v-list-item-icon>
											<v-icon small>mdi-phone</v-icon>
										</v-list-item-icon>
										<v-list-item-content>
											<v-list-item-subtitle>
												{{ newSupplierInfo.contacts[i] }}
											</v-list-item-subtitle>
										</v-list-item-content>
										<v-list-item-action class="my-0">
											<v-btn x-small icon @click="newSupplierInfo.contacts.splice(i, 1)">
												<v-icon>mdi-delete</v-icon>
											</v-btn>
										</v-list-item-action>
									</v-list-item>
								</v-list>
							</v-col>
							<v-col cols="1"> </v-col>
							<!-- SERVICE TYPE -->
							<v-col cols="5">
								<v-select
									v-model="newSupplierInfo.serviceTypes"
									:items="serviceTypes"
									label="Tipo de Serviço"
									item-text="service_type"
									item-value="id"
									color="secondary"
									item-color="secondary"
									multiple
								></v-select>
								<!-- NEW SERVICE TYPE -->
								<v-row justify="end">
									<v-dialog
										v-model="newSupplierInfo.serviceTypeDialog.show"
										persistent
										max-width="600px"
									>
										<template v-slot:activator="{ on }" class="text-xs-center">
											<v-btn text v-on="on">
												+ Outro Serviço
											</v-btn>
										</template>
										<v-card>
											<v-card-title class="ml-2 pt-5">
												<span>
													Novo Tipo de Serviço
												</span>
											</v-card-title>

											<v-card-text>
												<v-form
													v-model="newSupplierInfo.serviceTypeDialog.validity"
													ref="formNewServiceType"
													@submit.prevent="registerNewServiceType"
												>
													<v-row>
														<v-col cols="12">
															<v-text-field
																v-model="
																	newSupplierInfo.serviceTypeDialog.serviceType
																"
																label="Tipo de Serviço"
																color="#949494"
																:rules="newSupplierInfo.serviceTypeDialog.rules"
																required
															></v-text-field>
														</v-col>

														<v-col>
															<v-alert
																v-if="newSupplierInfo.serviceTypeDialog.success"
																class="mb-3"
																text
																type="success"
																transition="fade-transition"
															>
																{{ newSupplierInfo.serviceTypeDialog.success }}
															</v-alert>

															<v-alert
																v-else-if="
																	newSupplierInfo.serviceTypeDialog.errorMsg
																"
																class="mb-3"
																text
																type="error"
																transition="fade-transition"
															>
																{{ newSupplierInfo.serviceTypeDialog.errorMsg }}
															</v-alert>
														</v-col>
													</v-row>
													<v-row>
														<v-spacer></v-spacer>
														<v-btn
															color="blue darken-1"
															text
															@click="closeNewServiceTypeDlg"
															>Fechar</v-btn
														>
														<v-btn
															color="blue darken-1"
															text
															type="submit"
															:disabled="!newSupplierInfo.serviceTypeDialog.validity"
														>
															Registar
														</v-btn>
													</v-row>
												</v-form>
											</v-card-text>
										</v-card>
									</v-dialog>
								</v-row>
							</v-col>
						</v-row>
						<v-row>
							<v-spacer></v-spacer>
							<v-btn
								class="mt-12 mr-12"
								color="secondary"
								text
								type="submit"
								:disabled="!newSupplierInfo.validity"
							>
								Registar
							</v-btn>
						</v-row>
					</v-container>
				</v-form>
				<v-snackbar
					v-model="newSupplierInfo.snackbar.show"
					:timeout="newSupplierInfo.snackbar.timeout"
					top
					:color="newSupplierInfo.snackbar.colour"
				>
					{{ newSupplierInfo.snackbar.message }}
					<v-icon v-if="newSupplierInfo.snackbar.success"> mdi-checkbox-marked-circle</v-icon>
					<v-icon v-else>
						mdi-cancel
					</v-icon>
				</v-snackbar>
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script>
import axios from 'axios';

import LayoutDefault from '@/layouts/LayoutDefault';

export default {
	name: 'Contacts',
	data: () => ({
		tab: null,
		tabs: [{ tab: 'Condóminos' }, { tab: 'Fornecedores' }, { tab: 'Novo Fornecedor' }],
		ownerRowDlog: {
			show: false,
			name: '',
			email: '',
			IBAN: '',
			NIF: '',
			contacts: [],
			units: [],
		},
		ownersTableOptions: {
			search: '',
			page: 1,
			pageCount: 0,
			itemsPerPage: 10,
			expanded: [],
			singleExpand: false,
			headers: [
				{
					text: 'Nome',
					value: 'name',
					align: 'center',
				},
				{
					text: 'Email',
					value: 'email',
					align: 'center',
				},
				{
					text: 'Mais info',
					value: 'actions',
					sortable: false,
					align: 'center',
				},
			],
		},
		// objeto é mapeado através da função openSupplierInfo
		supplierRowDlog: {
			show: false,
		},
		suppliersTableOptions: {
			search: '',
			page: 1,
			pageCount: 0,
			itemsPerPage: 10,
			expanded: [],
			singleExpand: false,
			headers: [
				{
					text: 'Entidade',
					value: 'company_name',
					align: 'center',
				},
				{
					text: 'Nome',
					value: 'name',
					align: 'center',
				},
				{
					text: 'Email',
					value: 'email',
					align: 'center',
				},
				{
					text: 'Mais info',
					value: 'actions',
					sortable: false,
				},
			],
		},
		newSupplierInfo: {
			firstName: null,
			lastName: null,
			nameRules: [(v) => !!v || 'Campo obrigatório.'],
			email: null,
			emailRules: [
				(v) =>
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
						v
					) || 'O email tem que ser válido.',
			],
			companyName: null,
			companyNameRules: [(v) => !!v || 'Campo obrigatório.'],
			NIF: null,
			nifRules: [(v) => /^\d{9}$/.test(v) || 'Introduza um NIF válido.'],
			IBAN: null,
			ibanRules: [(v) => /^([a-zA-Z]{2}\d{2})?\d{21}$/.test(v) || 'Introduza um IBAN válido.'],
			contacts: [],
			contactValue: null,
			otherContact: false,
			serviceTypes: [],
			validity: false,
			snackbar: {
				show: false,
				message: null,
				timeout: 3000,
				success: false,
				colour: '',
			},
			serviceTypeDialog: {
				show: false,
				validity: false,
				serviceType: null,
				rules: [(v) => !!v || 'Introduza um tipo de serviço.'],
				success: null,
				errorMsg: null,
			},
		},
		owners: [],
		suppliers: [],
		serviceTypes: [],
	}),
	created() {
		this.$emit('update:layout', LayoutDefault);
	},
	mounted() {
		axios.get('//localhost:3333/api/suppliers').then((res) => (this.suppliers = res.data.data));
		axios.get('//localhost:3333/api/users/').then((res) => (this.owners = res.data.data));
		axios
			.get('//localhost:3333/api/service-types/')
			.then((res) => (this.serviceTypes = res.data.data));
	},
	methods: {
		openOwnerInfo(item) {
			Object.assign(this.ownerRowDlog, item);
			this.ownerRowDlog.show = true;
			console.log(item);
		},
		closeOwnerInfo() {
			this.ownerRowDlog.show = false;
		},
		openSupplierInfo(item) {
			Object.assign(this.supplierRowDlog, item);
			this.supplierRowDlog.show = true;
			console.log(item);
		},
		closeSupplierInfo() {
			this.supplierRowDlog.show = false;
		},
		addContactToArray() {
			if (this.newSupplierInfo.contactValue) {
				this.newSupplierInfo.contacts.push(this.newSupplierInfo.contactValue);
			}
			this.newSupplierInfo.otherContact = true;
			this.newSupplierInfo.contactValue = null;
			console.log(this.newSupplierInfo.contacts);
		},
		registerNewServiceType() {
			axios
				.post('//localhost:3333/api/service-types/', {
					service_type: this.newSupplierInfo.serviceTypeDialog.serviceType,
				})
				.then((res) => {
					this.serviceTypes.push(res.data.data);

					this.newSupplierInfo.serviceTypeDialog.success = res.data.message;

					setTimeout(() => {
						this.newSupplierInfo.serviceTypeDialog.success = null;
					}, 3000);

					this.$refs.formNewServiceType.reset();

					console.log(res);
				})
				.catch((err) => {
					this.newSupplierInfo.serviceTypeDialog.errorMsg = err.response.data.error;
					setTimeout(() => {
						this.errorMsg = null;
					}, 3000);
				});
		},
		closeNewServiceTypeDlg() {
			this.newSupplierInfo.serviceTypeDialog.success = null;
			this.newSupplierInfo.serviceTypeDialog.errorMsg = null;
			this.newSupplierInfo.serviceTypeDialog.show = false;
		},
		registerNewSupplier() {
			axios
				.post('//localhost:3333/api/suppliers', {
					first_name: this.newSupplierInfo.firstName,
					last_name: this.newSupplierInfo.lastName,
					email: this.newSupplierInfo.email,
					company_name: this.newSupplierInfo.companyName,
					NIF: this.newSupplierInfo.NIF,
					IBAN: this.newSupplierInfo.IBAN,
					contacts: this.newSupplierInfo.contacts,
					service_types: this.newSupplierInfo.serviceTypes,
				})
				.then((res) => {
					this.newSupplierInfo.snackbar.message = res.data.message;
					this.newSupplierInfo.snackbar.success = true;
					this.newSupplierInfo.snackbar.colour = 'green';
					this.newSupplierInfo.contacts = [];
					this.$refs.formNewSupplier.reset();
					this.newSupplierInfo.snackbar.show = true;
				})
				.catch((err) => {
					this.newSupplierInfo.snackbar.message = err.response.data.message;
					this.newSupplierInfo.snackbar.success = false;
					this.newSupplierInfo.snackbar.colour = 'red';
					this.newSupplierInfo.snackbar.show = true;
				});
		},
	},
};
</script>

<style scoped>
.custom_col {
	flex-grow: 0;
}
.listItem {
	-webkit-user-select: text;
	-moz-user-select: text;
	-ms-user-select: text;
	user-select: text;
}
.v-list-item__icon {
	margin-right: 16px !important;
}
.v-subheader {
	height: 0;
}
</style>
