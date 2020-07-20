import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import NotFound from '../components/NotFound.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/auth/Login.vue'),
	},
	{
		path: '/forgot-password',
		name: 'forgotPassword',
		component: () => import('@/views/auth/RecoverPwd.vue'),
	},
	{
		path: '/reset-password',
		name: 'resetPassword',
		component: () => import('@/views/auth/ResetPwd.vue'),
	},
	{
		path: '/home',
		alias: '/',
		name: 'home',
		component: Home,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/movimentos',
		name: 'movements',
		component: () => import(/* webpackChunkName: "Movements" */ '../views/Movements.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/contactos',
		name: 'contacts',
		component: () => import(/* webpackChunkName: "Contacts" */ '../views/Contacts.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/mapas',
		name: 'paymentMaps',
		component: () => import(/* webpackChunkName: "PaymentMaps" */ '../views/PaymentMaps.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/definicoes-utilizador',
		name: 'userSettings',
		component: () => import(/* webpackChunkName: "UserSettings" */ '../views/UserSettings.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/utilizadores',
		name: 'utilizadores',
		component: () =>
			import(/* webpackChunkName: "UserManagement" */ '../views/UserManagement.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/gestao-condominio',
		name: 'buildingManagement',
		component: () =>
			import(/* webpackChunkName: "BuildingManagement" */ '../views/BuildingManagement.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/404',
		component: NotFound,
	},
	{
		path: '*',
		redirect: '/404',
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	const loggedIn = localStorage.getItem('user');
	if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
		next('/login');
	}
	next();
});

export default router;
