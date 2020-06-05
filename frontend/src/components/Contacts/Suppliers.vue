<template>
	<div>
		<!-- SEARCH BAR -->
		<v-row justify="center" align="end" class="mt-8">
			<v-col cols="5">
				<v-text-field
					v-model="suppliersTableOptions.search"
					append-icon="mdi-magnify"
					label="Search"
					single-line
					hide-details
					color="secondary"
				></v-text-field>
			</v-col>
			<v-col cols="1" class="pb-1">
				<v-row justify="center">
					<v-btn icon @click="saveFile(suppliers, 'fornecedores')">
						<v-icon color="secondary">
							mdi-download
						</v-icon>
					</v-btn>
				</v-row>
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
					item-key="name"
				>
					<template v-slot:item.actions="props">
						<v-icon class="mr-2" @click="openSupplierInfo(props.item)">
							mdi-plus
						</v-icon>
					</template>
				</v-data-table>

				<v-dialog v-model="supplierRowDlog.show" max-width="600px">
					<v-card>
						<v-card-title class="ml-2 pt-5">
							<span>
								{{ `${supplierRowDlog.company_name} - ${supplierRowDlog.name}` }}
							</span>
						</v-card-title>

						<v-card-text>
							<v-row class="ml-6">
								<v-col cols="6">
									<v-list-item two-line>
										<v-list-item-content>
											<v-list-item-subtitle>IBAN</v-list-item-subtitle>
											<v-list-item-title v-if="supplierRowDlog.IBAN">
												{{ supplierRowDlog.IBAN }}
											</v-list-item-title>
											<v-list-item-title v-else>
												Não disponível
											</v-list-item-title>
										</v-list-item-content>
									</v-list-item>
								</v-col>
								<v-col cols="6">
									<v-list-item two-line>
										<v-list-item-content>
											<v-list-item-subtitle>NIF</v-list-item-subtitle>
											<v-list-item-title>{{ supplierRowDlog.NIF }}</v-list-item-title>
										</v-list-item-content>
									</v-list-item>
								</v-col>
								<v-col cols="6">
									<v-list disabled>
										<v-subheader>Tipo de Serviço</v-subheader>
										<v-list-item
											v-for="(st, i) in supplierRowDlog.service_types"
											:key="i"
										>
											<v-list-item-icon>
												<v-icon>mdi-hammer-wrench</v-icon>
											</v-list-item-icon>
											<v-list-item-content>
												<v-list-item-title
													class="listItem"
													v-text="supplierRowDlog.service_types[i].service_type"
												></v-list-item-title>
											</v-list-item-content>
										</v-list-item>
									</v-list>
								</v-col>
								<v-col cols="6">
									<v-list disabled>
										<v-subheader>Contacto</v-subheader>
										<v-list-item v-for="(ctct, i) in supplierRowDlog.contacts" :key="i">
											<v-list-item-icon>
												<v-icon>mdi-phone</v-icon>
											</v-list-item-icon>
											<v-list-item-content>
												<v-list-item-title
													class="listItem"
													v-text="supplierRowDlog.contacts[i].phone_number"
												></v-list-item-title>
											</v-list-item-content>
										</v-list-item>
									</v-list>
								</v-col>
							</v-row>
							<v-row class="mr-2">
								<v-spacer></v-spacer>
								<v-btn color="blue darken-1" text @click="closeSupplierInfo">
									Fechar
								</v-btn>
								<!-- <v-btn color="blue darken-1" text>Editar</v-btn> -->
								<!-- <v-btn color="blue darken-1" text>Eliminar</v-btn> -->
							</v-row>
						</v-card-text>
					</v-card>
				</v-dialog>

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
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'Suppliers',
	data: () => ({
		// objeto é mapeado através da função openSupplierInfo
		supplierRowDlog: {
			show: false,
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
		suppliers: [],
	}),
	created() {},
	mounted() {
		axios.get('//localhost:3333/api/suppliers').then((res) => (this.suppliers = res.data.data));
	},
	methods: {
		saveFile(data, filename) {
			const jsonData = JSON.stringify(data, null, '\t');
			const blob = new Blob([jsonData], { type: 'application/json' });
			const a = document.createElement('a');
			a.download = `${filename}.json`;
			a.href = window.URL.createObjectURL(blob);
			a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
			document.body.appendChild(a);
			a.click();
		},

		openSupplierInfo(item) {
			Object.assign(this.supplierRowDlog, item);
			this.supplierRowDlog.show = true;
			console.log(item);
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
