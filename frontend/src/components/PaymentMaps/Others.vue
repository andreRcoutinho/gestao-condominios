<template>
	<div>
		<v-row justify="center" align="end" class="mt-8">
			<v-col cols="1" class="pb-1">
				<v-menu
					ref="otherMapsDateMenu"
					v-model="showOtherMapsPicker"
					:close-on-content-click="true"
					transition="slide-y-transition"
					offset-y
					auto
					min-width="290px"
					:return-value.sync="otherMapsSelectedDate"
				>
					<template v-slot:activator="{ on }">
						<v-row justify="start">
							<v-btn icon v-on="on">
								<v-icon color="secondary">mdi-calendar</v-icon>
							</v-btn>
						</v-row>
					</template>
					<v-date-picker
						ref="otherMapsYearPicker"
						v-model="otherMapsSelectedDate"
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
					v-model="otherMapsTableOptions.search"
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
					<v-menu
						v-model="downloadAnualOtherMapsInfoMenu"
						:close-on-content-click="false"
						offset-y
					>
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
									v-model="showAnualOtherMapsDownloadPicker"
									:close-on-content-click="true"
									transition="slide-y-transition"
									offset-y
									min-width="290px"
									:nudge-right="13"
									:return-value.sync="anualOtherMapsDownloadSelectedDate"
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
										ref="anualOtherMapsDownloadYearPicker"
										v-model="anualOtherMapsDownloadSelectedDate"
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
								<v-btn text @click="downloadAnualOtherMapsInfoMenu = false" color="red"
									>Fechar</v-btn
								>
								<v-spacer></v-spacer>

								<v-btn
									color="secondary"
									text
									@click="saveFile(otherMapsToDownload, 'mapasPagamentoNaoAnuais', true)"
									>JSON</v-btn
								>
								<v-btn
									color="secondary"
									text
									@click="saveFile(otherMapsToDownload, 'mapasPagamentoNaoAnuais', false)"
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
			<v-col cols="8">
				<v-data-table
					:headers="otherMapsTableOptions.headers"
					:items="maps"
					:search="otherMapsTableOptions.search"
					hide-default-footer
					:page.sync="otherMapsTableOptions.page"
					:items-per-page="otherMapsTableOptions.itemsPerPage"
					class="elevation-1"
					@page-count="otherMapsTableOptions.pageCount = $event"
				>
					<template v-slot:item.actions="props">
						<v-icon class="mr-2" @click="showMapInfo(props.item)">
							mdi-plus
						</v-icon>
					</template>
				</v-data-table>
				<v-dialog v-model="mapDetailedInfo.show" max-width="600px">
					<!-- TODO - SHOW MORE INFO -->
					<v-card>
						<v-card-title class="ml-2 pt-5"> </v-card-title>

						<v-card-text>
							<v-row class="mr-2">
								<v-spacer></v-spacer>
								<v-btn color="blue darken-1" text @click="closeMapInfo">Fechar</v-btn>
							</v-row>
						</v-card-text>
					</v-card>
				</v-dialog>
				<div class="text-center pt-3">
					<v-pagination
						v-model="otherMapsTableOptions.page"
						:length="otherMapsTableOptions.pageCount"
						:total-visible="7"
						color="secondary"
					></v-pagination>
				</div>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import axios from 'axios';
import { Parser, transforms } from 'json2csv';

export default {
	name: 'OtherMaps',
	data: () => ({
		otherMapsSelectedDate: null,
		showOtherMapsPicker: '',

		downloadAnualOtherMapsInfoMenu: false,
		anualOtherMapsDownloadSelectedDate: null,
		showAnualOtherMapsDownloadPicker: '',
		otherMapsToDownload: [],

		mapDetailedInfo: {
			show: false,
		},
		otherMapsTableOptions: {
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
					text: 'Descrição',
					value: 'description',
					align: 'center',
				},
				{
					text: 'Ano',
					value: 'year',
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
		maps: [],
	}),

	mounted() {
		axios
			.get(`//localhost:3333/api/payment_map?year=${new Date().toISOString().substr(0, 4)}`)
			.then((res) => {
				let result = res.data.data.filter((pMap) => pMap.yearly === false);
				this.maps = result;
			});
	},

	watch: {
		showOtherMapsPicker(val) {
			val && this.$nextTick(() => (this.$refs.otherMapsYearPicker.activePicker = 'YEAR'));
		},

		showAnualOtherMapsDownloadPicker(val) {
			val &&
				this.$nextTick(
					() => (this.$refs.anualOtherMapsDownloadYearPicker.activePicker = 'YEAR')
				);
		},
	},

	methods: {
		showInfoByYear: function(toDownload) {
			if (toDownload) {
				let year = this.anualOtherMapsDownloadSelectedDate.substr(0, 4);
				this.otherMapsToDownload = [];
				axios
					.get(`//localhost:3333/api/payment_map?year=${year}`)
					.then((res) => {
						let result = res.data.data.filter((pMap) => pMap.yearly === false);

						result.forEach((element) => {
							axios
								.get(`http://localhost:3333/api/payment_map/${element.id}`)
								.then((res) => {
									this.otherMapsToDownload.push(res.data.data);
								})
								.catch((err) => {
									console.log(err.response.data.error);
									this.otherMapsToDownload = [];
								});
						});
					})
					.catch((err) => {
						console.log(err.response.data.error);
						this.otherMapsToDownload = [];
					});

				this.$refs.anualOtherMapsDownloadYearPicker.activePicker = 'YEAR';
				this.showAnualOtherMapsDownloadPicker = false;
			} else {
				axios
					.get(
						`//localhost:3333/api/payment_map?year=${this.otherMapsSelectedDate.substr(0, 4)}`
					)
					.then((res) => {
						let result = res.data.data.filter((pMap) => pMap.yearly === false);
						this.maps = result;
					})
					.catch((err) => {
						console.log(err.response.data.error);
						this.maps = [];
					});

				this.$refs.otherMapsYearPicker.activePicker = 'YEAR';
				this.showOtherMapsPicker = false;
			}
		},
		saveFile: function(data, filename, json) {
			this.downloadAnualOtherMapsInfoMenu = false;

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
					{ label: 'ID', value: 'payment_map.id' },
					{ label: 'Nome', value: 'payment_map.name' },
					{ label: 'Descrição', value: 'payment_map.description' },
					{ label: 'Data de Registo', value: 'payment_map.record_date' },
					{ label: 'Ano', value: 'payment_map.year' },

					{ label: 'Valor', value: 'payment_map_values.value' },
					{ label: 'Data de Início', value: 'payment_map_values.start_date' },
					{ label: 'Data de Fim', value: 'payment_map_values.end_date' },

					{ label: 'Receitas - Fração', value: 'revenues.unit' },
					{ label: 'Receitas - Quantia da fração', value: 'revenues.value' },
					{ label: 'Receitas - Pago', value: 'revenues.paid' },
				];
				const { unwind } = transforms;

				let json2csvParser = new Parser({
					fields,
					transforms: [
						unwind({
							paths: ['payment_map_values', 'revenues'],
							blankOut: true,
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
		showMapInfo(item) {
			Object.assign(this.mapDetailedInfo, item);
			this.mapDetailedInfo.show = true;
		},
		closeMapInfo() {
			this.mapDetailedInfo.show = false;
		},
	},
};
</script>

<style scoped></style>
