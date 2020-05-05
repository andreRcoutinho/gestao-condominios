<template>
	<div class="movements">
		<v-tabs v-model="tab" grow color="black">
			<v-tab v-for="(t, index) in tabs" :key="`${index}-${t.tab}`">
				{{ t.tab }}
			</v-tab>
		</v-tabs>

		<v-tabs-items v-model="tab">
			<!-- CONDOMINOS -->
			<v-tab-item>
				<v-row justify="space-around">
					<v-col cols="8">
						<v-simple-table>
							<template v-slot:default>
								<thead>
									<tr>
										<th class="text-left">Parcela</th>
										<th class="text-left">Nome</th>
										<th class="text-left">Email</th>
										<th class="text-left">Telemóvel</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item, index) in owners" :key="index">
										<td>{{ item.units[0] }}</td>
										<td>{{ item.name }}</td>
										<td>{{ item.email }}</td>
										<td>{{ item.contacts[0] }}</td>
									</tr>
								</tbody>
							</template>
						</v-simple-table>
					</v-col>
				</v-row>
			</v-tab-item>
			<!-- FORNECEDORES -->
			<v-tab-item>
				<v-row justify="space-around">
					<v-col cols="8">
						<v-simple-table>
							<template v-slot:default>
								<thead>
									<tr>
										<th class="text-left">Entidade</th>
										<th class="text-left">Nome</th>
										<th class="text-left">Email</th>
										<th class="text-left">NIF</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item, index) in suppliers" :key="index">
										<td>{{ item.company_name }}</td>
										<td>{{ item.name }}</td>
										<td>{{ item.email }}</td>
										<td>{{ item.NIF }}</td>
									</tr>
								</tbody>
							</template>
						</v-simple-table>
					</v-col>
				</v-row>
			</v-tab-item>
			<!-- NOVO MOVIMENTO -->
			<v-tab-item>
				<v-row justify="center">
					<v-col class="custom_col"> </v-col>
				</v-row>
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script>
// TODO - Apresentar + info de cada contacto
// TODO - Form de novo contacto de fornecedor

import axios from 'axios';

import LayoutDefault from '@/layouts/LayoutDefault';

export default {
	name: 'Contacts',
	data: () => ({
		tab: null,
		tabs: [{ tab: 'Condóminos' }, { tab: 'Fornecedores' }, { tab: 'Novo Fornecedor' }],
		owners: [],
		suppliers: [],
	}),
	created() {
		this.$emit('update:layout', LayoutDefault);
	},
	mounted() {
		axios.get('//localhost:3333/api/suppliers').then((res) => (this.suppliers = res.data.data));
		axios.get('//localhost:3333/api/users/').then((res) => (this.owners = res.data.data));
	},
};
</script>

<style>
.custom_col {
	flex-grow: 0;
}
</style>
