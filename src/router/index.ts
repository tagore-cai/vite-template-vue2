import Vue from 'vue';
import VueRouter, { RawLocation, RouteConfig } from 'vue-router';

import { importAll } from '@/utils';

const modules = import.meta.globEager('./modules/*.ts');

console.log(111111);

const VStates = importAll(modules);
console.log(
  VStates.reduce((n: RouteConfig[], i) => {
    return n.concat(i.module);
  }, []),
);

const routerPush: any = VueRouter.prototype.push;
(VueRouter as any).prototype.push = function push(
  location: RawLocation,
  onResolve: any,
  onReject: any,
) {
  if (onResolve || onReject) return routerPush.call(this, location, onResolve, onReject);
  return routerPush.call(this, location).catch((error: Error) => error);
};

export const constantRoutes: RouteConfig[] = VStates.reduce((n: RouteConfig[], i) => {
  return n.concat(i.module);
}, []);

const createRouter = () =>
  new VueRouter({
    scrollBehavior: (to, from, savedPosition) => {
      return savedPosition ? savedPosition : { x: 0, y: 0 };
    },
    base: '',
    routes: constantRoutes,
  });

Vue.use(VueRouter);

const router = createRouter();
export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher; // reset router
}

export default router;
