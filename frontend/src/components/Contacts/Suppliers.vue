<template>
	<div>
		<!-- SEARCH BAR -->
		<v-row justify="center" align="end" class="mt-8">
			<v-col cols="5">
				<v-text-field
					v-model="suppliersTableOptions.search"
					append-icon="mdi-magnify"
					label="Search"
					single-line
					hide-details
					color="secondary"
				></v-text-field>
			</v-col>
			<v-col cols="1" class="pb-1">
				<v-row justify="end">
					<v-menu v-model="downloadSuppliersMenu" :close-on-content-click="false" offset-y>
						<template v-slot:activator="{ on }">
							<v-btn icon v-on="on">
								<v-icon color="secondary">
									mdi-download
								</v-icon>
							</v-btn>
						</template>

						<v-card width="175">
							<v-container>
								<v-row justify="center">
									<v-btn
										color="secondary"
										text
										@click="saveFile(suppliers, 'fornecedores', true)"
										>JSON</v-btn
									>
									<v-btn
										color="secondary"
										text
										@click="saveFile(suppliers, 'fornecedores', false)"
										>CSV</v-btn
									>
								</v-row>
								<v-row justify="center" align="end">
									<v-btn text @click="downloadSuppliersMenu = false" color="red">
										Fechar
									</v-btn>
								</v-row>
							</v-container>
						</v-card>
					</v-menu>
				</v-row>
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
					class="elevation-0"
					@page-count="suppliersTableOptions.pageCount = $event"
					:sort-by="['company_name']"
					:sort-desc="[false]"
					item-key="name"
				>
					<template v-slot:item.actions="props">
						<v-icon class="mr-2" @click="openSupplierInfo(props.item)">
							mdi-plus
						</v-icon>
						<v-icon small class="mr-2" @click="editItem(props.item)">
							mdi-pencil
						</v-icon>
						<v-icon small @click="deleteItem(props.item)">
							mdi-delete
						</v-icon>
					</template>
				</v-data-table>

				<v-dialog v-model="editDialog" max-width="650px" persistent>
					<v-card>
						<v-card-title>
							<span class="headline">{{ editedItem.name }}</span>
						</v-card-title>

						<v-card-text>
							<v-container>
								<v-row>
									<v-col cols="12" md="6">
										<v-text-field
											v-model="editedItem.first_name"
											label="Primeiro Nome"
											color="secondary"
										></v-text-field>
									</v-col>
									<v-col cols="12" md="6">
										<v-text-field
											v-model="editedItem.last_name"
											label="Último Nome"
											color="secondary"
										></v-text-field>
									</v-col>
									<v-col cols="12" md="6">
										<v-text-field
											v-model="editedItem.email"
											label="Email"
											color="secondary"
										></v-text-field>
									</v-col>
									<v-col cols="12" md="6">
										<v-text-field
											v-model="editedItem.company_name"
											label="Nome da Empresa"
											color="secondary"
										></v-text-field>
									</v-col>
									<v-col cols="12" md="6">
										<v-text-field
											v-model="editedItem.NIF"
											label="NIF"
											color="secondary"
										></v-text-field>
									</v-col>
									<v-col cols="12" md="6">
										<v-text-field
											v-model="editedItem.IBAN"
											label="IBAN"
											color="secondary"
										></v-text-field>
									</v-col>
									<v-col cols="6">
										<v-text-field
											v-model="editedItem.contactValue"
											label="Contacto"
											color="secondary"
											:append-icon="`mdi-plus`"
											@click:append="addContactToArray"
											@keydown.enter="addContactToArray"
										>
										</v-text-field>
										<v-list dense>
											<v-list-item v-for="(c, i) in editedItem.contacts" :key="i">
												<v-list-item-icon>
													<v-icon small>mdi-phone</v-icon>
												</v-list-item-icon>
												<v-list-item-content>
													<v-list-item-subtitle>
														{{ c.phone_number }}
													</v-list-item-subtitle>
												</v-list-item-content>
												<v-list-item-action class="my-0">
													<v-btn x-small icon @click="deleteSupplierContact(i)">
														<v-icon>mdi-delete</v-icon>
													</v-btn>
												</v-list-item-action>
											</v-list-item>
										</v-list>
									</v-col>

									<v-col cols="6">
										<v-select
											v-model="editedItem.selectedServiceType"
											:items="serviceTypes"
											label="Tipo de Serviço"
											item-text="service_type"
											item-value="id"
											color="secondary"
											item-color="secondary"
											@input="addServiceTypeToSupplier"
										></v-select>
										<v-list dense>
											<v-list-item v-for="(s, i) in editedItem.service_types" :key="i">
												<v-list-item-icon>
													<v-icon small>mdi-hammer-wrench</v-icon>
												</v-list-item-icon>
												<v-list-item-content>
													<v-list-item-subtitle>
														{{ s.service_type }}
													</v-list-item-subtitle>
												</v-list-item-content>
												<v-list-item-action class="my-0">
													<v-btn x-small icon @click="deleteSupplierST(i)">
														<v-icon>mdi-delete</v-icon>
													</v-btn>
												</v-list-item-action>
											</v-list-item>
										</v-list>
									</v-col>
								</v-row>
								<v-row justify="center">
									<v-alert
										v-if="editItemSuccess"
										class="mb-3"
										text
										type="success"
										transition="fade-transition"
									>
										{{ editItemSuccess }}
									</v-alert>

									<v-alert
										v-else-if="editItemErrorMsg"
										class="mb-3"
										text
										type="error"
										transition="fade-transition"
									>
										{{ editItemErrorMsg }}
									</v-alert>
								</v-row>
							</v-container>
						</v-card-text>

						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="red" text @click="close">Fechar</v-btn>
							<v-btn color="secondary" text @click="updateSupplier">Atualizar</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>

				<v-dialog v-model="supplierRowDlog.show" max-width="650px">
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
											<v-list-item-title>{{ supplierRowDlog.NIF }}</v-list-item-title>
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
													v-text="st.service_type"
												></v-list-item-title>
											</v-list-item-content>
										</v-list-item>
									</v-list>
								</v-col>
								<v-col cols="6">
									<v-list disabled>
										<v-subheader>Contacto</v-subheader>
										<v-list-item v-for="(ctct, i) in supplierRowDlog.contacts" :key="i">
											<v-list-item-icon>
												<v-icon>mdi-phone</v-icon>
											</v-list-item-icon>
											<v-list-item-content>
												<v-list-item-title
													class="listItem"
													v-text="ctct.phone_number"
												></v-list-item-title>
											</v-list-item-content>
										</v-list-item>
									</v-list>
								</v-col>
							</v-row>
							<v-row class="mr-2">
								<v-spacer></v-spacer>
								<v-btn color="red" text @click="closeSupplierInfo">
									Fechar
								</v-btn>
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
		<v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout" top :color="snackbar.colour">
			{{ snackbar.message }}
			<v-icon v-if="snackbar.success"> mdi-checkbox-marked-circle</v-icon>
			<v-icon v-else>
				mdi-cancel
			</v-icon>
		</v-snackbar>
	</div>
