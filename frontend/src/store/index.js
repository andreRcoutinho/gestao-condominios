import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: null,
	},
	mutations: {
		SET_USER_DATA(state, userData) {
			localStorage.setItem('user', JSON.stringify(userData.user));
			axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
			state.user = userData.user;

			//console.log(axios.defaults.headers.common);
			// console.log(userData);
			// console.log(`Bearer ${userData.token}`);
		},
		CLEAR_USER_DATA() {
			localStorage.removeItem('user');
			location.reload();
		},
	},
	actions: {
		login({ commit }, credentials) {
			return axios
				.post('//localhost:3333/api/sign-in', credentials)
				.then(({ data }) => {
					// console.log(data);
					// console.log(data.data.token);
					commit('SET_USER_DATA', data.data);
				})
				.catch((err) => {
					console.log(`STORE-LOGIN -> ${err}`);
				});
		},
		logout({ commit }) {
			commit('CLEAR_USER_DATA');
		},
		// print() {
		// 	return axios.get('//localhost:3333/api/roles').then(({ data, config }) => {
		// 		console.log({ data, headers: config.headers });
		// 	});
		// },
	},
	getters: {
		loggedIn(state) {
			return !!state.user;
		},
	},
	modules: {},
});
