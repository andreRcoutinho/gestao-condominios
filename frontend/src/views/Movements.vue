<template>
	<div class="movements">
		<v-tabs v-model="tab" grow color="black">
			<v-tab v-for="(t, index) in tabs" :key="`${index}-${t.tab}`">
				{{ t.tab }}
			</v-tab>
		</v-tabs>

		<v-tabs-items v-model="tab">
			<!-- RECEITAS -->
			<v-tab-item>
				<v-row justify="center" align="end" class="mt-8">
					<v-col cols="1" class="pb-1">
						<v-menu
							ref="revenuesDateMenu"
							v-model="showRevsPicker"
							:close-on-content-click="true"
							transition="slide-y-transition"
							offset-y
							auto
							min-width="290px"
							:return-value.sync="revsSelectedDate"
						>
							<template v-slot:activator="{ on }">
								<v-row justify="start">
									<v-btn icon v-on="on">
										<v-icon color="secondary">mdi-calendar</v-icon>
									</v-btn>
								</v-row>
							</template>
							<v-date-picker
								ref="revenuesYearPicker"
								v-model="revsSelectedDate"
								@input="save('revenues')"
								reactive
								no-title
								color="secondary"
								min="2018"
								:max="new Date().toISOString().substring(0, 7)"
							>
							</v-date-picker>
						</v-menu>
						<!-- <v-overlay :value="overlay" opacity="0.75">
							<v-row class="display-1 font-weight-black">
								{{ selectDateErrorMsg }}
								<v-icon right x-large @click="overlay = false">mdi-close</v-icon>
							</v-row>
						</v-overlay> -->
					</v-col>
					<v-col cols="5">
						<v-text-field
							v-model="revenuesTableOptions.search"
							append-icon="mdi-magnify"
							label="Search"
							single-line
							hide-details
							color="secondary"
						></v-text-field>
					</v-col>
					<v-col cols="1" class="pb-1">
						<v-row justify="end">
							<v-btn icon @click="saveFile(revenues, 'receitas')">
								<v-icon color="secondary">
									mdi-download
								</v-icon>
							</v-btn>
						</v-row>
					</v-col>
				</v-row>
				<v-row justify="space-around">
					<v-col cols="8">
						<v-data-table
							:headers="revenuesTableOptions.headers"
							:items="revenues"
							:search="revenuesTableOptions.search"
							hide-default-footer
							:page.sync="revenuesTableOptions.page"
							:items-per-page="revenuesTableOptions.itemsPerPage"
							class="elevation-1"
							@page-count="revenuesTableOptions.pageCount = $event"
							:sort-by="['payment_date']"
							:sort-desc="[true]"
						>
							<!-- no-data-text="Não existem receitas registadas!" -->
							<template v-slot:item.payment_date="{ item }">
								<span>{{ item.payment_date | formatDate }}</span>
							</template>
							<template v-slot:item.month="{ item }">
								<span>{{ monthNumberToString(item.month) }}</span>
							</template>
							<template v-slot:item.value="{ item }">
								<span>{{ item.value }} €</span>
							</template>
						</v-data-table>
						<div class="text-center pt-3">
							<v-pagination
								v-model="revenuesTableOptions.page"
								:length="revenuesTableOptions.pageCount"
								:total-visible="7"
								color="secondary"
							></v-pagination>
						</div>
					</v-col>
				</v-row>
			</v-tab-item>
			<!-- DESPESAS -->
			<v-tab-item>
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
								@input="save('expenses')"
								reactive
								no-title
								color="secondary"
								min="2018"
								:max="new Date().toISOString().substring(0, 7)"
							>
							</v-date-picker>
						</v-menu>
						<!-- <v-overlay :value="overlay" opacity="0.75">
							<v-row class="display-1 font-weight-black">
								{{ selectDateErrorMsg }}
								<v-icon right x-large @click="overlay = false">mdi-close</v-icon>
							</v-row>
						</v-overlay> -->
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
							<v-btn icon @click="saveFile(expenses, 'despesas')">
								<v-icon color="secondary">
									mdi-download
								</v-icon>
							</v-btn>
						</v-row>
					</v-col>
				</v-row>
				<v-row justify="space-around">
					<v-col cols="8">
						<v-data-table
							:headers="expensesTableOptions.headers"
							:items="expenses"
							:search="expensesTableOptions.search"
							hide-default-footer
							:page.sync="expensesTableOptions.page"
							:items-per-page="expensesTableOptions.itemsPerPage"
							class="elevation-1"
							@page-count="expensesTableOptions.pageCount = $event"
							:sort-by="['payment_date']"
							:sort-desc="[true]"
							:footer-props="{
								firstIcon: 'mdi-arrow-collapse-left',
								lastIcon: 'mdi-arrow-collapse-right',
								showFirstLastPage: true,
							}"
						>
							<template v-slot:item.payment_date="{ item }">
								<span>{{ item.payment_date | formatDate }}</span>
							</template>
							<template v-slot:item.value="{ item }">
								<span>{{ item.value }} €</span>
							</template>
						</v-data-table>
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
			</v-tab-item>
			<!-- NOVO MOVIMENTO -->
			<v-tab-item>
				<v-row justify="center">
					<!-- NOVA RECEITA -->
					<v-col class="custom_col">
						<v-dialog v-model="dialog1" persistent max-width="600px">
							<template v-slot:activator="{ on }" class="text-xs-center">
								<v-btn color="grey" dark v-on="on">
									<v-icon left>mdi-plus-circle</v-icon>Nova Receita
								</v-btn>
							</template>
							<v-card>
								<v-card-title>
									<span class="headline">Receita</span>
								</v-card-title>
								<v-card-text>
									<v-form
										v-model="formValidity"
										ref="formRevenue"
										@submit.prevent="registerNewRevenue"
									>
										<v-row>
											<v-col cols="12">
												<v-select
													v-model="d1Info.paymentMap"
													:items="paymentMaps"
													:item-text="payMapText"
													label="Mapa de Pagamento"
													color="#949494"
													item-color="secondary"
													required
													return-object
													@change="loadPMapInfo"
												>
												</v-select>
											</v-col>

											<v-col cols="12">
												<v-select
													v-model="d1Info.unit"
													:items="d1Info.paymentMapUnits[0]"
													item-text="unit"
													item-value="id"
													label="Fração"
													color="#949494"
													item-color="secondary"
													:rules="d1Info.unitRules"
													required
												>
												</v-select>
											</v-col>

											<v-col cols="12" v-if="d1Info.paymentMap !== null">
												<v-row justify="center">
													<!-- DATEPICKER ONLY TO ANUAL MAP -->
													<v-date-picker
														v-if="d1Info.paymentMap.yearly == true"
														v-model="d1Info.checkedMonths"
														type="month"
														header-color="secondary"
														multiple
														no-title
														:min="d1Info.beginYear"
														:max="d1Info.endYear"
													></v-date-picker>
												</v-row>
											</v-col>

											<v-col>
												<v-alert
													v-if="success"
													class="mb-3"
													text
													type="success"
													transition="fade-transition"
												>
													{{ success }}
												</v-alert>

												<v-alert
													v-else-if="errorMsg"
													class="mb-3"
													text
													type="error"
													transition="fade-transition"
												>
													{{ errorMsg }}
												</v-alert>
											</v-col>
										</v-row>
										<v-row>
											<v-spacer></v-spacer>
											<v-btn color="blue darken-1" text @click="close1">Fechar</v-btn>
											<v-btn
												color="blue darken-1"
												text
												type="submit"
												:disabled="!formValidity"
											>
												Registar
											</v-btn>
										</v-row>
									</v-form>
								</v-card-text>
							</v-card>
						</v-dialog>
					</v-col>

					<!-- NOVA DESPESA -->
					<v-col class="custom_col">
						<v-dialog v-model="dialog2" persistent max-width="600px">
							<template v-slot:activator="{ on }" class="text-xs-center">
								<v-btn color="grey" dark v-on="on">
									<v-icon left>mdi-plus-circle</v-icon>Nova Despesa
								</v-btn>
							</template>
							<v-card>
								<v-card-title>
									<span class="headline">Despesa</span>
								</v-card-title>
								<v-card-text>
									<v-form
										v-model="formValidity"
										ref="formExpense"
										@submit.prevent="registerNewExpense"
									>
										<v-row>
											<v-col cols="12">
												<v-select
													v-model="d2Info.supplier"
													:items="suppliers"
													item-text="name"
													item-value="id"
													label="Fornecedor"
													color="#949494"
													item-color="blue"
													:rules="d2Info.supRules"
													required
												>
												</v-select>
											</v-col>

											<v-col cols="12">
												<v-text-field
													v-model="d2Info.desc"
													label="Descrição"
													color="#949494"
													:rules="d2Info.descRules"
													required
												></v-text-field>
											</v-col>

											<v-col cols="12">
												<v-text-field
													v-model.number="d2Info.value"
													label="Valor em €"
													placeholder="0.00"
													color="#949494"
													:rules="d2Info.valueRules"
													required
												></v-text-field>
											</v-col>

											<v-col>
												<v-alert
													v-if="success"
													class="mb-3"
													text
													type="success"
													transition="fade-transition"
												>
													{{ success }}
												</v-alert>

												<v-alert
													v-else-if="errorMsg"
													class="mb-3"
													text
													type="error"
													transition="fade-transition"
												>
													{{ errorMsg }}
												</v-alert>
											</v-col>
										</v-row>
										<v-row>
											<v-spacer></v-spacer>
											<v-btn color="blue darken-1" text @click="close2">Fechar</v-btn>
											<v-btn
												color="blue darken-1"
												text
												type="submit"
												:disabled="!formValidity"
											>
												Registar
											</v-btn>
										</v-row>
									</v-form>
								</v-card-text>
							</v-card>
						</v-dialog>
					</v-col>
				</v-row>
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

