import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import faker from 'faker';

import Alert from '@/models/Alert';
import AlertManager from '@/components/shared/AlertManager.vue';
import AlertItem from '@/components/shared/AlertItem.vue';
import alertTypes from '@/constants/alertTypes';

const localVue = createLocalVue();
localVue.use(Vuex);

const createAlert = (alertType) => {
  const title = faker.lorem.sentence();
  const details = faker.lorem.sentence();
  return new Alert(alertType, title, details);
};

const createStore = (alerts = []) => new Vuex.Store({
  modules: {
    alerts: {
      namespaced: true,
      state: {
        alerts,
      },
    },
  },
});

describe('AlertManager.vue', () => {
  it('check if it is empty if there are no alerts in the store', () => {
    const store = createStore();
    const wrapper = shallowMount(AlertManager, {
      store,
      localVue,
    });
    expect(wrapper.findAllComponents(AlertItem)).toHaveLength(0);
  });

  it('check if it correctly render all alerts from the state', () => {
    const alerts = [
      createAlert(alertTypes.SUCCESS_ALERT),
      createAlert(alertTypes.ERROR_ALERT),
      createAlert(alertTypes.NOTIFICATION_ALERT),
    ];
    const store = createStore(alerts);
    const wrapper = shallowMount(AlertManager, {
      store,
      localVue,
    });
    expect(wrapper.findAllComponents(AlertItem)).toHaveLength(alerts.length);
  });
});
