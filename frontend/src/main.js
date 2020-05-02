import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
//import axios from 'axios';
import moment from 'moment';

Vue.config.productionTip = false;

// register Global Components. These usually take the form of Base{component-name}.vue and are made available in the components directory
const requireComponent = require.context('./components', false, /Base[A-Z]\w+\.(vue|js)$/);

requireComponent.keys().forEach((fileName) => {
	const componentConfig = requireComponent(fileName);

	const componentName = upperFirst(camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1')));

	Vue.component(componentName, componentConfig.default || componentConfig);
});

Vue.filter('formatDate', function(value) {
	if (value) {
		return moment(String(value)).format('DD/MM/YYYY [às] hh:mm');
	}
});

new Vue({
	router,
	store,
	vuetify,
	created() {
		const userString = localStorage.getItem('user');
		if (userString) {
			const userData = JSON.parse(userString);
			this.$store.commit('SET_USER_DATA', userData);
		}

		// axios.interceptors.response.use(
		// 	(response) => response,
		// 	(error) => {
		// 		console.log(error.response);
		// 		if (error.response.status === 401) {
		// 			this.$router.push('/');
		// 			this.$store.dispatch('logout');
		// 		}
		// 		return Promise.reject(error);
		// 	}
		// );
	},
	render: (h) => h(App),
}).$mount('#app');
