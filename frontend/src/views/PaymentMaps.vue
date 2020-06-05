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
							:items="anualPaymentMapTable.paymentMapAnualInfo.revenues"
							hide-default-footer
							:page.sync="anualPaymentMapTable.page"
							@page-count="anualPaymentMapTable.pageCount = $event"
							:items-per-page="anualPaymentMapTable.itemsPerPage"
							:sort-by="['unit']"
							:sort-desc="[false]"
						>
							<template v-slot:top>
								<v-row justify="center">
									<v-col cols="3" class="pb-1">
										<v-menu
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
												@input="showInfoByYear('anualMap', false)"
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
											<v-menu
												v-model="downloadAnualMapInfoMenu"
												:close-on-content-click="false"
												offset-y
											>
												<template v-slot:activator="{ on }">
													<v-btn depressed v-on="on">
														<v-icon left color="secondary">
															mdi-download
														</v-icon>
														Transferir Dados Anuais
													</v-btn>
												</template>

												<v-card>
													<v-row>
														<v-menu
															v-model="showAnualMapDownloadPicker"
															:close-on-content-click="true"
															transition="slide-y-transition"
															offset-y
															min-width="290px"
															:nudge-right="13"
															:return-value.sync="anualMapDownloadSelectedDate"
														>
															<template v-slot:activator="{ on }">
																<v-row justify="center" class="mt-4">
																	<v-btn depressed v-on="on">
																		Escolher ano
																		<v-icon right color="secondary"
																			>mdi-calendar</v-icon
																		>
																	</v-btn>
																</v-row>
															</template>
															<v-date-picker
																ref="anualMapDownloadYearPicker"
																v-model="anualMapDownloadSelectedDate"
																@input="showInfoByYear('anualMap', true)"
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
														<v-btn
															text
															@click="downloadAnualMapInfoMenu = false"
															color="red"
															>Fechar</v-btn
														>
														<v-spacer></v-spacer>

														<v-btn
															color="secondary"
															text
															@click="saveFile(infoToDownload, 'mapaAnual', true)"
															>JSON</v-btn
														>
														<v-btn
															color="secondary"
															text
															@click="saveFile(infoToDownload, 'mapaAnual', false)"
															>CSV</v-btn
														>
													</v-card-actions>
												</v-card>
											</v-menu>
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
										<!-- TODO - v-tooltip hover func -->
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
import { Parser, transforms } from 'json2csv';

import LayoutDefault from '@/layouts/LayoutDefault';

