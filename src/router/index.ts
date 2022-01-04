import Vue from 'vue';
import VueRouter, { RawLocation, RouteConfig } from 'vue-router';

import { importAll } from '@/utils';
import { ErrorHandler } from 'vue-router/types/router';

const modules = import.meta.globEager('./modules/*.ts');

const VStates = importAll(modules);

const routerPush: any = VueRouter.prototype.push;
(VueRouter as Function).prototype.push = function push(
  location: RawLocation,
  onResolve: Function,
  onReject: ErrorHandler,
) {
  if (onResolve || onReject) return routerPush.call(this, location, onResolve, onReject);
  return routerPush.call(this, location).catch((error: Error) => error);
};

export const constantRoutes: RouteConfig[] = VStates.reduce((n: RouteConfig[], i) => {
  return n.concat(i.module);
}, []);

const createRouter = () => {
  return new VueRouter({
    scrollBehavior: (to, from, savedPosition) => (savedPosition ? savedPosition : { x: 0, y: 0 }),
    base: '',
    routes: constantRoutes,
  });
};

Vue.use(VueRouter);

const router = createRouter();
export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher; // reset router
}

export default router;
