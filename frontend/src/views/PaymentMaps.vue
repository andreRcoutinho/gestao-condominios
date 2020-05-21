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
				<v-row justify="space-around" class="mt-12">
					<v-col cols="10">
						<v-data-table
							:headers="headers"
							:items="paymentMapAnualRevenues"
							hide-default-footer
						>
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
		tab: null,
		tabs: [{ tab: 'Mensalidades' }, { tab: 'Outros' }, { tab: 'Novo Mapa' }],

		units: [],
		paymentMapAnualRevenues: [],
		months: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
		headers: [{ text: '', value: 'unit', sortable: false }],
	}),
	mounted() {
		this.months.forEach((m) => {
			this.headers.push({
				text: m,
				align: 'center',
				sortable: false,
				class: 'black--text',
			});
		});

		axios.get('//localhost:3333/api/payment_map/1').then((res) => {
			let revenuesArray = res.data.data.revenues;

			for (let i = 0; i < revenuesArray.length; i++) {
				let initialArray = this.paymentMapAnualRevenues.filter(
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
					this.paymentMapAnualRevenues.push({ unit: revenuesArray[i].unit, months: months });
				}
			}
			console.log(this.paymentMapAnualRevenues);
		});

		axios.get('//localhost:3333/api/units').then((res) => (this.units = res.data.data));
	},
	created() {
		this.$emit('update:layout', LayoutDefault);
	},
	methods: {},
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
