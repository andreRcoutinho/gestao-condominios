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
						<v-simple-table>
							<template v-slot:default>
								<thead>
									<tr>
										<th class="text-left">Parcela</th>
										<th class="text-left">Valor</th>
										<th class="text-left">Tipo de Receita</th>
										<th class="text-left">Data de Pagamento</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item, index) in receitas" :key="index">
										<td>{{ item.unit }}</td>
										<td>{{ item.price }}</td>
										<td>{{ item.description }}</td>
										<td>{{ item.date }}</td>
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
							v-model="expensesPagination.search"
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
							:headers="expensesPagination.headers"
							:items="expenses"
							:search="expensesPagination.search"
							hide-default-footer
							:page.sync="expensesPagination.page"
							:items-per-page="expensesPagination.itemsPerPage"
							class="elevation-1"
							@page-count="expensesPagination.pageCount = $event"
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
								v-model="expensesPagination.page"
								:length="expensesPagination.pageCount"
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
									<v-container>
										<v-row>
											<v-col cols="12" sm="6" md="4">
												<v-text-field label="Legal first name*" required></v-text-field>
											</v-col>
											<v-col cols="12" sm="6" md="4">
												<v-text-field
													label="Legal middle name"
													hint="example of helper text only on focus"
												></v-text-field>
											</v-col>
											<v-col cols="12" sm="6" md="4">
												<v-text-field
													label="Legal last name*"
													hint="example of persistent helper text"
													persistent-hint
													required
												></v-text-field>
											</v-col>
											<v-col cols="12">
												<v-text-field label="Email*" required></v-text-field>
											</v-col>
											<v-col cols="12">
												<v-text-field
													label="Password*"
													type="password"
													required
												></v-text-field>
											</v-col>
											<v-col cols="12" sm="6">
												<v-select
													:items="['0-17', '18-29', '30-54', '54+']"
													label="Age*"
													required
												></v-select>
											</v-col>
											<v-col cols="12" sm="6">
												<v-autocomplete
													:items="[
														'Skiing',
														'Ice hockey',
														'Soccer',
														'Basketball',
														'Hockey',
														'Reading',
														'Writing',
														'Coding',
														'Basejump',
													]"
													label="Interests"
													multiple
												></v-autocomplete>
											</v-col>
										</v-row>
									</v-container>
									<small>*indicates required field</small>
								</v-card-text>
								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn color="blue darken-1" text @click="dialog1 = false">Close</v-btn>
									<v-btn color="blue darken-1" text @click="dialog1 = false">Save</v-btn>
								</v-card-actions>
							</v-card>
						</v-dialog>
					</v-col>

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
										ref="formDespesa"
										@submit.prevent="registerNewSupplier"
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
											<v-btn color="blue darken-1" text @click="close">Close</v-btn>
											<v-btn
												color="blue darken-1"
												text
												type="submit"
												:disabled="!formValidity"
											>
												Save
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
//TODO - Apresentar receitas
//TODO - Acabar form de nova receita

import axios from 'axios';
import moment from 'moment';

import LayoutDefault from '@/layouts/LayoutDefault';

export default {
	name: 'Movements',
	data: () => ({
		tab: null,
		tabs: [{ tab: 'Receitas' }, { tab: 'Despesas' }, { tab: 'Novo Movimento' }],
		dialog1: false,
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
		expensesPagination: {
			search: '',
			sortDesc: true,
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
		receitas: [
			{
				unit: 'T1',
				price: '20€',
				description: 'Obras',
				date: '01/01/01',
			},
		],
		expenses: [],
		suppliers: [],
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
	},
	methods: {
		registerNewSupplier() {
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

					this.$refs.formDespesa.reset();

					console.log(res);
				})
				.catch((err) => {
					this.errorMsg = err.response.data.error;
					setTimeout(() => {
						this.errorMsg = null;
					}, 3000);
				});
		},
		close() {
			this.$refs.formDespesa.reset();
			this.success = null;
			this.errorMsg = null;
			this.dialog2 = false;
		},
	},
};
</script>

<style>
.custom_col {
	flex-grow: 0;
}
</style>
