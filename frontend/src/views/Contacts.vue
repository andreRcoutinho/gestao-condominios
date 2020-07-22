<template>
	<div class="movements">
		<v-tabs v-model="tab" grow color="black">
			<v-tab v-for="(t, index) in tabs" :key="`${index}-${t.tab}`">
				{{ t.tab }}
			</v-tab>
		</v-tabs>

		<v-tabs-items v-model="tab">
			<v-tab-item>
				<Owners />
			</v-tab-item>

			<v-tab-item>
				<Suppliers />
			</v-tab-item>

			<v-tab-item>
				<RegisterSupplier />
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script>
import LayoutDefault from '@/layouts/LayoutDefault';

import Owners from '@/components/Contacts/Owners.vue';
import Suppliers from '@/components/Contacts/Suppliers.vue';
import RegisterSupplier from '@/components/Contacts/RegisterSupplier.vue';

export default {
	name: 'Contacts',
	components: {
		Owners,
		Suppliers,
		RegisterSupplier,
	},
	data: () => ({
		tab: null,
		tabs: [{ tab: 'Condóminos' }, { tab: 'Fornecedores' }],
	}),
	created() {
		this.$emit('update:layout', LayoutDefault);
	},
	mounted() {
		let role = this.$store.state.user.role_name;

		if (role == 'Administrador') {
			this.tabs.push({ tab: 'Novo Fornecedor' });
		}
	},
	methods: {},
};
</script>

<style scoped></style>
