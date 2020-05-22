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
				<v-row justify="space-around">
					<v-col cols="8">
						<!-- TODO - CHANGE TO DATA TABLE -->
						<v-simple-table>
							<template v-slot:default>
								<thead>
									<tr>
										<th class="text-center">Parcela</th>
										<th class="text-center">Valor</th>
										<th class="text-center">Mapa de Pagamento</th>
										<th class="text-center">Mês Referente</th>
										<th class="text-center">Data de Pagamento</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item, index) in revenues" :key="index">
										<td class="text-center">{{ item.unit }}</td>
										<td class="text-center">{{ item.value }}</td>
										<td class="text-center">{{ item.payment_map_name }}</td>
										<td class="text-center">{{ monthNumberToString(item.month) }}</td>
										<td class="text-center">{{ item.payment_date | formatDate }}</td>
									</tr>
								</tbody>
							</template>
						</v-simple-table>
					</v-col>
				</v-row>
			</v-tab-item>
			<!-- DESPESAS -->
			<v-tab-item>
				<v-row justify="center">
					<v-col cols="6">
						<v-text-field
							v-model="expensesTableOptions.search"
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
													item-value="id"
													label="Mapa de Pagamento"
													color="#949494"
													item-color="blue"
													:rules="d1Info.pmRules"
													required
												>
												</v-select>
											</v-col>

											<v-col cols="12">
												<v-select
													v-model="d1Info.unit"
													:items="units"
													item-text="unit"
													item-value="id"
													label="Fração"
													color="#949494"
													item-color="blue"
													:rules="d1Info.unitRules"
													required
												>
												</v-select>
											</v-col>

											<v-col cols="12">
												<v-row justify="center">
													<!-- TODO - DATEPICKER ONLY TO ANUAL MAP -->
													<v-date-picker
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
		dialog1: false,
		d1Info: {
			paymentMap: null,
			pmRules: [(v) => !!v || 'Escolha um mapa de pagamento.'],
			// TODO - UNITS SHOULD LOAD DEPENDING ON THE CHOSEN PAYMENT MAP
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
			beginYear: `${new Date().getFullYear().toString()}-01`,
			endYear: `${new Date().getFullYear().toString()}-12`,
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
				//TODO - € symbol after
				{ text: 'Valor', value: 'value', align: 'center' },
				{ text: 'Tipo de Despesa', value: 'description', sortable: false, align: 'center' },
				{ text: 'Data de Pagamento', value: 'payment_date', align: 'center' },
			],
		},
		revenues: [],
		paymentMaps: [],
		expenses: [],
		suppliers: [],
		units: [],
		formValidity: false,
		success: null,
		errorMsg: null,
	}),
	created() {
		this.$emit('update:layout', LayoutDefault);
	},
	mounted() {
		axios.get('//localhost:3333/api/expenses').then((res) => (this.expenses = res.data.data));
		axios.get('//localhost:3333/api/suppliers').then((res) => (this.suppliers = res.data.data));
		axios
			.get('//localhost:3333/api/payment_map')
			.then((res) => (this.paymentMaps = res.data.data));
		axios.get('//localhost:3333/api/units').then((res) => (this.units = res.data.data));
		axios.get('//localhost:3333/api/revenue').then((res) => (this.revenues = res.data.data));
	},
	methods: {
		monthNumberToString(monthNumber) {
			let months = this.d1Info.months;
			let correctMonth = '';
			for (let i = 0; i < months.length; i++) {
				if (months.indexOf(months[i]) === monthNumber - 1) {
					correctMonth = months[i];
				}
			}
			return correctMonth;
		},
		payMapText: (item) => item.name + ': ' + item.description,
		registerNewExpense() {
			axios
				.post('//localhost:3333/api/expenses', {
					supplier_id: this.d2Info.supplier,
					value: this.d2Info.value,
					description: this.d2Info.desc,
					payment_date: moment().format('L LTS'),
				})
				.then((res) => {
					this.success = res.data.message;

					setTimeout(() => {
						this.success = null;
					}, 3000);

					this.$refs.formExpense.reset();

					console.log(res);
				})
				.catch((err) => {
					this.errorMsg = err.response.data.error;
					setTimeout(() => {
						this.errorMsg = null;
					}, 3000);
				});
		},
		registerNewRevenue() {
			let formatedMonths = this.d1Info.checkedMonths.map((elem) => {
				return +elem.slice(5, 7);
			});

			//se payment_map selecionado não for anual, mês vai a 0
			if (formatedMonths.length === 0) {
				formatedMonths = 0;
			}

			axios
				.post('//localhost:3333/api/revenue', {
					payment_map_id: this.d1Info.paymentMap,
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

					console.log(res);
				})
				.catch((err) => {
					this.errorMsg = err.response.data.error;
					setTimeout(() => {
						this.errorMsg = null;
					}, 3000);
				});
		},
		close2() {
			this.$refs.formExpense.reset();
			this.success = null;
			this.errorMsg = null;
			this.dialog2 = false;
		},
		close1() {
			this.$refs.formRevenue.reset();
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
