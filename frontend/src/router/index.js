import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import NotFound from '../components/NotFound.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		redirect: {
			name: 'login',
		},
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/Login.vue'),
	},
	{
		path: '/home',
		name: 'home',
		component: Home,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/movimentos',
		name: 'movimentos',
		component: () => import(/* webpackChunkName: "Movements" */ '../views/Movements.vue'),
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
