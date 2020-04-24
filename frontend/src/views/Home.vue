<template>
	<div>
		<v-tabs v-model="tab" centered color="black">
			<v-tab v-for="(m, index) in months" :key="index">
				{{ m.tab }}
			</v-tab>
		</v-tabs>

		<v-tabs-items v-model="tab">
			<v-tab-item v-for="item in months" :key="item.tab">
				<v-row justify="space-around" class="mt-12">
					<v-col cols="3">
						<v-card class="mb-12" color="grey lighten-4" height="200px" raised>
							{{ roles[0] }}
						</v-card>
					</v-col>
					<v-col cols="3">
						<v-card class="mb-12" color="grey lighten-4" height="200px" raised>
							{{ item.content }}
						</v-card>
					</v-col>
					<v-col cols="3">
						<v-card class="mb-12" color="grey lighten-4" height="200px" raised>
							{{ item.content }}
						</v-card>
					</v-col>
				</v-row>
				<v-row justify="space-around">
					<v-col cols="8">
						<v-simple-table>
							<template v-slot:default>
								<thead>
									<tr>
										<th class="text-left">Tipologia</th>
										<th class="text-left">Valor</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="item in typo" :key="item.name">
										<td>{{ item.name }}</td>
										<td>{{ item.price }}</td>
									</tr>
								</tbody>
							</template>
						</v-simple-table>
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
		roles: [],
		tab: null,
		months: [
			{ tab: 'janeiro', content: 'Tab 1 Content' },
			{ tab: 'fevereiro', content: 'Tab 2 Content' },
			{ tab: 'março', content: 'Tab 3 Content' },
			{ tab: 'abril', content: 'Tab 4 Content' },
			{ tab: 'maio', content: 'Tab 5 Content' },
			{ tab: 'junho', content: 'Tab 6 Content' },
			{ tab: 'julho', content: 'Tab 7 Content' },
			{ tab: 'agosto', content: 'Tab 8 Content' },
			{ tab: 'setembro', content: 'Tab 9 Content' },
			{ tab: 'outubro', content: 'Tab 10 Content' },
			{ tab: 'novembro', content: '11content' },
			{ tab: 'dezembro', content: '12content' },
		],
		typo: [
			{ name: 'T1', price: '20€' },
			{ name: 'T2', price: '20€' },
			{ name: 'T3', price: '20€' },
			{ name: 'T4', price: '20€' },
			{ name: 'T4 Duplex', price: '20€' },
			{ name: 'Loja', price: '20€' },
		],
	}),
	created() {
		this.$emit('update:layout', LayoutDefault);
		axios.get('//localhost:3333/api/roles').then(({ data }) => {
			this.roles = data.data;
		});
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
</style>
