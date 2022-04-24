import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import cloneDeep from 'lodash.clonedeep';

import alerts, { getDefaultState } from '@/store/modules/alerts';
import alertTypes from '@/constants/alertTypes';
import Alert from '@/models/Alert';

const createAlert = (alertType) => {
  const title = `Fake alert title with type ${alertType}`;
  const details = `Fake alert details with type ${alertType}`;
  return new Alert(alertType, title, details);
};

describe('alerts.js', () => {
  let localVue;
  let store;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    store = new Vuex.Store({ modules: { alerts: cloneDeep(alerts) } });
  });

  it('addAlert mutation should add alert to store', () => {
    const alert = createAlert(alertTypes.SUCCESS_ALERT);
    store.commit('alerts/addAlert', alert);
    expect(store.state.alerts.alerts).toHaveLength(1);
    expect(store.state.alerts.alerts[0]).toEqual(alert);
  });

  it('addAlert mutation should not add same alert to store', () => {
    const alert = createAlert(alertTypes.SUCCESS_ALERT);
    store.commit('alerts/addAlert', alert);
    store.commit('alerts/addAlert', alert);
    expect(store.state.alerts.alerts).toHaveLength(1);
    expect(store.state.alerts.alerts[0]).toEqual(alert);
  });

  it('removeAlert mutation should remove alert from store', () => {
    const alert = createAlert(alertTypes.INFO_ALERT);
    store.commit('alerts/addAlert', alert);
    store.commit('alerts/removeAlert', alert);
    expect(store.state.alerts.alerts).toEqual([]);
  });

  it('resetState mutation should reset state to initial', () => {
    const defaultState = getDefaultState();
    const alert = createAlert(alertTypes.ERROR_ALERT);
    store.commit('alerts/addAlert', alert);
    store.commit('alerts/resetState');
    expect(store.state.alerts).toEqual(defaultState);
  });
});
