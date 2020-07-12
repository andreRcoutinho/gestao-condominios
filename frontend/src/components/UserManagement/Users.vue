<template>
	<div>
		<!-- SEARCH BAR -->
		<v-row justify="center" align="end" class="mt-8">
			<v-col cols="5">
				<v-text-field
					v-model="ownersTableOptions.search"
					append-icon="mdi-magnify"
					label="Search"
					single-line
					hide-details
					color="secondary"
				></v-text-field>
			</v-col>
			<v-col cols="1" class="pb-1">
				<v-row justify="end">
					<v-menu v-model="downloadOwnersMenu" :close-on-content-click="false" offset-y>
						<template v-slot:activator="{ on }">
							<v-btn icon v-on="on">
								<v-icon color="secondary">
									mdi-download
								</v-icon>
							</v-btn>
						</template>

						<v-card width="175">
							<v-container>
								<v-row justify="center">
									<v-btn
										color="secondary"
										text
										@click="saveFile(owners, 'condominos', true)"
										>JSON</v-btn
									>
									<v-btn
										color="secondary"
										text
										@click="saveFile(owners, 'condominos', false)"
										>CSV</v-btn
									>
								</v-row>
								<v-row justify="center" align="end">
									<v-btn text @click="downloadOwnersMenu = false" color="red">
										Fechar
									</v-btn>
								</v-row>
							</v-container>
						</v-card>
					</v-menu>
				</v-row>
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
					class="elevation-0"
					@page-count="ownersTableOptions.pageCount = $event"
					:sort-by="['name']"
					:sort-desc="[false]"
					item-key="name"
				>
					<template v-slot:item.actions="props">
						<v-icon class="mr-2" @click="openOwnerInfo(props.item)" color="red">
							mdi-delete
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
											<v-list-item-title>{{ ownerRowDlog.IBAN }}</v-list-item-title>
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
										<v-list-item v-for="(ctct, i) in ownerRowDlog.contacts" :key="i">
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
								<v-btn color="blue darken-1" text @click="closeOwnerInfo">Fechar</v-btn>
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
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'Users',
	data: () => ({
		downloadOwnersMenu: false,

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

		owners: [],
	}),
	created() {},
	mounted() {
		axios.get('//localhost:3333/api/users/').then((res) => (this.owners = res.data.data));
	},
	methods: {
		openOwnerInfo(item) {
			Object.assign(this.ownerRowDlog, item);
			this.ownerRowDlog.show = true;
		},
		closeOwnerInfo() {
			this.ownerRowDlog.show = false;
		},
	},
};
</script>

<style scoped></style>
