<template>
	<div>
		<v-row>
			<v-container>
				<v-form
					v-model="newTypology.validity"
					ref="formNewTypology"
					class="mx-8"
					@submit.prevent="createTypology"
					@keydown.enter.prevent="createTypology"
				>
					<v-row justify="center">
						<v-col cols="4">
							<v-text-field
								v-model.trim="newTypology.typology"
								label="Tipologia"
								color="secondary"
								hint="ex.: T1; T2; T3 Duplex"
								persistent-hint
								:rules="newTypology.typologyRules"
								required
							></v-text-field>
						</v-col>
						<v-col cols="4">
							<v-text-field
								v-model.number="newTypology.permilage"
								label="Permilagem"
								color="secondary"
								hint="ex.: 45"
								persistent-hint
								:rules="newTypology.permilageRules"
								required
							></v-text-field>
						</v-col>
					</v-row>
					<v-row justify="center" class="ml-0">
						<v-col cols="2">
							<v-row justify="end">
								<v-btn
									color="secondary"
									text
									type="submit"
									:disabled="!newTypology.validity"
								>
									Nova Tipologia
								</v-btn>
							</v-row>
						</v-col>
						<v-col cols="1">
							<v-icon v-if="newTypology.success" color="green">
								mdi-check
							</v-icon>
							<v-icon v-if="newTypology.error" color="red">
								mdi-cancel
							</v-icon>
						</v-col>
					</v-row>
				</v-form>
			</v-container>
		</v-row>
		<v-divider class="mx-12" />
		<v-row class="mb-3">
			<v-container>
				<v-form
					v-model="newUnit.validity"
					ref="formNewUnit"
					class="mx-8"
					@submit.prevent="createUnit"
					@keydown.enter.prevent="createUnit"
				>
					<v-row justify="center">
						<v-col cols="4">
							<v-text-field
								v-model="newUnit.unit"
								label="Fração"
								color="secondary"
								hint="ex.: 1º Dto; 6º Esq; Loja"
								persistent-hint
								:rules="newUnit.unitRules"
								required
							></v-text-field>
						</v-col>
						<v-col cols="4">
							<v-select
								:items="typologies"
								item-text="typology"
								item-value="id"
								v-model="newUnit.selectedTypology"
								label="Tipologia"
								color="secondary"
								item-color="secondary"
								required
							></v-select>
						</v-col>
					</v-row>
					<v-row justify="center" class="ml-0">
						<v-col cols="2">
							<v-row justify="end">
								<v-btn color="secondary" text type="submit" :disabled="!newUnit.validity">
									Nova Parcela
								</v-btn>
							</v-row>
						</v-col>
						<v-col cols="1">
							<v-icon v-if="newUnit.success" color="green">
								mdi-check
							</v-icon>
							<v-icon v-if="newUnit.error" color="red">
								mdi-cancel
							</v-icon>
						</v-col>
					</v-row>
				</v-form>
			</v-container>
		</v-row>
		<v-divider class="mx-12" />
		<v-row justify="center" class="mx-10 mt-6">
			<v-col cols="8">
				<v-data-table
					dense
					:headers="unitsTableOptions.headers"
					:items="units"
					:search="unitsTableOptions.search"
					hide-default-footer
					:page.sync="unitsTableOptions.page"
					:items-per-page="unitsTableOptions.itemsPerPage"
					class="elevation-0"
					@page-count="unitsTableOptions.pageCount = $event"
					:sort-by="['unit']"
					:sort-desc="[false]"
				>
					<template v-slot:item.actions="props">
						<v-icon small class="mr-2" @click="editUnit(props.item)">
							mdi-pencil
						</v-icon>
					</template>
				</v-data-table>
				<v-dialog v-model="editDialog" max-width="650px" persistent>
					<v-card>
						<v-card-title>
							<span class="headline">Atualizar Parcela</span>
						</v-card-title>

						<v-card-text>
							<v-container>
								<v-row>
									<v-col cols="12" md="6">
										<v-text-field
											v-model="editedUnit.unit"
											label="Nome da parcela"
											color="secondary"
										></v-text-field>
									</v-col>
									<v-col cols="6">
										<v-select
											v-model="editedUnit.typology"
											:items="typologies"
											label="Tipologia"
											item-text="typology"
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
							<v-btn color="secondary" text @click="updateUnit">Atualizar</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
				<div class="text-center pt-3">
					<v-pagination
						v-model="unitsTableOptions.page"
						:length="unitsTableOptions.pageCount"
						:total-visible="5"
						color="secondary"
					></v-pagination>
				</div>
			</v-col>
			<v-col align-self="center" cols="3">
				<v-dialog v-model="editedTypology.showDialog" persistent max-width="450px">
					<template v-slot:activator="{ on }" class="text-xs-center">
						<v-container>
							<v-row justify="center">
								<v-btn
									color="secondary"
									outlined
									v-on="on"
									class="text-wrap"
									height="100px"
								>
									Atualizar <br />
									Tipologias
								</v-btn>
							</v-row>
						</v-container>
					</template>
					<v-card>
						<v-card-title class="ml-2 pt-5">
							<span>
								Atualizar Tipologias
							</span>
						</v-card-title>

						<v-card-text>
							<v-form ref="editTypologyForm">
								<v-row justify="center" class="mx-0">
									<v-col cols="12">
										<v-select
											:items="typologies"
											item-text="typology"
											item-value="id"
											v-model="editedTypology.selectedTypology"
											label="Tipologia"
											color="secondary"
											item-color="secondary"
											required
											@input="loadTypologyData"
										></v-select>
									</v-col>
									<v-col cols="12">
										<v-text-field
											v-if="editedTypology.selectedTypology"
											v-model="editedTypology.typologyName"
											label="Designação"
											color="secondary"
										></v-text-field>
									</v-col>
									<v-col cols="12">
										<v-text-field
											v-if="editedTypology.selectedTypology"
											v-model.number="editedTypology.permilage"
											label="Permilagem"
											color="secondary"
											hint="ex.: 45"
											persistent-hint
											:rules="newTypology.permilageRules"
											required
										>
										</v-text-field>
									</v-col>
								</v-row>
							</v-form>
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
							<v-row class="mt-3">
								<v-spacer></v-spacer>
								<v-btn color="red" text @click="closeTypologyDialog">Fechar</v-btn>
								<v-btn color="secondary" @click="updateTypology" text type="submit"
									>Guardar Alterações</v-btn
								>
							</v-row>
						</v-card-text>
					</v-card>
				</v-dialog>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import LayoutDefault from '@/layouts/LayoutDefault';

