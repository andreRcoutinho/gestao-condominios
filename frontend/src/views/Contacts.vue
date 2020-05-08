<template>
	<div class="movements">
		<v-tabs v-model="tab" grow color="black">
			<v-tab v-for="(t, index) in tabs" :key="`${index}-${t.tab}`">
				{{ t.tab }}
			</v-tab>
		</v-tabs>

		<v-tabs-items v-model="tab">
			<!-- OWNERS -->
			<v-tab-item>
				<!-- SEARCH BAR -->
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
				<!-- OWNERS TABLE -->
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
						>
							<template v-slot:item.actions="props">
								<v-icon class="mr-2" @click="openOwnerInfo(props.item)">
									mdi-plus
								</v-icon>
							</template>
						</v-data-table>
						<v-dialog v-model="ownerRowDlog.show" max-width="600px">
							<v-card>
								<v-card-title class="ml-2 pt-5">
									<span>{{ ownerRowDlog.name }}</span>
								</v-card-title>

								<v-card-text>
									<v-row class="ml-6">
										<v-col cols="6">
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-subtitle>IBAN</v-list-item-subtitle>
													<v-list-item-title>{{
														ownerRowDlog.IBAN
													}}</v-list-item-title>
												</v-list-item-content>
											</v-list-item>
										</v-col>
										<v-col cols="6">
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-subtitle>NIF</v-list-item-subtitle>
													<v-list-item-title>{{ ownerRowDlog.NIF }}</v-list-item-title>
												</v-list-item-content>
											</v-list-item>
										</v-col>
										<v-col cols="6">
											<v-list disabled>
												<v-subheader class="mb-0">Fração</v-subheader>
												<v-list-item v-for="(unit, i) in ownerRowDlog.units" :key="i">
													<v-list-item-icon>
														<v-icon>mdi-home</v-icon>
													</v-list-item-icon>
													<v-list-item-content>
														<v-list-item-title
															class="listItem"
															v-text="ownerRowDlog.units[i]"
														></v-list-item-title>
													</v-list-item-content>
												</v-list-item>
											</v-list>
										</v-col>
										<v-col cols="6">
											<v-list disabled>
												<v-subheader>Contacto</v-subheader>
												<v-list-item
													v-for="(ctct, i) in ownerRowDlog.contacts"
													:key="i"
												>
													<v-list-item-icon>
														<v-icon>mdi-phone</v-icon>
													</v-list-item-icon>
													<v-list-item-content>
														<v-list-item-title
															class="listItem"
															v-text="ownerRowDlog.contacts[i]"
														></v-list-item-title>
													</v-list-item-content>
												</v-list-item>
											</v-list>
										</v-col>
									</v-row>
									<v-row class="mr-2">
										<v-spacer></v-spacer>
										<v-btn color="blue darken-1" text @click="closeOwnerInfo"
											>Fechar</v-btn
										>
										<!-- <v-btn color="blue darken-1" text>Editar</v-btn> -->
										<!-- <v-btn color="blue darken-1" text>Eliminar</v-btn> -->
									</v-row>
								</v-card-text>
							</v-card>
						</v-dialog>
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

			<!-- SUPPLIERS -->
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
						>
							<template v-slot:item.actions="props">
								<v-icon class="mr-2" @click="openSupplierInfo(props.item)">
									mdi-plus
								</v-icon>
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
			<!-- NEW SUPPLIER -->
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
		ownerRowDlog: {
			show: false,
			name: '',
			email: '',
			IBAN: '',
			NIF: '',
			contacts: [],
			units: [],
		},
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
					text: 'Mais info',
					value: 'actions',
					sortable: false,
					align: 'center',
				},
			],
		},
		supplierRowDlog: {
			show: false,
			name: '',
			email: '',
			IBAN: '',
			NIF: '',
			contacts: [],
			units: [],
			service_types: [],
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
					text: 'Mais info',
					value: 'actions',
					sortable: false,
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
	methods: {
		openOwnerInfo(item) {
			Object.assign(this.ownerRowDlog, item);
			this.ownerRowDlog.show = true;
			console.log(item);
		},
		closeOwnerInfo() {
			this.ownerRowDlog.show = false;
		},
		openSupplierInfo(item) {
			Object.assign(this.supplierRowDlog, item);
			this.supplierRowDlog.show = true;
		},
		closeSupplierInfo() {
			this.supplierRowDlog.show = false;
		},
	},
};
</script>

<style scoped>
.custom_col {
	flex-grow: 0;
}
.listItem {
	-webkit-user-select: text;
	-moz-user-select: text;
	-ms-user-select: text;
	user-select: text;
}
.v-list-item__icon {
	margin-right: 16px !important;
}
.v-subheader {
	height: 0;
}
</style>
