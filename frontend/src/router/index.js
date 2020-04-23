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
	},
	{
		path: '/movimentos',
		name: 'movimentos',
		component: () => import(/* webpackChunkName: "Movements" */ '../views/Movements.vue'),
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

export default router;
