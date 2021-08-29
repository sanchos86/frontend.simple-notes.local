import Vue from 'vue';
import Vuex from 'vuex';

import alerts from '@/store/modules/alerts';
import categories from '@/store/modules/categories';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appConfig: {},
  },
  mutations: {
    setAppConfig: (state, appConfig = {}) => {
      state.appConfig = appConfig;
    },
  },
  actions: {
  },
  modules: {
    alerts,
    categories,
  },
});
