<template>
	<div class="centerBtns">
		<v-row justify="center">
			<!-- NOVA RECEITA -->
			<v-col class="custom_col" align-self="center">
				<v-dialog v-model="dialog1" persistent max-width="600px">
					<template v-slot:activator="{ on }" class="text-xs-center">
						<v-btn color="#bfbfbf" dark v-on="on" height="125px" width="300px">
							<v-icon left x-large>mdi-plus-circle</v-icon>
							<span class="ml-4">Nova Receita</span>
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
									<v-btn color="red" text @click="closeRegisterNewMvmt(true)"
										>Fechar</v-btn
									>
									<v-btn color="secondary" text type="submit" :disabled="!formValidity">
										Registar
									</v-btn>
								</v-row>
							</v-form>
						</v-card-text>
					</v-card>
				</v-dialog>
			</v-col>

			<!-- NOVA DESPESA -->
			<v-col class="custom_col" align-self="center">
				<v-dialog v-model="dialog2" persistent max-width="600px">
					<template v-slot:activator="{ on }" class="text-xs-center">
						<v-btn color="#bfbfbf" dark v-on="on" height="125px" width="300px">
							<v-icon left x-large>mdi-plus-circle</v-icon>
							<span class="ml-4">Nova Despesa</span>
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
									<v-btn color="red" text @click="closeRegisterNewMvmt(false)"
										>Fechar</v-btn
									>
									<v-btn color="secondary" text type="submit" :disabled="!formValidity">
										Registar
									</v-btn>
								</v-row>
							</v-form>
						</v-card-text>
					</v-card>
				</v-dialog>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
	name: 'RegisterMovement',
	data: () => ({
		dialog1: false,
		d1Info: {
			paymentMap: null,
			pmRules: [(v) => !!v || 'Escolha um mapa de pagamento.'],
			unit: null,
			unitRules: [(v) => !!v || 'Escolha uma fração.'],
			checkedMonths: [],
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
		formValidity: false,
		success: null,
		errorMsg: null,

		paymentMaps: [],
		suppliers: [],
	}),
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
	},
	methods: {
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
				formatedMonths = [0];
			}

			console.log({
				payment_map_id: this.d1Info.paymentMap.id,
				unit_id: this.d1Info.unit,
				months: formatedMonths,
			});

			axios
				.post('//localhost:3333/api/revenue', {
					payment_map_id: this.d1Info.paymentMap.id,
					unit_id: this.d1Info.unit,
					months: formatedMonths,
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
		closeRegisterNewMvmt: function(revenue) {
			if (revenue) {
				this.$refs.formRevenue.reset();
				this.d1Info.paymentMap = null;
				this.d1Info.checkedMonths = [];
				this.success = null;
				this.errorMsg = null;
				this.dialog1 = false;
			} else {
				this.$refs.formExpense.reset();
				this.success = null;
				this.errorMsg = null;
				this.dialog2 = false;
			}
		},
	},
};
</script>

<style scoped>
.centerBtns {
	display: flex;
	height: 80vh;
}
.custom_col {
	flex-grow: 0;
}
</style>