import axios from 'axios';

export default {
	name: 'BuildingManagement',
	data: () => ({
		newTypology: {
			typology: '',
			typologyRules: [(v) => !!v || 'Introduza um nome para a tipologia.'],
			permilage: '',
			permilageRules: [
				(v) => !!v || 'Introduza um valor.',
				(v) => /^\d+(\.\d{1,2})?$/.test(v) || 'O valor tem que ser um número válido.',
			],
			validity: false,
			success: false,
			error: false,
		},
		newUnit: {
			unit: '',
			selectedTypology: null,
			unitRules: [(v) => !!v || 'Introduza um nome para a parcela.'],
			validity: '',
			success: false,
			error: false,
		},
		unitsTableOptions: {
			search: '',
			page: 1,
			pageCount: 0,
			itemsPerPage: 9,
			headers: [
				{
					text: 'Parcela',
					value: 'unit',
					align: 'center',
				},
				{
					text: 'Tipologia',
					value: 'typology.typology',
					align: 'center',
				},
				{ text: 'Permilagem', value: 'typology.permilage', align: 'center' },
				{
					text: 'Mudar Tipologia',
					value: 'actions',
					sortable: false,
					align: 'center',
				},
			],
		},

		editDialog: false,
		editedIndex: -1,

		editedUnit: {
			unit: '',
			typology: null,

			selectedTypology: null,
		},

		editedTypology: {
			showDialog: false,
			validity: false,
			selectedTypology: null,
			typologyName: '',
			permilage: 0,
		},

		editItemSuccess: null,
		editItemErrorMsg: null,

		units: [],
		typologies: [],
	}),
	created() {
		this.$emit('update:layout', LayoutDefault);
	},
	mounted() {
		axios.get(`//localhost:3333/api/typologies`).then((res) => (this.typologies = res.data.data));
		axios.get(`//localhost:3333/api/units`).then((res) => (this.units = res.data.data));
	},
	methods: {
		loadTypologyData() {
			if (this.editedTypology.selectedTypology) {
				axios
					.get(`//localhost:3333/api/typologies/${this.editedTypology.selectedTypology}`)
					.then((res) => {
						this.editedTypology.typologyName = res.data.data.typology;
						this.editedTypology.permilage = res.data.data.permilage;
					});
			}
		},
		closeTypologyDialog() {
			this.editedTypology.showDialog = false;
			this.$refs.editTypologyForm.reset();
		},
		createTypology() {
			axios
				.post(`//localhost:3333/api/typologies`, {
					typology: this.newTypology.typology.replace(/\s+/g, ''),
					permilage: this.newTypology.permilage,
				})
				.then((res) => {
					this.newTypology.success = true;

					setTimeout(() => {
						this.newTypology.success = false;
					}, 3000);

					this.$refs.formNewTypology.reset();

					console.log(res.data.data);
				})
				.catch((err) => {
					this.newTypology.error = true;
					setTimeout(() => {
						this.newTypology.error = false;
					}, 3000);
					console.log(err);
				});
		},
		createUnit() {
			axios
				.post(`//localhost:3333/api/units`, {
					unit: this.newUnit.unit,
					typology_id: this.newUnit.typology,
				})
				.then((res) => {
					this.newUnit.success = true;

					setTimeout(() => {
						this.newUnit.success = false;
					}, 3000);

					this.$refs.formNewUnit.reset();

					console.log(res.data.data);
				})
				.catch((err) => {
					this.newUnit.error = true;
					setTimeout(() => {
						this.newUnit.error = false;
					}, 3000);
					console.log(err);
				});
		},
		editUnit(item) {
			this.editedIndex = this.units.indexOf(item);
			this.editedUnit = Object.assign({}, item);
			this.editDialog = true;
			// console.log(this.editedIndex);
			//console.log(this.editedUnit);
		},
		updateUnit() {
			axios
				.put(`http://localhost:3333/api/units/${this.editedUnit.id}`, {
					unit: this.editedUnit.unit,
					typology_id: this.editedUnit.typology,
				})
				.then((res) => {
					this.editItemSuccess = res.data.message;

					setTimeout(() => {
						this.editItemSuccess = null;
					}, 3000);

					console.log(res);
				})
				.catch((err) => {
					this.editItemErrorMsg = err.response.data.error;
					setTimeout(() => {
						this.editItemErrorMsg = null;
					}, 3000);

					console.log(err);
				});
		},
		updateTypology() {
			axios
				.put(`http://localhost:3333/api/typologies/${this.editedTypology.selectedTypology}`, {
					typology: this.editedTypology.typologyName,
					permilage: this.editedTypology.permilage,
				})
				.then((res) => {
					this.editItemSuccess = res.data.message;
					setTimeout(() => {
						this.editItemSuccess = null;
					}, 3000);

					this.$refs.editTypologyForm.reset();

					console.log(res);
				})
				.catch((err) => {
					this.editItemErrorMsg = err.response.data.error;
					setTimeout(() => {
						this.editItemErrorMsg = null;
					}, 3000);
					console.log(err);
				});
		},
		close() {
			this.editDialog = false;
			this.$nextTick(() => {
				this.editedIndex = -1;
			});
		},
	},
};
</script>

<style scoped></style>
