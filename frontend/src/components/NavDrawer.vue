<template>
	<v-navigation-drawer app clipped absolute permanent color="secondary" width="333">
		<v-list flat class="mt-4">
			<v-list-item-group active-class="font-weight-black">
				<v-list-item
					v-for="item in items"
					:key="item.title"
					:ripple="{ center: true, class: 'white--text' }"
				>
					<v-list-item-icon>
						<v-icon color="white">{{ item.icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list-item-group>
		</v-list>

		<!-- slots -->
		<!-- 
    <template v-slot:prepend>
      <h1>fa</h1>
		</template>
	-->
	</v-navigation-drawer>
</template>

<script>
export default {
	data() {
		return {
			items: [
				{ title: 'Home', icon: 'mdi-home-city' },
				{ title: 'Mapa de Pagamento', icon: 'mdi-clipboard-text' },
				{ title: 'Gestão do Condomínio', icon: 'mdi-office-building' },
				{ title: 'Movimentos', icon: 'mdi-currency-usd' },
				{ title: 'Contactos', icon: 'mdi-card-account-mail' },
				{ title: 'Gestão de Utilizadores', icon: 'mdi-account-group' },
				{ title: 'Definições', icon: 'mdi-cog' },
			],
		};
	},
};
</script>

<style scoped>
.v-navigation-drawer {
	top: 80px;
}
</style>