</template>

<script>
import axios from 'axios';
import { Parser, transforms } from 'json2csv';

export default {
	name: 'Suppliers',
	data: () => ({
		downloadSuppliersMenu: false,

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
					text: 'Ações',
					value: 'actions',
					sortable: false,
					align: 'center',
				},
			],
		},

		snackbar: {
			show: false,
			message: null,
			timeout: 3500,
			success: false,
			colour: '',
		},

		editDialog: false,
		editedIndex: -1,
		editedItem: {
			first_name: '',
			last_name: '',
			company_name: '',
			email: '',
			IBAN: '',
			NIF: '',
			service_types: [],
			contacts: [],

			contactValue: null,
			otherContact: false,

			selectedServiceType: null,
		},

		editItemSuccess: null,
		editItemErrorMsg: null,

		suppliers: [],
		serviceTypes: [],
	}),
	created() {},
	mounted() {
		axios.get('//localhost:3333/api/suppliers').then((res) => (this.suppliers = res.data.data));
		axios
			.get('//localhost:3333/api/service-types/')
			.then((res) => (this.serviceTypes = res.data.data));
	},
	methods: {
		async addServiceTypeToSupplier() {
			//console.log(this.editedItem.selectedServiceType);
			if (this.editedItem.selectedServiceType) {
				await axios
					.put(`http://localhost:3333/api/suppliers/${this.editedItem.id}/add-service-type`, {
						service_type_id: this.editedItem.selectedServiceType,
					})
					.then((res) => {
						this.editedItem.service_types.push(res.data.data);
						//console.log(res);
					});
				//	.catch((err) => console.log(err));
			}
			this.editedItem.selectedServiceType = null;
			//console.log(this.editedItem.service_types);
		},

		addContactToArray() {
			if (this.editedItem.contactValue) {
				axios
					.put(`http://localhost:3333/api/suppliers/${this.editedItem.id}/add-contact`, {
						phone_number: this.editedItem.contactValue,
					})
					.then((res) => {
						this.editedItem.contacts.push(res.data.data);
						//	console.log(res);
					});
				//.catch((err) => console.log(err));
			}
			this.editedItem.otherContact = true;
			this.editedItem.contactValue = null;
			//	console.log(this.editedItem.contacts);
		},

		deleteSupplierST(index) {
			axios
				.put(`http://localhost:3333/api/suppliers/${this.editedItem.id}/delete-service-type`, {
					service_type_id: this.editedItem.service_types[index].id,
				})
				.then(() => {
					this.editedItem.service_types.splice(index, 1);
					//	console.log(res);
				});
			//.catch((err) => console.log(err));
		},

		deleteSupplierContact(index) {
			axios
				.put(`http://localhost:3333/api/suppliers/${this.editedItem.id}/delete-contact`, {
					contact_id: this.editedItem.contacts[index].id,
				})
				.then(() => {
					this.editedItem.contacts.splice(index, 1);
					//console.log(res);
				});
			//.catch((err) => console.log(err));
		},

		deleteItem(item) {
			const index = this.suppliers.indexOf(item);

			confirm('Are you sure you want to delete this item?') &&
				axios
					.delete(`http://localhost:3333/api/suppliers/${item.id}`)
					.then((res) => {
						this.suppliers.splice(index, 1);

						this.snackbar.message = res.data.message;
						this.snackbar.success = true;
						this.snackbar.colour = 'green';
						this.snackbar.show = true;
						//	console.log(res);
					})
					.catch((err) => {
						this.snackbar.message = err.response.data.error;
						this.snackbar.success = false;
						this.snackbar.colour = 'red';
						this.snackbar.show = true;
						//	console.log(err.response.data.error);
					});
		},

		updateSupplier() {
			axios
				.put(`http://localhost:3333/api/suppliers/${this.editedItem.id}`, {
					first_name: this.editedItem.first_name,
					last_name: this.editedItem.last_name,
					email: this.editedItem.email,
					company_name: this.editedItem.company_name,
					NIF: this.editedItem.NIF,
					IBAN: this.editedItem.IBAN,
				})
				.then((res) => {
					this.editItemSuccess = res.data.message;

					setTimeout(() => {
						this.editItemSuccess = null;
					}, 3000);

					//	console.log(res);
				})
				.catch((err) => {
					this.editItemErrorMsg = err.response.data.error;
					setTimeout(() => {
						this.editItemErrorMsg = null;
					}, 3000);

					//	console.log(err);
				});
		},

		close() {
			this.editDialog = false;
			this.$nextTick(() => {
				this.editedIndex = -1;
			});
		},

		editItem(item) {
			this.editedIndex = this.suppliers.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.editDialog = true;
			// console.log(this.editedIndex);
			// console.log(this.editedItem);
		},

		openSupplierInfo(item) {
			Object.assign(this.supplierRowDlog, item);
			this.supplierRowDlog.show = true;
			//console.log(item);
		},

		closeSupplierInfo() {
			this.supplierRowDlog.show = false;
		},

		/**
		 * saveFile - downloads all relevant info in both JSON and CSV
		 *
		 * data - the data from the response from the API
		 * filename - name of file to be downloaded
		 * json - true if it is, false if CSV
		 */
		saveFile: function(data, filename, json) {
			if (json) {
				const jsonData = JSON.stringify(data, null, '\t');
				const blob = new Blob([jsonData], { type: 'application/json' });
				const a = document.createElement('a');
				a.download = `${filename}.json`;
				a.href = window.URL.createObjectURL(blob);
				a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
				document.body.appendChild(a);
				a.click();
			} else {
				let fields = [
					{ label: 'ID', value: 'id' },
					{ label: 'Nome', value: 'name' },
					{ label: 'Email', value: 'email' },
					{ label: 'IBAN', value: 'IBAN' },
					{ label: 'NIF', value: 'NIF' },
					{ label: 'Empresa', value: 'company_name' },
					{ label: 'Tipo de Serviço', value: 'service_types.service_type' },
					{ label: 'Contacto', value: 'contacts.phone_number' },
				];
				const { unwind } = transforms;

				let json2csvParser = new Parser({
					fields,
					transforms: [
						unwind({
							paths: ['service_types', 'contacts'],
						}),
					],
				});

				const csv = json2csvParser.parse(data);
				const blob = new Blob([csv], { type: 'text/csv' });
				const a = document.createElement('a');
				a.download = `${filename}.csv`;
				a.href = window.URL.createObjectURL(blob);
				a.dataset.downloadurl = ['text/csv', a.download, a.href].join(':');
				document.body.appendChild(a);
				a.click();
			}
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
