import { ActionTree } from 'vuex';

export interface IAuth {
  authority: boolean;
}

const state: IAuth = {
  authority: false,
};

const getters = {};

const mutations = {};

const actions: ActionTree<IAuth, any> = {};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
