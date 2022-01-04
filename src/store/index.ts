import Vue from 'vue';
import Vuex from 'vuex';
import { importAll } from '@/utils';

const modules = import.meta.globEager('./modules/*.ts');

const VStates = importAll(modules);

Vue.use(Vuex);

export interface IRootState {
  [key: string]: any;
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({
  modules: VStates.reduce((n: IRootState, i) => ((n[i.fileName] = i.module), n), {}),
});
