<template>
	<div>
		<v-tabs v-model="tab" centered color="black">
			<v-tab v-for="(m, index) in months" :key="index" @click="getData(index)">
				{{ m }}
			</v-tab>
		</v-tabs>

		<v-tabs-items v-model="tab">
			<v-tab-item v-for="item in months" :key="item">
				<v-row id="height"> </v-row>
				<v-row justify="space-around" class="my-10 mx-12">
					<v-col>
						<v-card class="mb-12 text-center" color="primary" height="200px" raised>
							<v-row justify="center">
								<v-card-title class="mt-6 secondary--text text-h5 font-weight-medium">
									Rendas pagas
								</v-card-title>
							</v-row>
							<v-card-subtitle class="display-1">
								{{ totals.total_paid | formatDecimals }} €
							</v-card-subtitle>
						</v-card>
					</v-col>
					<v-col>
						<v-card class="mb-12 text-center" color="primary" height="200px" raised>
							<v-row justify="center">
								<v-card-title class="mt-6 secondary--text text-h5 font-weight-medium">
									Rendas em falta
								</v-card-title>
							</v-row>
							<v-card-subtitle class="display-1">
								{{ totals.total_missing | formatDecimals }} €
							</v-card-subtitle>
						</v-card>
					</v-col>
					<v-col>
						<v-card class="mb-12 text-center" color="primary" height="200px" raised>
							<v-row justify="center">
								<v-card-title class="mt-6 secondary--text text-h5 font-weight-medium"
									>Total gasto</v-card-title
								>
							</v-row>
							<v-card-subtitle class="display-1">
								{{ totals.total_spent | formatDecimals }} €
							</v-card-subtitle>
						</v-card>
					</v-col>
				</v-row>
				<v-row justify="space-around">
					<v-col cols="4">
						<v-simple-table class="elevation-1">
							<thead>
								<tr>
									<th class="text-left">Tipologia</th>
									<th class="text-center">Valor</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item, index) in totals.typology_values" :key="index">
									<td class="text-left">{{ item.name }}</td>
									<td class="text-center">{{ item.value }} €</td>
								</tr>
							</tbody>
						</v-simple-table>
					</v-col>
					<v-col cols="4">
						<v-row justify="center">
							<v-card shaped class="widthMod">
								<v-card-title class="justify-center secondary--text title">
									<v-icon left>mdi-home</v-icon>Por pagar
								</v-card-title>
								<v-row justify="center" class="mx-0">
									<v-list class="column_wrapper mb-5">
										<v-list-item
											v-for="(item, index) in totals.missing_payment_unit"
											:key="index"
										>
											<v-list-item-content>
												<v-chip class="justify-center" outlined color="secondary">{{
													item
												}}</v-chip>
											</v-list-item-content>
										</v-list-item>
									</v-list>
								</v-row>
							</v-card>
						</v-row>
					</v-col>
				</v-row>
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script>
import axios from 'axios';

import { authComputed } from '../store/helpers.js';

import LayoutDefault from '@/layouts/LayoutDefault';

export default {
	name: 'Home',
	data: () => ({
		tab: null,
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
		totals: {},
	}),
	created() {
		this.$emit('update:layout', LayoutDefault);
	},
	methods: {
		getData(tab) {
			axios
				.get(
					`//localhost:3333/api/others/monthly-data?year=${new Date()
						.getFullYear()
						.toString()}&month=${tab + 1}`
				)
				.then((res) => (this.totals = res.data.data));
		},
	},
	mounted() {
		axios
			.get(
				`//localhost:3333/api/others/monthly-data?year=${new Date()
					.getFullYear()
					.toString()}&month=1`
			)
			.then((res) => (this.totals = res.data.data));
	},
	computed: {
		...authComputed,
	},
};
</script>

<style>
/* .home {
	margin: 20px;
	padding: 10px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	min-height: 88vh;
	background-color: #ffffff;
} */

.widthMod {
	max-width: 110% !important;
}

#height {
	min-height: 45px;
}

.column_wrapper {
	column-count: 3;
}
</style>
