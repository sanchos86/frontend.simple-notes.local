import Vue from 'vue';
import Vuex from 'vuex';

import mutationTypes from '@/store/mutationTypes';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appConfig: {},
  },
  mutations: {
    [mutationTypes.SET_APP_CONFIG](state, appConfig = {}) {
      state.appConfig = appConfig;
    },
  },
  actions: {
  },
  modules: {
  },
});
