<template>
	<v-navigation-drawer app clipped fixed permanent color="secondary" width="333">
		<v-list flat class="mt-4">
			<v-list-item
				v-for="item in items"
				:key="item.title"
				:to="item.route"
				:ripple="{ center: true, class: 'white--text' }"
				active-class="font-weight-black"
			>
				<v-list-item-icon>
					<v-icon color="white">{{ item.icon }}</v-icon>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
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
				{ title: 'Home', icon: 'mdi-home-city', route: '/home' },
				{ title: 'Mapa de Pagamento', icon: 'mdi-clipboard-text', route: '/mapas' },
				{
					title: 'Gestão do Condomínio',
					icon: 'mdi-office-building',
					route: '/gestao-condominio',
				},
				{ title: 'Movimentos', icon: 'mdi-currency-usd', route: '/movimentos' },
				{ title: 'Contactos', icon: 'mdi-card-account-mail', route: '/contactos' },
				{ title: 'Gestão de Utilizadores', icon: 'mdi-account-group', route: '/utilizadores' },
				{ title: 'Definições de Utilizador', icon: 'mdi-cog', route: '/definicoes-utilizador' },
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
