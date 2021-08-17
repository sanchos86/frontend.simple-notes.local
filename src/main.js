import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import '@/directives/directives';

Vue.config.productionTip = false;

let appConfig;
const appConfigEl = document.querySelector('#app-config');
if (appConfigEl) {
  try {
    appConfig = JSON.parse(appConfigEl.innerHTML);
  } catch (e) {
  }
  appConfigEl.parentNode.removeChild(appConfigEl);
}

store.commit('setAppConfig', appConfig);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