export default {
	name: 'PaymentMaps',
	data: () => ({
		tab: null,
		tabs: [{ tab: 'Mensalidades' }, { tab: 'Outros' }, { tab: 'Novo Mapa' }],

		anualMapSelectedDate: null,
		showAnualMapPicker: '',

		downloadAnualMapInfoMenu: false,
		anualMapDownloadSelectedDate: null,
		showAnualMapDownloadPicker: '',
		infoToDownload: {
			revenues: [],
		},

		anualPaymentMapTable: {
			headers: [{ text: '', value: 'unit' }],
			page: 1,
			pageCount: 0,
			itemsPerPage: 13,
			paymentMapAnualInfo: {
				revenues: [],
			},
		},
		units: [],
		months: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
	}),
	watch: {
		showAnualMapPicker(val) {
			val && this.$nextTick(() => (this.$refs.anualMapYearPicker.activePicker = 'YEAR'));
		},
		showAnualMapDownloadPicker(val) {
			val && this.$nextTick(() => (this.$refs.anualMapDownloadYearPicker.activePicker = 'YEAR'));
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
				this.transformAPIres(res);
			});

		axios.get('//localhost:3333/api/units').then((res) => (this.units = res.data.data));
	},
	created() {
		this.$emit('update:layout', LayoutDefault);
	},
	methods: {
		/**
		 * Transforms response data into a new array with appropriate structure for the data table
		 * res - response object
		 * toDownload - if the info will be transfered to a file
		 */
		transformAPIres: function(res, toDownload) {
			let paymentMapObj;

			let pMapInfo = res.data.data;
			if (toDownload) {
				paymentMapObj = this.infoToDownload;
			} else {
				paymentMapObj = this.anualPaymentMapTable.paymentMapAnualInfo;
			}

			// inject info about payment map into this.anualPaymentMapTable.paymentMapAnualInfo
			paymentMapObj.generalInfo = pMapInfo.payment_map;
			paymentMapObj.generalValues = pMapInfo.payment_map_values;

			for (let i = 0; i < pMapInfo.revenues.length; i++) {
				let initialArray = paymentMapObj.revenues.filter(
					(rev) => rev.unit === pMapInfo.revenues[i].unit
				);

				if (initialArray.length === 0) {
					let months = [];

					let monthDataPerUnit = pMapInfo.revenues.filter(
						(rev) => rev.unit === pMapInfo.revenues[i].unit
					);
					monthDataPerUnit.forEach((el) => {
						months.push({ month: el.month, value: el.value, paid: el.paid });
					});
					//console.log(monthDataPerUnit);
					months.sort((a, b) => {
						return a.month - b.month;
					});
					paymentMapObj.revenues.push({
						unit: pMapInfo.revenues[i].unit,
						months: months,
					});
				}
			}
		},

		showInfoByYear: function(origin, toDownload) {
			if (origin === 'anualMap') {
				if (toDownload) {
					let year = this.anualMapDownloadSelectedDate.substr(0, 4);
					axios
						.get(`//localhost:3333/api/payment_map/anual?year=${year}`)
						.then((res) => {
							this.transformAPIres(res, true);
						})
						.catch((err) => {
							console.log(err.response.data.error);
							this.infoToDownload = [];
						});

					this.$refs.anualMapDownloadYearPicker.activePicker = 'YEAR';
					this.showAnualMapDownloadPicker = false;
				} else {
					let year = this.anualMapSelectedDate.substr(0, 4);
					axios
						.get(`//localhost:3333/api/payment_map/anual?year=${year}`)
						.then((res) => {
							this.transformAPIres(res);
						})
						.catch((err) => {
							console.log(err.response.data.error);
							this.anualPaymentMapTable.paymentMapAnualInfo.revenues = [];
						});

					this.$refs.anualMapYearPicker.activePicker = 'YEAR';
					this.showAnualMapPicker = false;
				}
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
			this.downloadAnualMapInfoMenu = false;

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
				const fields = [
					{ label: 'ID', value: 'generalInfo.id' },
					{ label: 'Nome', value: 'generalInfo.name' },
					{ label: 'Descrição', value: 'generalInfo.description' },
					{ label: 'Data de Registo', value: 'generalInfo.record_date' },
					{ label: 'Anual', value: 'generalInfo.yearly' },
					{ label: 'Ano', value: 'generalInfo.year' },
					{ label: 'Fechado', value: 'generalInfo.closed' },
					{ label: 'idValoresDoMapa', value: 'generalValues.id' },
					{ label: 'Valor Anual', value: 'generalValues.value' },
					{ label: 'Fundo de Reserva', value: 'generalValues.reserve_fund' },
					{ label: 'Data de início', value: 'generalValues.start_date' },
					{ label: 'Data de fim', value: 'generalValues.end_date' },
					{ label: 'Fração', value: 'revenues.unit' },
					{ label: 'Mês', value: 'revenues.months.month' },
					{ label: 'Valor Mensal', value: 'revenues.months.value' },
					{ label: 'Pago', value: 'revenues.months.paid' },
				];
				const { unwind } = transforms;
				const json2csvParser = new Parser({
					fields,
					transforms: [
						unwind({
							paths: ['generalValues', 'revenues', 'revenues.months'],
							blankOut: true,
						}),
					],
				});
				const csv = json2csvParser.parse(data);
				//console.log(csv);
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
