<template>
	<div class="paymentMaps">
		<v-tabs v-model="tab" grow color="black">
			<v-tab v-for="(t, index) in tabs" :key="`${index}-${t.tab}`">
				{{ t.tab }}
			</v-tab>
		</v-tabs>

		<v-tabs-items v-model="tab">
			<!-- RECEITAS ANUAL -->
			<v-tab-item>
				<AnualMap />
			</v-tab-item>
			<!-- OUTROS -->
			<v-tab-item>
				<Others />
			</v-tab-item>
			<!-- NOVO MAPA -->
			<v-tab-item>
				<RegisterMap />
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script>
import LayoutDefault from '@/layouts/LayoutDefault';

import AnualMap from '@/components/PaymentMaps/AnualMap.vue';
import Others from '@/components/PaymentMaps/Others.vue';
import RegisterMap from '@/components/PaymentMaps/RegisterMap.vue';

export default {
	name: 'PaymentMaps',
	components: {
		AnualMap,
		Others,
		RegisterMap,
	},
	data: () => ({
		tab: null,
		tabs: [{ tab: 'Mensalidades' }, { tab: 'Outros' }, { tab: 'Novo Mapa' }],
	}),
	watch: {},
	mounted() {},
	created() {
		this.$emit('update:layout', LayoutDefault);
	},
	methods: {},
};
</script>

<style>
/* .contentCell {
	max-width: 7.875% !important;
	min-width: 7.875% !important;
} */
</style>