import LayoutDefault from '@/layouts/LayoutDefault';

export default {
	name: 'Movements',
	data: () => ({
		tab: null,
		tabs: [{ tab: 'Receitas' }, { tab: 'Despesas' }, { tab: 'Novo Movimento' }],
		revsSelectedDate: null,
		showRevsPicker: '',
		expsSelectedDate: null,
		showExpsPicker: '',
		dialog1: false,
		d1Info: {
			paymentMap: null,
			pmRules: [(v) => !!v || 'Escolha um mapa de pagamento.'],
			unit: null,
			unitRules: [(v) => !!v || 'Escolha uma fração.'],
			checkedMonths: [],
			months: [
				'janeiro',
				'fevereiro',
				'março',
				'abril',
				'maio',
				'junho',
				'julho',
				'agosto',
				'setembro',
				'outubro',
				'novembro',
				'dezembro',
			],
			beginYear: '',
			endYear: '',
			paymentMapUnits: [],
		},
		dialog2: false,
		d2Info: {
			supplier: null,
			supRules: [(v) => !!v || 'Escolha um fornecedor.'],
			desc: '',
			descRules: [(v) => !!v || 'É necessária uma descrição.'],
			value: '',
			valueRules: [
				(v) => !!v || 'Introduza uma quantia.',
				(v) => /^\d+(\.\d{1,2})?$/.test(v) || 'A quantia tem que ter um formato válido.',
			],
		},
		revenuesTableOptions: {
			search: '',
			page: 1,
			pageCount: 0,
			itemsPerPage: 10,
			headers: [
				{
					text: 'Parcela',
					value: 'unit',
					sortable: false,
					align: 'center',
				},
				{ text: 'Valor', value: 'value', align: 'center' },
				{
					text: 'Mapa de Pagamento',
					value: 'payment_map_name',
					sortable: false,
					align: 'center',
				},
				{ text: 'Mês Referente', value: 'month', align: 'center' },
				{ text: 'Data de Pagamento', value: 'payment_date', align: 'center' },
			],
		},
		expensesTableOptions: {
			search: '',
			page: 1,
			pageCount: 0,
			itemsPerPage: 10,
			headers: [
				{
					text: 'Fornecedor',
					value: 'supplier.company_name',
					sortable: false,
					align: 'center',
				},
				{ text: 'Valor', value: 'value', align: 'center' },
				{ text: 'Tipo de Despesa', value: 'description', sortable: false, align: 'center' },
				{ text: 'Data de Pagamento', value: 'payment_date', align: 'center' },
			],
		},
		revenues: [],
		paymentMaps: [],
		expenses: [],
		suppliers: [],
		formValidity: false,
		success: null,
		errorMsg: null,
		// selectDateErrorMsg: null,
		//	overlay: false,
	}),
	created() {
		this.$emit('update:layout', LayoutDefault);
	},
	watch: {
		showRevsPicker(val) {
			val && this.$nextTick(() => (this.$refs.revenuesYearPicker.activePicker = 'YEAR'));
		},
		showExpsPicker(val) {
			val && this.$nextTick(() => (this.$refs.expensesYearPicker.activePicker = 'YEAR'));
		},
	},
	mounted() {
		axios.get('//localhost:3333/api/suppliers').then((res) => (this.suppliers = res.data.data));
		axios.get('//localhost:3333/api/payment_map').then((res) => {
			let data = res.data.data;
			data.forEach((payMap) => {
				// allow movements only with open payment maps
				if (payMap.closed !== true) {
					this.paymentMaps.push(payMap);
				}
			});
		});
		axios
			.get(`//localhost:3333/api/revenue?year=${new Date().toISOString().substr(0, 4)}`)
			.then((res) => (this.revenues = res.data.data));
		axios
			.get(`//localhost:3333/api/expenses?year=${new Date().toISOString().substr(0, 4)}`)
			.then((res) => (this.expenses = res.data.data));
	},
	methods: {
		save(origin) {
			if (origin === 'revenues') {
				axios
					.get(`//localhost:3333/api/revenue?year=${this.revsSelectedDate.substr(0, 4)}`)
					.then((res) => (this.revenues = res.data.data))
					.catch((err) => {
						console.log(err.response.data.error);
						this.revenues = [];
						// this.selectDateErrorMsg = err.response.data.error;
						// this.overlay = !this.overlay;
					});

				this.$refs.revenuesYearPicker.activePicker = 'YEAR';
				this.showRevsPicker = false;
			} else if (origin === 'expenses') {
				axios
					.get(`//localhost:3333/api/expenses?year=${this.expsSelectedDate.substr(0, 4)}`)
					.then((res) => (this.expenses = res.data.data))
					.catch((err) => {
						console.log(err.response.data.error);
						this.expenses = [];
						// this.selectDateErrorMsg = err.response.data.error;
						// this.overlay = !this.overlay;
					});

				this.$refs.expensesYearPicker.activePicker = 'YEAR';
				this.showExpsPicker = false;
			}
		},
		saveFile: function(data, filename) {
			const jsonData = JSON.stringify(data, null, '\t');
			const blob = new Blob([jsonData], { type: 'application/json' });
			const a = document.createElement('a');
			a.download = `${filename}.json`;
			a.href = window.URL.createObjectURL(blob);
			a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
			document.body.appendChild(a);
			a.click();
		},
		/* loadPMapInfo: atualiza as opções no form de registo de nova Receita, mediante o mapa escolhido */
		loadPMapInfo: function() {
			if (this.d1Info.paymentMapUnits.length > 0) {
				this.d1Info.paymentMapUnits = [];
			}

			let selectedMap = this.d1Info.paymentMap;
			if (selectedMap !== null) {
				// define o limite de meses a escolher no v-date-picker
				this.d1Info.beginYear = `${selectedMap.year}-01`;
				this.d1Info.endYear = `${selectedMap.year}-12`;

				axios.get(`//localhost:3333/api/payment_map/${selectedMap.id}`).then((res) => {
					let revenues = res.data.data.revenues;
					// a partir da res de revenues, constroi um obj com pares id-unit
					let units = revenues.map((revObj) => {
						return { unit_id: revObj.unit_id, unit: revObj.unit };
					});

					// elimina os ids duplicados do obj criado anteriormente
					let uniqueUnits = [];
					units.forEach(function(uObj) {
						var i = uniqueUnits.findIndex((x) => x.id == uObj.unit_id);
						if (i <= -1) {
							uniqueUnits.push({ id: uObj.unit_id, unit: uObj.unit });
						}
					});
					// carrega o v-select com as units
					this.d1Info.paymentMapUnits.push(uniqueUnits);
				});
			}
		},
		monthNumberToString: function(monthNumber) {
			let months = this.d1Info.months;
			let correctMonth = '';
			months.forEach((m) => {
				if (months.indexOf(m) === monthNumber - 1) {
					correctMonth = m;
				}
			});
			return correctMonth;
		},
		payMapText: (item) => item.name + ': ' + item.description,
		registerNewExpense: function() {
			axios
				.post('//localhost:3333/api/expenses', {
					supplier_id: this.d2Info.supplier,
					value: this.d2Info.value,
					description: this.d2Info.desc,
					payment_date: moment().format('YYYY-MM-DD'),
				})
				.then((res) => {
					this.success = res.data.message;

					setTimeout(() => {
						this.success = null;
					}, 3000);

					this.$refs.formExpense.reset();

					// console.log(res);
				})
				.catch((err) => {
					this.errorMsg = err.response.data.error;
					setTimeout(() => {
						this.errorMsg = null;
					}, 3000);
				});
		},
		registerNewRevenue: function() {
			let formatedMonths = this.d1Info.checkedMonths.map((elem) => {
				return +elem.slice(5, 7);
			});

			//se payment_map selecionado não for anual, mês vai a 0
			if (formatedMonths.length === 0) {
				formatedMonths = 0;
			}

			axios
				.post('//localhost:3333/api/revenue', {
					payment_map_id: this.d1Info.paymentMap.id,
					unit_id: this.d1Info.unit,
					months: formatedMonths,
					payment_date: moment().format('L LTS'),
				})
				.then((res) => {
					this.success = res.data.message;

					setTimeout(() => {
						this.success = null;
					}, 3000);

					this.$refs.formRevenue.reset();
					this.d1Info.checkedMonths = [];
					this.d1Info.paymentMap = null;
					// console.log(res);
				})
				.catch((err) => {
					this.errorMsg = err.response.data.error;
					setTimeout(() => {
						this.errorMsg = null;
					}, 3000);
				});
		},
		close2: function() {
			this.$refs.formExpense.reset();
			this.success = null;
			this.errorMsg = null;
			this.dialog2 = false;
		},
		close1: function() {
			this.$refs.formRevenue.reset();
			this.d1Info.paymentMap = null;
			this.d1Info.checkedMonths = [];
			this.success = null;
			this.errorMsg = null;
			this.dialog1 = false;
		},
	},
};
</script>

<style>
.custom_col {
	flex-grow: 0;
}
</style>
