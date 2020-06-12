<template>
	<div class="movements">
		<v-tabs v-model="tab" grow color="black">
			<v-tab v-for="(t, index) in tabs" :key="`${index}-${t.tab}`">
				{{ t.tab }}
			</v-tab>
		</v-tabs>

		<v-tabs-items v-model="tab">
			<v-tab-item>
				<Revenues />
			</v-tab-item>
			<v-tab-item>
				<Expenses />
			</v-tab-item>
			<v-tab-item>
				<RegisterMovement />
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script>
import LayoutDefault from '@/layouts/LayoutDefault';
import Revenues from '@/components/Movements/Revenues.vue';
import Expenses from '@/components/Movements/Expenses.vue';
import RegisterMovement from '@/components/Movements/RegisterMovement.vue';

export default {
	components: {
		Revenues,
		Expenses,
		RegisterMovement,
	},
	name: 'Movements',
	data: () => ({
		tab: null,
		tabs: [{ tab: 'Receitas' }, { tab: 'Despesas' }, { tab: 'Novo Movimento' }],
	}),
	created() {
		this.$emit('update:layout', LayoutDefault);
	},
	watch: {},
	mounted() {},
	methods: {},
};
</script>

<style></style>
