import { RouteConfig } from 'vue-router';

const viewConf: RouteConfig[] = [
  {
    path: '/',
    name: '/home',
    meta: { auth: false },
    component: () => import('@/views/dashboard/index.vue'),
  },
  {
    path: '*',
    redirect: '404',
  },
];

export default viewConf;
