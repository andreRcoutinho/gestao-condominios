<template>
	<div class="paymentMaps">
		<v-tabs v-model="tab" grow color="black">
			<v-tab v-for="(t, index) in tabs" :key="`${index}-${t.tab}`">
				{{ t.tab }}
			</v-tab>
		</v-tabs>

		<v-tabs-items v-model="tab">
			<!-- RECEITAS ANUAL -->
			<v-tab-item>
				<v-row justify="space-around" class="mt-2">
					<v-col cols="10">
						<v-data-table
							:headers="anualPaymentMapTable.headers"
							:items="anualPaymentMapTable.paymentMapAnualRevenues"
							hide-default-footer
							:page.sync="anualPaymentMapTable.page"
							@page-count="anualPaymentMapTable.pageCount = $event"
							:items-per-page="anualPaymentMapTable.itemsPerPage"
						>
							<template v-slot:top>
								<v-row justify="center">
									<v-col cols="3" class="pb-1">
										<v-menu
											ref="anualMapDateMenu"
											v-model="showAnualMapPicker"
											:close-on-content-click="true"
											transition="slide-y-transition"
											offset-y
											auto
											min-width="290px"
											:return-value.sync="anualMapSelectedDate"
										>
											<template v-slot:activator="{ on }">
												<v-row justify="start">
													<v-btn depressed v-on="on">
														Escolher ano
														<v-icon right color="secondary">mdi-calendar</v-icon>
													</v-btn>
												</v-row>
											</template>
											<v-date-picker
												ref="anualMapYearPicker"
												v-model="anualMapSelectedDate"
												@input="save('anualMap')"
												reactive
												no-title
												color="secondary"
												min="2018"
												:max="new Date().toISOString().substring(0, 7)"
											>
											</v-date-picker>
										</v-menu>
									</v-col>
									<v-col cols="9">
										<v-row justify="end">
											<v-btn
												depressed
												@click="
													saveFile(
														anualPaymentMapTable.paymentMapAnualRevenues,
														'mapaAnual'
													)
												"
											>
												<v-icon left color="secondary">
													mdi-download
												</v-icon>
												Transferir Dados Anuais
											</v-btn>
										</v-row>
									</v-col>
								</v-row>
							</template>
							<template v-slot:item="props">
								<tr>
									<td class="font-weight-black unitHorizontalHeader">
										{{ props.item.unit }}
									</td>
									<td
										v-for="(m, index) in props.item.months"
										:key="index"
										class="text-center contentCell"
									>
										<v-icon v-if="m.paid" color="green">
											mdi-check-outline
										</v-icon>
										<v-icon v-else color="orange">
											mdi-emoticon-sad-outline
										</v-icon>
									</td>
								</tr>
							</template>
						</v-data-table>
						<div class="text-center pt-3">
							<v-pagination
								v-model="anualPaymentMapTable.page"
								:length="anualPaymentMapTable.pageCount"
								:total-visible="5"
								color="secondary"
							></v-pagination>
						</div>
					</v-col>
				</v-row>
			</v-tab-item>
			<!-- OUTROS -->
			<v-tab-item> </v-tab-item>
			<!-- NOVO MAPA -->
			<v-tab-item> </v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script>
import axios from 'axios';
// import moment from 'moment';

import LayoutDefault from '@/layouts/LayoutDefault';

export default {
	name: 'PaymentMaps',
	data: () => ({
		dialog: false,
		tab: null,
		tabs: [{ tab: 'Mensalidades' }, { tab: 'Outros' }, { tab: 'Novo Mapa' }],
		anualMapSelectedDate: null,
		showAnualMapPicker: '',
		// selectDateErrorMsg: null,
		anualPaymentMapTable: {
			headers: [{ text: '', value: 'unit', sortable: false }],
			page: 1,
			pageCount: 0,
			itemsPerPage: 13,
			paymentMapAnualRevenues: [],
		},

		units: [],
		months: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
	}),
	watch: {
		showAnualMapPicker(val) {
			val && this.$nextTick(() => (this.$refs.anualMapYearPicker.activePicker = 'YEAR'));
		},
	},
	mounted() {
		this.months.forEach((m) => {
			this.anualPaymentMapTable.headers.push({
				text: m,
				align: 'center',
				sortable: false,
				class: 'black--text',
			});
		});

		axios
			.get(
				`//localhost:3333/api/payment_map/anual?year=${new Date().toISOString().substr(0, 4)}`
			)
			.then((res) => {
				let revenuesArray = res.data.data.revenues;

				for (let i = 0; i < revenuesArray.length; i++) {
					let initialArray = this.anualPaymentMapTable.paymentMapAnualRevenues.filter(
						(rev) => rev.unit === revenuesArray[i].unit
					);

					if (initialArray.length === 0) {
						let months = [];

						let monthDataPerUnit = revenuesArray.filter(
							(rev) => rev.unit === revenuesArray[i].unit
						);
						monthDataPerUnit.forEach((el) => {
							months.push({ month: el.month, value: el.value, paid: el.paid });
						});
						//console.log(monthDataPerUnit);
						months.sort((a, b) => {
							return a.month - b.month;
						});
						this.anualPaymentMapTable.paymentMapAnualRevenues.push({
							unit: revenuesArray[i].unit,
							months: months,
						});
					}
				}
			});

		axios.get('//localhost:3333/api/units').then((res) => (this.units = res.data.data));
	},
	created() {
		this.$emit('update:layout', LayoutDefault);
	},
	methods: {
		save(origin) {
			if (origin === 'anualMap') {
				axios
					.get(
						`//localhost:3333/api/payment_map/anual?year=${this.anualMapSelectedDate.substr(
							0,
							4
						)}`
					)
					.then((res) => {
						let revenuesArray = res.data.data.revenues;

						for (let i = 0; i < revenuesArray.length; i++) {
							let initialArray = this.anualPaymentMapTable.paymentMapAnualRevenues.filter(
								(rev) => rev.unit === revenuesArray[i].unit
							);

							if (initialArray.length === 0) {
								let months = [];

								let monthDataPerUnit = revenuesArray.filter(
									(rev) => rev.unit === revenuesArray[i].unit
								);
								monthDataPerUnit.forEach((el) => {
									months.push({ month: el.month, value: el.value, paid: el.paid });
								});
								//console.log(monthDataPerUnit);
								months.sort((a, b) => {
									return a.month - b.month;
								});
								this.anualPaymentMapTable.paymentMapAnualRevenues.push({
									unit: revenuesArray[i].unit,
									months: months,
								});
							}
						}
					})
					.catch((err) => {
						console.log(err.response.data.error);
						this.anualPaymentMapTable.paymentMapAnualRevenues = [];
						// this.selectDateErrorMsg = err.response.data.error;
						// this.overlay = !this.overlay;
					});

				this.$refs.anualMapYearPicker.activePicker = 'YEAR';
				this.showAnualMapPicker = false;
			}
		},
		saveFile(data, filename) {
			const jsonData = JSON.stringify(data, null, '\t');
			const blob = new Blob([jsonData], { type: 'application/json' });
			const a = document.createElement('a');
			a.download = `${filename}.json`;
			a.href = window.URL.createObjectURL(blob);
			a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
			document.body.appendChild(a);
			a.click();
		},
	},
};
</script>

<style>
.unitHorizontalHeader {
	font-size: 12px !important;
	/* max-width: 5.5% !important;
	min-width: 5.5% !important; */
}
/* .contentCell {
	max-width: 7.875% !important;
	min-width: 7.875% !important;
} */
</style>
