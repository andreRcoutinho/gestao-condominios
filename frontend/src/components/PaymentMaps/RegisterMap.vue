<template>
	<div>
		<v-form
			v-model="newMapInfo.validity"
			ref="formNewPayMap"
			@submit.prevent="registerNewPaymentMap"
			@keydown.enter.prevent="registerNewPaymentMap"
			class="mx-4"
		>
			<v-container>
				<v-row justify="center" class="mb-6">
					<v-switch
						v-model="switchIsYearly"
						label="Mapa anual?"
						color="secondary"
						inset
						hide-details
					>
					</v-switch>
				</v-row>
				<v-divider class="mx-8"></v-divider>
				<v-row justify="center" class="mt-3">
					<v-col cols="5">
						<v-text-field
							v-model="newMapInfo.mapName"
							:rules="newMapInfo.nameRules"
							label="Nome do Mapa"
							color="secondary"
							required
						></v-text-field>
					</v-col>
					<v-col cols="1"></v-col>
					<v-col cols="3" align-self="center">
						<v-text-field
							v-model.number="newMapInfo.totalValue"
							label="Valor total em €"
							placeholder="0.00"
							color="#949494"
							:rules="newMapInfo.valueRules"
							required
						></v-text-field>
					</v-col>
				</v-row>
				<v-row justify="center" class="mb-3">
					<v-col cols="5">
						<v-textarea
							v-model="newMapInfo.description"
							hide-details
							label="Descrição"
							color="secondary"
							auto-grow
							row-height="15px"
							outlined
							solo
							flat
						></v-textarea>
					</v-col>
					<v-col cols="1"></v-col>
					<v-col cols="3" align-self="center">
						<v-text-field
							v-if="!switchIsYearly"
							v-model.number="newMapInfo.numberOfInstallments"
							:rules="newMapInfo.numberRules"
							label="Prestações"
							type="number"
							min="0"
							color="secondary"
							outlined
						/>
						<v-text-field
							v-else
							v-model.number="newMapInfo.year"
							:rules="newMapInfo.numberRules"
							label="Ano"
							type="number"
							:min="nextYear"
							color="secondary"
							outlined
						/>
					</v-col>
				</v-row>
				<v-divider class="mx-8"></v-divider>

				<v-row class="mt-3" justify="center">
					<v-col cols="6" class="text-center">
						<p class="mb-0 grey--text text--darken-3">
							Parcelas a considerar:
						</p>
						<small class="grey--text text--darken-1"
							>Parcelas não selecionadas apenas contribuirão para o pagamento do fundo de
							reserva.</small
						>
					</v-col>
					<v-row justify="center" no-gutters>
						<v-col v-for="(u, index) in units" :key="'checkbox' + index" cols="3">
							<v-row justify="center" no-gutters>
								<v-checkbox
									v-model="newMapInfo.selectedUnits"
									:label="u.unit"
									:value="u.id"
									dense
									color="secondary"
								>
								</v-checkbox>
							</v-row>
						</v-col>
					</v-row>
				</v-row>
				<v-row justify="center">
					<v-switch
						v-model="selectAll"
						label="Selecionar todas as opções"
						color="secondary"
						inset
						class="ml-6"
					>
					</v-switch>
				</v-row>
				<v-divider class="mx-8"></v-divider>

				<v-row class="mt-4" align-content="end">
					<v-btn
						outlined
						color="black"
						class="ml-11"
						:disabled="!switchIsYearly"
						@click="simulateMap"
						>Simular</v-btn
					>
					<v-spacer></v-spacer>
					<v-btn color="red" text @click="clearFields">Cancelar</v-btn>
					<v-btn
						color="secondary"
						text
						type="submit"
						:disabled="!newMapInfo.validity"
						class="mr-8"
					>
						Registar
					</v-btn>
				</v-row>
			</v-container>
		</v-form>
		<v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout" top :color="snackbar.colour">
			{{ snackbar.message }}
			<v-icon v-if="snackbar.success" right> mdi-checkbox-marked-circle</v-icon>
			<v-icon v-else right>
				mdi-cancel
			</v-icon>
		</v-snackbar>
		<v-dialog v-model="simulate.show" max-width="1000px">
			<v-card>
				<v-card-title class="ml-2 pt-5">
					<span>
						Simulação
					</span>
				</v-card-title>

				<v-card-text>
					<v-row class="mb-6" justify="center">
						<v-col cols="2">
							<v-row justify="center">
								<v-list-item two-line class="text-center">
									<v-list-item-content>
										<v-list-item-subtitle>Nome</v-list-item-subtitle>
										<v-list-item-title>{{ simulate.paymentMap.name }}</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-row>
						</v-col>
						<v-col cols="2">
							<v-row justify="center">
								<v-list-item two-line class="text-center">
									<v-list-item-content>
										<v-list-item-subtitle>Descrição</v-list-item-subtitle>
										<v-list-item-title>{{
											simulate.paymentMap.description
										}}</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-row>
						</v-col>
						<v-col cols="2">
							<v-row justify="center">
								<v-list-item two-line class="text-center">
									<v-list-item-content>
										<v-list-item-subtitle>Ano</v-list-item-subtitle>
										<v-list-item-title>{{ simulate.paymentMap.year }}</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-row>
						</v-col>
						<v-col cols="2">
							<v-row justify="center">
								<v-list-item two-line class="text-center">
									<v-list-item-content>
										<v-list-item-subtitle>Valor</v-list-item-subtitle>
										<v-list-item-title>{{ simulate.value }} €</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-row>
						</v-col>
						<v-col cols="2">
							<v-row justify="center">
								<v-list-item two-line class="text-center">
									<v-list-item-content>
										<v-list-item-subtitle>Fundo de Reserva</v-list-item-subtitle>
										<v-list-item-title>{{ simulate.reserveFund }} €</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-row>
						</v-col>
					</v-row>

					<v-row justify="center" class="mb-12">
						<v-data-table
							:items="simulate.monthlyExpenses"
							:headers="simulate.unitsHeaders"
							dense
							:items-per-page="5"
						>
							<template v-slot:top>
								<v-row justify="center">
									<span class="text-center text-h6">
										Valores Mensais
									</span>
								</v-row>
							</template>
							<template v-slot:item.monthy_expense="{ item }">
								<span>{{ item.monthy_expense }} €</span>
							</template>
						</v-data-table>
					</v-row>

					<v-row justify="center">
						<v-data-table
							:items="simulate.reserveFunds"
							:headers="simulate.rfHeaders"
							dense
							:items-per-page="5"
						>
							<template v-slot:top>
								<v-row justify="center">
									<span class="text-center text-h6">
										Valores do Fundo de Reserva
									</span>
								</v-row>
							</template>
							<template v-slot:item.reserve_fund="{ item }">
								<span>{{ item.reserve_fund }} €</span>
							</template>
						</v-data-table>
					</v-row>
				</v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'RegisterMap',
	data: () => ({
		dialog1: false,
		dialog2: false,
		switchIsYearly: false,
		newMapInfo: {
			year: +new Date().toISOString().substr(0, 4) + 1,
			mapName: '',
			nameRules: [(v) => !!v || 'É necessário indicar um nome.'],
			description: '',
			numberOfInstallments: 0,
			numberRules: [(v) => /^\d+$/.test(v) || 'Só são permitidos números inteiros.'],
			selectedUnits: [],
			totalValue: 0,
			valueRules: [
				(v) => !!v || 'Introduza uma quantia.',
				(v) => /^\d+(\.\d{1,2})?$/.test(v) || 'A quantia tem que ter um formato válido.',
			],
			validity: false,
		},

		simulate: {
			show: false,
			paymentMap: {},
			value: 0,
			reserveFund: 0,
			monthlyExpenses: [],
			reserveFunds: [],
			unitsHeaders: [
				{
					text: 'Parcela',
					value: 'unit',
					align: 'center',
					sortable: false,
				},
				{
					text: 'Valor Mensal',
					value: 'monthy_expense',
					align: 'center',
					sortable: false,
				},
			],
			rfHeaders: [
				{
					text: 'Parcela',
					value: 'unit',
					align: 'center',
					sortable: false,
				},
				{
					text: 'Contribuição para Fundo de Reserva',
					value: 'reserve_fund',
					align: 'center',
					sortable: false,
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

		units: [],
		nextYear: +new Date().toISOString().substr(0, 4) + 1,
	}),
	computed: {
		selectAll: {
			set(val) {
				this.newMapInfo.selectedUnits = [];
				if (val) {
					let tempA = [];
					for (let i = 0; i < this.units.length; i++) {
						tempA.push(this.units[i].id);
					}
					this.newMapInfo.selectedUnits = tempA;
				}
			},
			get() {
				return this.newMapInfo.selectedUnits.length === this.units.length;
			},
		},
	},
	mounted() {
		axios.get('//localhost:3333/api/units/').then((res) => (this.units = res.data.data));
	},
	methods: {
		simulateMap: function() {
			if (
				this.newMapInfo.mapName &&
				this.newMapInfo.selectedUnits.length > 0 &&
				this.newMapInfo.year &&
				this.newMapInfo.totalValue
			) {
				axios
					.post(`http://localhost:3333/api/payment_map/simulate`, {
						name: this.newMapInfo.mapName,
						description: this.newMapInfo.description,
						unit_ids: this.newMapInfo.selectedUnits,
						year: this.newMapInfo.year,
						is_yearly: true,
						value: this.newMapInfo.totalValue,
					})
					.then((res) => {
						let r = res.data.data;
						this.simulate.paymentMap = r.payment_map;
						this.simulate.value = r.value;
						this.simulate.reserveFund = r.reserve_fund;
						this.simulate.monthlyExpenses = r.res.monthly_expenses;
						this.simulate.reserveFunds = r.res.reserve_funds;

						this.simulate.show = true;
						this.$refs.formNewPayMap.reset();
					})
					.catch((err) => {
						this.snackbar.message = err.response.data.error;
						this.snackbar.success = false;
						this.snackbar.colour = 'red';
						this.snackbar.show = true;
					});
			} else {
				this.snackbar.message = 'Forneça toda a informação!';
				this.snackbar.success = false;
				this.snackbar.colour = 'red';
				this.snackbar.show = true;
			}
		},
		registerNewPaymentMap: function() {
			if (this.switchIsYearly) {
				axios
					.post('//localhost:3333/api/payment_map', {
						name: this.newMapInfo.mapName,
						description: this.newMapInfo.description,
						unit_ids: this.newMapInfo.selectedUnits,
						year: this.newMapInfo.year,
						is_yearly: true,
						value: this.newMapInfo.totalValue,
					})
					.then((res) => {
						this.snackbar.message = res.data.message;
						this.snackbar.success = true;
						this.snackbar.colour = 'green';
						this.snackbar.show = true;

						this.$refs.formNewPayMap.reset();
					})
					.catch((err) => {
						this.snackbar.message = err.response.data.error;
						this.snackbar.success = false;
						this.snackbar.colour = 'red';
						this.snackbar.show = true;
					});
			} else {
				axios
					.post('//localhost:3333/api/payment_map', {
						name: this.newMapInfo.mapName,
						description: this.newMapInfo.description,
						installments: this.newMapInfo.numberOfInstallments,
						unit_ids: this.newMapInfo.selectedUnits,
						year: new Date().toISOString().substr(0, 4),
						is_yearly: false,
						value: this.newMapInfo.totalValue,
					})
					.then((res) => {
						this.snackbar.message = res.data.message;
						this.snackbar.success = true;
						this.snackbar.colour = 'green';
						this.snackbar.show = true;
						this.$refs.formNewPayMap.reset();
					})
					.catch((err) => {
						this.snackbar.message = err.response.data.error;
						this.snackbar.success = false;
						this.snackbar.colour = 'red';
						this.snackbar.show = true;
					});
			}
		},
		clearFields: function() {
			this.$refs.formNewPayMap.reset();
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
