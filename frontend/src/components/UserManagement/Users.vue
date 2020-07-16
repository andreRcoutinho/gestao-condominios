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
						<v-icon class="mr-2" @click="openOwnerInfo(props.item)">
							mdi-plus
						</v-icon>
						<v-icon small class="mr-2" @click="editItem(props.item)">
							mdi-pencil
						</v-icon>
						<v-icon small class="mr-2" @click="deleteItem(props.item)">
							mdi-delete
						</v-icon>
					</template>
				</v-data-table>

				<v-dialog v-model="editDialog" max-width="650px" persistent>
					<v-card>
						<v-card-title>
							<span class="headline">Atualizar Utilizador</span>
						</v-card-title>

						<v-card-text>
							<v-container>
								<v-row>
									<v-col cols="12" md="6">
										<v-text-field
											v-model="editedItem.first_name"
											label="Primeiro Nome"
											color="secondary"
										></v-text-field>
									</v-col>
									<v-col cols="12" md="6">
										<v-text-field
											v-model.number="editedItem.last_name"
											label="Último Nome"
											color="secondary"
										></v-text-field>
									</v-col>
									<v-col cols="12" md="6">
										<v-text-field
											v-model="editedItem.email"
											label="Email"
											color="secondary"
										></v-text-field>
									</v-col>

									<v-col cols="6">
										<v-select
											v-model="editedItem.role"
											:items="roles"
											label="Permissões"
											item-text="role_name"
											item-value="id"
											color="secondary"
											item-color="secondary"
											@input="updateRole"
										></v-select>
									</v-col>
									<v-col cols="6">
										<v-text-field
											v-model="editedItem.contactValue"
											label="Contacto"
											color="secondary"
											:append-icon="`mdi-plus`"
											@click:append="addNewContact"
											@keydown.enter="addNewContact"
										>
										</v-text-field>
										<v-list dense>
											<v-list-item v-for="(c, i) in editedItem.contacts" :key="i">
												<v-list-item-icon>
													<v-icon small>mdi-phone</v-icon>
												</v-list-item-icon>
												<v-list-item-content>
													<v-list-item-subtitle>
														{{ c.phone_number }}
													</v-list-item-subtitle>
												</v-list-item-content>
												<v-list-item-action class="my-0">
													<v-btn x-small icon @click="deleteUserContact(i)">
														<v-icon>mdi-delete</v-icon>
													</v-btn>
												</v-list-item-action>
											</v-list-item>
										</v-list>
									</v-col>
									<v-col cols="6">
										<v-select
											v-model="editedItem.selectedUnit"
											:items="units"
											label="Parcela"
											item-text="unit"
											item-value="id"
											color="secondary"
											item-color="secondary"
											@input="addUnitToUser"
										></v-select>
										<v-list dense>
											<v-list-item v-for="(u, i) in editedItem.units" :key="i">
												<v-list-item-icon>
													<v-icon small>mdi-home</v-icon>
												</v-list-item-icon>
												<v-list-item-content>
													<v-list-item-subtitle>
														{{ u.unit }}
													</v-list-item-subtitle>
												</v-list-item-content>
												<v-list-item-action class="my-0">
													<v-btn x-small icon @click="deleteUserUnit(i)">
														<v-icon>mdi-delete</v-icon>
													</v-btn>
												</v-list-item-action>
											</v-list-item>
										</v-list>
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
							<v-btn color="secondary" text @click="updateUser">Atualizar</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>

				<v-dialog v-model="ownerRowDlog.show" max-width="650px">
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
													v-text="unit.unit"
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
													v-text="ctct.phone_number"
												></v-list-item-title>
											</v-list-item-content>
										</v-list-item>
									</v-list>
								</v-col>
							</v-row>
							<v-row class="mr-2">
								<v-spacer></v-spacer>
								<v-btn color="red" text @click="closeOwnerInfo">Fechar</v-btn>
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
		<v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout" top :color="snackbar.colour">
			{{ snackbar.message }}
			<v-icon v-if="snackbar.success"> mdi-checkbox-marked-circle</v-icon>
			<v-icon v-else>
				mdi-cancel
			</v-icon>
		</v-snackbar>
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
					text: 'Permissões',
					value: 'role.role_name',
					align: 'center',
				},
				{
					text: 'Ações',
					value: 'actions',
					sortable: false,
					align: 'center',
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

		editDialog: false,
		editedIndex: -1,
		editedItem: {
			first_name: '',
			last_name: '',
			email: '',
			IBAN: '',
			NIF: '',
			role: null,
			contacts: [],
			units: [],

			selectedUnit: null,

			contactValue: null,
			otherContact: false,
		},

		editItemSuccess: null,
		editItemErrorMsg: null,

		owners: [],
		roles: [],
		units: [],
	}),
	created() {},
	mounted() {
		axios.get('//localhost:3333/api/users/').then((res) => (this.owners = res.data.data));
		axios.get('//localhost:3333/api/roles/').then((res) => (this.roles = res.data.data));
		axios.get('//localhost:3333/api/units/').then((res) => (this.units = res.data.data));
	},
	methods: {
		updateUser() {
			axios
				.put(`http://localhost:3333/api/users/${this.editedItem.id}`, {
					first_name: this.editedItem.first_name,
					last_name: this.editedItem.last_name,
					email: this.editedItem.email,
					IBAN: this.editedItem.IBAN,
					NIF: this.editedItem.NIF,
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
		async addUnitToUser() {
			if (this.editedItem.selectedUnit) {
				await axios
					.put(`http://localhost:3333/api/users/${this.editedItem.id}/add-unit`, {
						unit_id: this.editedItem.selectedUnit,
					})
					.then((res) => {
						this.editedItem.units.push(res.data.data);
						console.log(res);
					})
					.catch((err) => console.log(err));
			}
			this.editedItem.selectedUnit = null;
			console.log(this.editedItem.units);
		},
		deleteUserUnit(index) {
			axios
				.put(`http://localhost:3333/api/users/${this.editedItem.id}/delete-unit`, {
					unit_id: this.editedItem.units[index].id,
				})
				.then((res) => {
					this.editedItem.units.splice(index, 1);
					console.log(res);
				})
				.catch((err) => console.log(err));
		},
		updateRole() {
			axios
				.put(`http://localhost:3333/api/users/${this.editedItem.id}/update-role`, {
					role_id: this.editedItem.role,
				})
				.then((res) => {
					console.log(res);
				})
				.catch((err) => console.log(err));
		},
		addNewContact() {
			if (this.editedItem.contactValue) {
				axios
					.put(`http://localhost:3333/api/users/${this.editedItem.id}/add-contact`, {
						phone_number: this.editedItem.contactValue,
					})
					.then((res) => {
						this.editedItem.contacts.push(res.data.data);
						console.log(res);
					})
					.catch((err) => console.log(err));
			}
			this.editedItem.otherContact = true;
			this.editedItem.contactValue = null;
			console.log(this.editedItem.contacts);
		},
		deleteUserContact(index) {
			axios
				.put(`http://localhost:3333/api/users/${this.editedItem.id}/delete-contact`, {
					contact_id: this.editedItem.contacts[index].id,
				})
				.then((res) => {
					this.editedItem.contacts.splice(index, 1);
					console.log(res);
				})
				.catch((err) => console.log(err));
		},
		openOwnerInfo(item) {
			Object.assign(this.ownerRowDlog, item);
			this.ownerRowDlog.show = true;
		},
		close() {
			this.editDialog = false;
			this.$nextTick(() => {
				this.editedIndex = -1;
			});
		},
		editItem(item) {
			this.editedIndex = this.owners.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.editDialog = true;
			// console.log(this.editedIndex);
			//console.log(this.editedItem);
		},
		deleteItem(item) {
			const index = this.owners.indexOf(item);

			confirm('Are you sure you want to delete this item?') &&
				axios
					.delete(`http://localhost:3333/api/users/${item.id}`)
					.then((res) => {
						this.owners.splice(index, 1);

						this.snackbar.message = res.data.message;
						this.snackbar.success = true;
						this.snackbar.colour = 'green';
						this.snackbar.show = true;

						console.log(res);
					})
					.catch((err) => {
						this.snackbar.message = err.response.data.error;
						this.snackbar.success = false;
						this.snackbar.colour = 'red';
						this.snackbar.show = true;

						console.log(err);
					});
		},
		closeOwnerInfo() {
			this.ownerRowDlog.show = false;
		},
	},
};
</script>

<style scoped>
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
