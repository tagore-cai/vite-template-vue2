import { RouteConfig } from 'vue-router';

const routers: RouteConfig[] = [
  {
    path: '/404',
    name: '404',
    meta: { cnName: '404' },
    component: () => import('@/views/error/404.vue'),
  },
];

export default routers;
