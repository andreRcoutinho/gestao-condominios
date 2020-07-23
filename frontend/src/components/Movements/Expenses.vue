<template>
	<div>
		<v-row justify="center" align="end" class="mt-8">
			<v-col cols="1" class="pb-1">
				<v-menu
					ref="expensesDateMenu"
					v-model="showExpsPicker"
					:close-on-content-click="true"
					transition="slide-y-transition"
					offset-y
					auto
					min-width="290px"
					:return-value.sync="expsSelectedDate"
				>
					<template v-slot:activator="{ on }">
						<v-row justify="start">
							<v-btn icon v-on="on">
								<v-icon color="secondary">mdi-calendar</v-icon>
							</v-btn>
						</v-row>
					</template>
					<v-date-picker
						ref="expensesYearPicker"
						v-model="expsSelectedDate"
						@input="showInfoByYear()"
						reactive
						no-title
						color="secondary"
						min="2018"
						:max="new Date().toISOString().substring(0, 7)"
					>
					</v-date-picker>
				</v-menu>
			</v-col>
			<v-col cols="5">
				<v-text-field
					v-model="expensesTableOptions.search"
					append-icon="mdi-magnify"
					label="Search"
					single-line
					hide-details
					color="secondary"
					class="mt-8"
				></v-text-field>
			</v-col>
			<v-col cols="1" class="pb-1">
				<v-row justify="end">
					<v-menu v-model="downloadAnualExpsInfoMenu" :close-on-content-click="false" offset-y>
						<template v-slot:activator="{ on }">
							<v-btn icon v-on="on">
								<v-icon color="secondary">
									mdi-download
								</v-icon>
							</v-btn>
						</template>

						<v-card>
							<v-row>
								<v-menu
									v-model="showAnualExpsDownloadPicker"
									:close-on-content-click="true"
									transition="slide-y-transition"
									offset-y
									min-width="290px"
									:nudge-right="13"
									:return-value.sync="anualExpsDownloadSelectedDate"
								>
									<template v-slot:activator="{ on }">
										<v-row justify="center" class="mt-4">
											<v-btn depressed v-on="on">
												Escolher ano
												<v-icon right color="secondary">mdi-calendar</v-icon>
											</v-btn>
										</v-row>
									</template>
									<v-date-picker
										ref="anualExpsDownloadYearPicker"
										v-model="anualExpsDownloadSelectedDate"
										@input="showInfoByYear(true)"
										reactive
										no-title
										color="secondary"
										min="2018"
										:max="new Date().toISOString().substring(0, 7)"
									>
									</v-date-picker>
								</v-menu>
							</v-row>
							<v-card-actions>
								<v-btn text @click="downloadAnualExpsInfoMenu = false" color="red"
									>Fechar</v-btn
								>
								<v-spacer></v-spacer>

								<v-btn
									color="secondary"
									text
									@click="saveFile(expensesToDownload, 'despesas', true)"
									>JSON</v-btn
								>
								<v-btn
									color="secondary"
									text
									@click="saveFile(expensesToDownload, 'despesas', false)"
									>CSV</v-btn
								>
							</v-card-actions>
						</v-card>
					</v-menu>
				</v-row>
			</v-col>
		</v-row>
		<!-- TABLE -->
		<v-row justify="space-around">
			<v-col xl="8" lg="9" md="12">
				<v-data-table
					:headers="expensesTableOptions.headers"
					:items="expenses"
					:search="expensesTableOptions.search"
					hide-default-footer
					:page.sync="expensesTableOptions.page"
					:items-per-page="expensesTableOptions.itemsPerPage"
					class="elevation-0"
					@page-count="expensesTableOptions.pageCount = $event"
					:sort-by="['expense_date']"
					:sort-desc="[true]"
				>
					<template v-slot:item.expense_date="{ item }">
						<span>{{ item.expense_date | formatDate }}</span>
					</template>
					<template v-slot:item.payment_record_date="{ item }">
						<span>{{ item.payment_record_date | formatDate }}</span>
					</template>
					<template v-slot:item.value="{ item }">
						<span>{{ item.value }} €</span>
					</template>
					<template #item.full_name="{ item }">
						{{ item.supplier.first_name }} {{ item.supplier.last_name }}
					</template>

					<template v-slot:item.actions="props">
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
							<span class="headline">Atualizar Despesa</span>
						</v-card-title>

						<v-card-text>
							<v-container>
								<v-row>
									<v-col cols="12" md="6">
										<v-text-field
											v-model="editedItem.description"
											label="Tipo de Despesa"
											color="secondary"
										></v-text-field>
									</v-col>
									<v-col cols="12" md="6">
										<v-text-field
											v-model.number="editedItem.value"
											label="Valor"
											color="secondary"
										></v-text-field>
									</v-col>
									<v-col cols="12" md="6">
										<v-menu
											v-model="menu"
											:close-on-content-click="false"
											transition="slide-y-transition"
											min-width="290px"
										>
											<template v-slot:activator="{ on, attrs }">
												<v-text-field
													v-model="editedItem.expense_date"
													label="Data da Despesa"
													readonly
													v-bind="attrs"
													v-on="on"
													color="secondary"
												></v-text-field>
											</template>
											<v-date-picker
												v-model="editedItem.expense_date"
												@input="menu = false"
												color="secondary"
												show-current
											></v-date-picker>
										</v-menu>
									</v-col>

									<v-col cols="6">
										<v-select
											v-model="editedItem.supplier"
											:items="suppliers"
											label="Fornecedores"
											item-text="name"
											item-value="id"
											color="secondary"
											item-color="secondary"
										></v-select>
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
							<v-btn color="secondary" text @click="updateExpense">Atualizar</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>

				<div class="text-center pt-3">
					<v-pagination
						v-model="expensesTableOptions.page"
						:length="expensesTableOptions.pageCount"
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
	name: 'Expenses',
	data: () => ({
		expsSelectedDate: null,
		showExpsPicker: '',

		downloadAnualExpsInfoMenu: false,
		anualExpsDownloadSelectedDate: null,
		showAnualExpsDownloadPicker: '',
		expensesToDownload: [],

		expensesTableOptions: {
			search: '',
			page: 1,
			pageCount: 0,
			itemsPerPage: 10,
			headers: [
				{
					text: 'Empresa',
					value: 'supplier.company_name',
					align: 'center',
				},
				{
					text: 'Fornecedor',
					value: 'full_name',
					align: 'center',
				},
				{ text: 'Valor', value: 'value', align: 'center' },
				{ text: 'Tipo de Despesa', value: 'description', sortable: false, align: 'center' },
				{ text: 'Data da Despesa', value: 'expense_date', align: 'center' },
				{ text: 'Data de Registo de Pagamento', value: 'payment_record_date', align: 'center' },
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
		menu: false,
		editedIndex: -1,
		editedItem: {
			value: 0,
			valueRules: [
				(v) => !!v || 'Introduza uma quantia.',
				(v) => /^\d+(\.\d{1,2})?$/.test(v) || 'A quantia tem que ter um formato válido.',
			],
			description: '',
			expense_date: '',
			supplier: null,
		},

		editItemSuccess: null,
		editItemErrorMsg: null,

		expenses: [],
		suppliers: [],
	}),

	mounted() {
		axios
			.get(`//localhost:3333/api/expenses?year=${new Date().toISOString().substr(0, 4)}`)
			.then((res) => {
				this.expenses = res.data.data;
			});

		axios
			.get(`http://localhost:3333/api/suppliers/`)
			.then((res) => (this.suppliers = res.data.data));
	},

	watch: {
		showExpsPicker(val) {
			val && this.$nextTick(() => (this.$refs.expensesYearPicker.activePicker = 'YEAR'));
		},

		showAnualExpsDownloadPicker(val) {
			val &&
				this.$nextTick(() => (this.$refs.anualExpsDownloadYearPicker.activePicker = 'YEAR'));
		},
	},

	methods: {
		updateExpense() {
			axios
				.put(`http://localhost:3333/api/expenses/${this.editedItem.id}`, {
					value: this.editedItem.value,
					description: this.editedItem.description,
					expense_date: this.editedItem.expense_date.substring(0, 10),
					supplier_id: this.editedItem.supplier.id,
				})
				.then((res) => {
					this.editItemSuccess = res.data.message;

					setTimeout(() => {
						this.editItemSuccess = null;
					}, 3000);

					//console.log(res);
				})
				.catch((err) => {
					this.editItemErrorMsg = err.response.data.error;
					setTimeout(() => {
						this.editItemErrorMsg = null;
					}, 3000);

					//console.log(err);
				});
		},

		close() {
			this.editDialog = false;
			this.$nextTick(() => {
				this.editedIndex = -1;
			});
		},

		editItem(item) {
			this.editedIndex = this.expenses.indexOf(item);
			let formatDate = item.expense_date.substr(0, 10);
			item.expense_date = formatDate;
			this.editedItem = Object.assign({}, item);
			this.editDialog = true;
			// console.log(this.editedIndex);
			// console.log(this.editedItem);
		},

		deleteItem(item) {
			const index = this.expenses.indexOf(item);

			confirm('Are you sure you want to delete this item?') &&
				axios
					.delete(`http://localhost:3333/api/expenses/${item.id}`)
					.then((res) => {
						this.expenses.splice(index, 1);

						this.snackbar.message = res.data.message;
						this.snackbar.success = true;
						this.snackbar.colour = 'green';
						this.snackbar.show = true;
						//console.log(res);
					})
					.catch((err) => {
						this.snackbar.message = err.response.data.error;
						this.snackbar.success = false;
						this.snackbar.colour = 'red';
						this.snackbar.show = true;
						//console.log(err.response.data.error);
					});
		},

		showInfoByYear: function(toDownload) {
			if (toDownload) {
				let year = this.anualExpsDownloadSelectedDate.substr(0, 4);
				axios
					.get(`//localhost:3333/api/expenses?year=${year}`)
					.then((res) => (this.expensesToDownload = res.data.data))
					.catch(() => {
						//	console.log(err.response.data.error);
						this.expensesToDownload = [];
					});

				this.$refs.anualExpsDownloadYearPicker.activePicker = 'YEAR';
				this.showAnualExpsDownloadPicker = false;
			} else {
				axios
					.get(`//localhost:3333/api/expenses?year=${this.expsSelectedDate.substr(0, 4)}`)
					.then((res) => (this.expenses = res.data.data))
					.catch(() => {
						//	console.log(err.response.data.error);
						this.expenses = [];
					});

				this.$refs.expensesYearPicker.activePicker = 'YEAR';
				this.showExpsPicker = false;
			}
		},
		/**
		 * saveFile - downloads all relevant info in both JSON and CSV
		 *
		 * data - the data from the response from the API
		 * filename - name of file to be downloaded
		 * json - true if it is, false if CSV
		 */
		saveFile: function(data, filename, json) {
			this.downloadAnualExpsInfoMenu = false;

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
					{ label: 'Descrição', value: 'description' },
					{ label: 'Valor', value: 'value' },
					{ label: 'Data da Despesa', value: 'expense_date' },
					{ label: 'Data de Registo de Pagamento', value: 'payment_record_date' },
					{ label: 'Fornecedor - ID', value: 'supplier.id' },
					{ label: 'Fornecedor - Primeiro Nome', value: 'supplier.first_name' },
					{ label: 'Fornecedor - Último Nome', value: 'supplier.last_name' },
					{ label: 'Fornecedor - Email', value: 'supplier.email' },
					{ label: 'Fornecedor - NIF', value: 'supplier.NIF' },
					{ label: 'Fornecedor - IBAN', value: 'supplier.IBAN' },
					{ label: 'Fornecedor - Empresa', value: 'supplier.company_name' },
					{
						label: 'Fornecedor - Tipo de Serviço',
						value: 'supplier.service_types.service_type',
					},
				];
				const { unwind } = transforms;

				let json2csvParser = new Parser({
					fields,
					transforms: [
						unwind({
							paths: ['supplier', 'supplier.service_types'],
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

<style scoped></style>
