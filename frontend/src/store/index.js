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
			localStorage.setItem('user', JSON.stringify(userData));
			axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
			state.user = userData;
		},
		CLEAR_USER_DATA() {
			localStorage.removeItem('user');
			location.reload();
		},
	},
	actions: {
		login({ commit }, credentials) {
			return axios.post('//localhost:3333/api/sign-in', credentials).then(({ data }) => {
				// console.log(data);
				commit('SET_USER_DATA', data.data);
			});
		},
		logout({ commit }) {
			commit('CLEAR_USER_DATA');
		},
	},
	getters: {
		loggedIn(state) {
			return !!state.user;
		},
	},
	modules: {},
});
