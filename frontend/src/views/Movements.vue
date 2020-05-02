<template>
	<div class="movements">
		<v-tabs v-model="tab" grow color="black">
			<v-tab v-for="(t, index) in tabs" :key="`${index}-${t.tab}`">
				{{ t.tab }}
			</v-tab>
		</v-tabs>

		<v-tabs-items v-model="tab">
			<!-- RECEITAS -->
			<v-tab-item>
				<v-row justify="space-around">
					<v-col cols="8">
						<v-simple-table>
							<template v-slot:default>
								<thead>
									<tr>
										<th class="text-left">Parcela</th>
										<th class="text-left">Valor</th>
										<th class="text-left">Tipo de Receita</th>
										<th class="text-left">Data de Pagamento</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item, index) in receitas" :key="index">
										<td>{{ item.unit }}</td>
										<td>{{ item.price }}</td>
										<td>{{ item.description }}</td>
										<td>{{ item.date }}</td>
									</tr>
								</tbody>
							</template>
						</v-simple-table>
					</v-col>
				</v-row>
			</v-tab-item>
			<!-- DESPESAS -->
			<v-tab-item>
				<v-row justify="space-around">
					<v-col cols="8">
						<v-simple-table>
							<template v-slot:default>
								<thead>
									<tr>
										<th class="text-left">Fornecedor</th>
										<th class="text-left">Valor</th>
										<th class="text-left">Tipo de Despesa</th>
										<th class="text-left">Data de Pagamento</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item, index) in expenses" :key="index">
										<td>{{ item.supplier.company_name }}</td>
										<td>{{ item.value }}</td>
										<td>{{ item.description }}</td>
										<td>{{ item.payment_date | formatDate }}</td>
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
					<v-col class="custom_col">
						<v-dialog v-model="dialog1" persistent max-width="600px">
							<template v-slot:activator="{ on }" class="text-xs-center">
								<v-btn color="grey" dark v-on="on">Nova Receita</v-btn>
							</template>
							<v-card>
								<v-card-title>
									<span class="headline">Receita</span>
								</v-card-title>
								<v-card-text>
									<v-container>
										<v-row>
											<v-col cols="12" sm="6" md="4">
												<v-text-field label="Legal first name*" required></v-text-field>
											</v-col>
											<v-col cols="12" sm="6" md="4">
												<v-text-field
													label="Legal middle name"
													hint="example of helper text only on focus"
												></v-text-field>
											</v-col>
											<v-col cols="12" sm="6" md="4">
												<v-text-field
													label="Legal last name*"
													hint="example of persistent helper text"
													persistent-hint
													required
												></v-text-field>
											</v-col>
											<v-col cols="12">
												<v-text-field label="Email*" required></v-text-field>
											</v-col>
											<v-col cols="12">
												<v-text-field
													label="Password*"
													type="password"
													required
												></v-text-field>
											</v-col>
											<v-col cols="12" sm="6">
												<v-select
													:items="['0-17', '18-29', '30-54', '54+']"
													label="Age*"
													required
												></v-select>
											</v-col>
											<v-col cols="12" sm="6">
												<v-autocomplete
													:items="[
														'Skiing',
														'Ice hockey',
														'Soccer',
														'Basketball',
														'Hockey',
														'Reading',
														'Writing',
														'Coding',
														'Basejump',
													]"
													label="Interests"
													multiple
												></v-autocomplete>
											</v-col>
										</v-row>
									</v-container>
									<small>*indicates required field</small>
								</v-card-text>
								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn color="blue darken-1" text @click="dialog1 = false">Close</v-btn>
									<v-btn color="blue darken-1" text @click="dialog1 = false">Save</v-btn>
								</v-card-actions>
							</v-card>
						</v-dialog>
					</v-col>
					<v-col class="custom_col">
						<v-dialog v-model="dialog2" persistent max-width="600px">
							<template v-slot:activator="{ on }" class="text-xs-center">
								<v-btn color="grey" dark v-on="on">Nova Despesa</v-btn>
							</template>
							<v-card>
								<v-card-title>
									<span class="headline">Despesa</span>
								</v-card-title>
								<v-card-text>
									<v-container>
										<v-row>
											<v-col cols="12" sm="6" md="4">
												<v-text-field label="Legal first name*" required></v-text-field>
											</v-col>
											<v-col cols="12" sm="6" md="4">
												<v-text-field
													label="Legal middle name"
													hint="example of helper text only on focus"
												></v-text-field>
											</v-col>
											<v-col cols="12" sm="6" md="4">
												<v-text-field
													label="Legal last name*"
													hint="example of persistent helper text"
													persistent-hint
													required
												></v-text-field>
											</v-col>
											<v-col cols="12">
												<v-text-field label="Email*" required></v-text-field>
											</v-col>
											<v-col cols="12">
												<v-text-field
													label="Password*"
													type="password"
													required
												></v-text-field>
											</v-col>
											<v-col cols="12" sm="6">
												<v-select
													:items="['0-17', '18-29', '30-54', '54+']"
													label="Age*"
													required
												></v-select>
											</v-col>
											<v-col cols="12" sm="6">
												<v-autocomplete
													:items="[
														'Skiing',
														'Ice hockey',
														'Soccer',
														'Basketball',
														'Hockey',
														'Reading',
														'Writing',
														'Coding',
														'Basejump',
													]"
													label="Interests"
													multiple
												></v-autocomplete>
											</v-col>
										</v-row>
									</v-container>
									<small>*indicates required field</small>
								</v-card-text>
								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn color="blue darken-1" text @click="dialog2 = false">Close</v-btn>
									<v-btn color="blue darken-1" text @click="dialog2 = false">Save</v-btn>
								</v-card-actions>
							</v-card>
						</v-dialog>
					</v-col>
				</v-row>
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script>
//TODO - Apresentar receitas
//TODO - Acabar forms de nova despesa e nova receita

import axios from 'axios';

import LayoutDefault from '@/layouts/LayoutDefault';

export default {
	name: 'Movements',
	data: () => ({
		tab: null,
		dialog1: false,
		dialog2: false,
		tabs: [{ tab: 'Receitas' }, { tab: 'Despesas' }, { tab: 'Novo Movimento' }],
		receitas: [
			{
				unit: 'T1',
				price: '20€',
				description: 'Obras',
				date: '01/01/01',
			},
		],
		expenses: [],
	}),
	created() {
		this.$emit('update:layout', LayoutDefault);
	},
	mounted() {
		axios.get('//localhost:3333/api/expenses').then((res) => (this.expenses = res.data.data));
	},
};
</script>

<style>
.custom_col {
	flex-grow: 0;
}
</style>
