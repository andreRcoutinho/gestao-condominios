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
				<v-row justify="center">
					<v-col cols="6">
						<v-text-field
							v-model="ownersTableOptions.search"
							append-icon="mdi-magnify"
							label="Search"
							single-line
							hide-details
							color="#949494"
							class="mt-8"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row justify="space-around">
					<v-col cols="8">
						<v-data-table
							:headers="ownersTableOptions.headers"
							:items="owners"
							:search="ownersTableOptions.search"
							hide-default-footer
							:page.sync="ownersTableOptions.page"
							:items-per-page="ownersTableOptions.itemsPerPage"
							class="elevation-1"
							@page-count="ownersTableOptions.pageCount = $event"
							:sort-by="['name']"
							:sort-desc="[false]"
							:single-expand="ownersTableOptions.singleExpand"
							:expanded.sync="ownersTableOptions.expanded"
							item-key="name"
							show-expand
						>
							<template v-slot:expanded-item="{ headers, item }">
								<table>
									<tr>
										<th>NIF</th>
										<td>{{ item.NIF }}</td>
									</tr>
									<tr>
										<th>IBAN</th>
										<td>{{ item.IBAN }}</td>
									</tr>
									<tr>
										<th rowspan="item.contacts.length">Contacto</th>
										<td v-for="(c, index) in item.contacts" :key="index">
											{{ c }}
										</td>
									</tr>
									<tr>
										<th rowspan="item.units.length">Frações</th>
										<td v-for="(unit, index) in item.units" :key="index">
											{{ unit }}
										</td>
									</tr>
								</table>
							</template>
						</v-data-table>
						<div class="text-center pt-3">
							<v-pagination
								v-model="ownersTableOptions.page"
								:length="ownersTableOptions.pageCount"
								:total-visible="7"
								color="secondary"
							></v-pagination>
						</div>
					</v-col>
				</v-row>
			</v-tab-item>

			<!-- FORNECEDORES -->
			<v-tab-item>
				<v-row justify="center">
					<v-col cols="6">
						<v-text-field
							v-model="ownersTableOptions.search"
							append-icon="mdi-magnify"
							label="Search"
							single-line
							hide-details
							color="#949494"
							class="mt-8"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row justify="space-around">
					<v-col cols="8">
						<v-data-table
							:headers="suppliersTableOptions.headers"
							:items="suppliers"
							:search="suppliersTableOptions.search"
							hide-default-footer
							:page.sync="suppliersTableOptions.page"
							:items-per-page="suppliersTableOptions.itemsPerPage"
							class="elevation-1"
							@page-count="suppliersTableOptions.pageCount = $event"
							:sort-by="['company_name']"
							:sort-desc="[false]"
							:single-expand="suppliersTableOptions.singleExpand"
							:expanded.sync="suppliersTableOptions.expanded"
							item-key="name"
							show-expand
						>
							<template v-slot:expanded-item="{ headers, item }">
								<td :colspan="headers.length">More info about {{ item.name }}</td>
							</template>
						</v-data-table>
						<div class="text-center pt-3">
							<v-pagination
								v-model="suppliersTableOptions.page"
								:length="suppliersTableOptions.pageCount"
								:total-visible="7"
								color="secondary"
							></v-pagination>
						</div>
					</v-col>
				</v-row>
			</v-tab-item>
			<!-- NOVO FORNECEDOR -->
			<!-- TODO - CRIAR NOVO SERVICE TYPE SE JÁ NAO ESTIVER REGISTADO -->
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
		ownersTableOptions: {
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
					text: 'Email',
					value: 'email',
					align: 'center',
				},
				{
					text: '',
					value: 'data-table-expand',
				},
			],
		},
		suppliersTableOptions: {
			search: '',
			page: 1,
			pageCount: 0,
			itemsPerPage: 10,
			expanded: [],
			singleExpand: false,
			headers: [
				{
					text: 'Entidade',
					value: 'company_name',
					align: 'center',
				},
				{
					text: 'Nome',
					value: 'name',
					align: 'center',
				},
				{
					text: 'Email',
					value: 'email',
					align: 'center',
				},
				{
					text: '',
					value: 'data-table-expand',
				},
			],
		},
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
