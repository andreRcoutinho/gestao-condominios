<template>
	<div>
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
					<v-menu v-model="downloadAnualRevsInfoMenu" :close-on-content-click="false" offset-y>
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
									v-model="showAnualRevsDownloadPicker"
									:close-on-content-click="true"
									transition="slide-y-transition"
									offset-y
									min-width="290px"
									:nudge-right="13"
									:return-value.sync="anualRevsDownloadSelectedDate"
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
										ref="anualRevsDownloadYearPicker"
										v-model="anualRevsDownloadSelectedDate"
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
								<v-btn text @click="downloadAnualRevsInfoMenu = false" color="red"
									>Fechar</v-btn
								>
								<v-spacer></v-spacer>

								<v-btn
									color="secondary"
									text
									@click="saveFile(revenuesToDownload, 'receitas', true)"
									>JSON</v-btn
								>
								<v-btn
									color="secondary"
									text
									@click="saveFile(revenuesToDownload, 'receitas', false)"
									>CSV</v-btn
								>
							</v-card-actions>
						</v-card>
					</v-menu>
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
						<span v-if="item.month !== 0">{{ monthNumberToString(item.month) }}</span>
						<span v-else-if="item.month === 0"> --- </span>
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
	</div>
</template>

<script>
import axios from 'axios';
import { Parser } from 'json2csv';

export default {
	name: 'Revenues',
	data: () => ({
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
		revsSelectedDate: null,
		showRevsPicker: '',

		downloadAnualRevsInfoMenu: false,
		anualRevsDownloadSelectedDate: null,
		showAnualRevsDownloadPicker: '',
		revenuesToDownload: [],

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

		revenues: [],
	}),

	mounted() {
		axios
			.get(`//localhost:3333/api/revenue?year=${new Date().toISOString().substr(0, 4)}`)
			.then((res) => (this.revenues = res.data.data));
	},

	watch: {
		showRevsPicker(val) {
			val && this.$nextTick(() => (this.$refs.revenuesYearPicker.activePicker = 'YEAR'));
		},
		showAnualRevsDownloadPicker(val) {
			val &&
				this.$nextTick(() => (this.$refs.anualRevsDownloadYearPicker.activePicker = 'YEAR'));
		},
	},

	methods: {
		monthNumberToString: function(monthNumber) {
			let months = this.months;
			let correctMonth = '';
			months.forEach((m) => {
				if (months.indexOf(m) === monthNumber - 1) {
					correctMonth = m;
				}
			});
			return correctMonth;
		},
		showInfoByYear: function(toDownload) {
			if (toDownload) {
				let year = this.anualRevsDownloadSelectedDate.substr(0, 4);
				axios
					.get(`//localhost:3333/api/revenue?year=${year}`)
					.then((res) => (this.revenuesToDownload = res.data.data))
					.catch((err) => {
						console.log(err.response.data.error);
						this.revenuesToDownload = [];
					});

				this.$refs.anualRevsDownloadYearPicker.activePicker = 'YEAR';
				this.showAnualRevsDownloadPicker = false;
			} else {
				let year = this.revsSelectedDate.substr(0, 4);
				axios
					.get(`//localhost:3333/api/revenue?year=${year}`)
					.then((res) => (this.revenues = res.data.data))
					.catch((err) => {
						console.log(err.response.data.error);
						this.revenues = [];
					});

				this.$refs.revenuesYearPicker.activePicker = 'YEAR';
				this.showRevsPicker = false;
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
			this.downloadAnualRevsInfoMenu = false;

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
					{ label: 'Mês', value: 'month' },
					{ label: 'ID Mapa de Pagamento', value: 'payment_map_id' },
					{ label: 'Mapa de Pagamento', value: 'payment_map_name' },
					{ label: 'ID Fração', value: 'unit_id' },
					{ label: 'Fração', value: 'unit' },
					{ label: 'Valor', value: 'value' },
					{ label: 'Data de Registo de Pagamento', value: 'payment_date' },
				];
				let json2csvParser = new Parser({ fields });

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
