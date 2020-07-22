<template>
	<div>
		<v-tabs v-model="tab" grow color="black">
			<v-tab v-for="(t, index) in tabs" :key="`${index}-${t.tab}`">
				{{ t.tab }}
			</v-tab>
		</v-tabs>

		<v-tabs-items v-model="tab">
			<v-tab-item>
				<Users />
			</v-tab-item>
			<v-tab-item>
				<RegisterUser />
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script>
import LayoutDefault from '@/layouts/LayoutDefault';

import Users from '@/components/UserManagement/Users.vue';
import RegisterUser from '@/components/UserManagement/RegisterUser.vue';

export default {
	name: 'UserManagement',
	components: {
		Users,
		RegisterUser,
	},
	data: () => ({
		tab: null,
		tabs: [{ tab: 'Utilizadores' }, { tab: 'Novo Utilizador' }],
	}),
	watch: {},
	mounted() {
		let role = this.$store.state.user.role_name;

		if (role !== 'Administrador') {
			this.$router.push('home');
		}
	},
	created() {
		this.$emit('update:layout', LayoutDefault);
	},
	methods: {},
};
</script>

<style scoped></style>
