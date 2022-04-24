import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import { VAlert } from 'vuetify/lib/components';

import alertTypes from '@/constants/alertTypes';
import Alert from '@/models/Alert';
import test from '@/directives/test';
import AlertItem from '@/components/shared/AlertItem.vue';

describe('AlertItem.vue', () => {
  let wrapper;
  let localVue;
  let vuetify;

  const createWrapper = (alert) => shallowMount(AlertItem, {
    localVue,
    vuetify,
    propsData: {
      alert,
    },
    directives: {
      test,
    },
  });

  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
  });

  it('should check if alert title is properly rendered in a correct place', () => {
    const title = 'Fake alert title';
    const alert = new Alert(alertTypes.SUCCESS_ALERT, title);
    wrapper = createWrapper(alert);
    const element = wrapper.find('[data-test-id="alert-item__title"]');
    expect(element.text()).toBe(title);
  });

  it('should check if alert details are properly rendered in a correct place if exists', () => {
    const title = 'Random alert title';
    const details = 'Fake alert details';
    const alert = new Alert(alertTypes.SUCCESS_ALERT, title, details);
    wrapper = createWrapper(alert);
    const element = wrapper.find('[data-test-id="alert-item__details"]');
    expect(element.exists()).toBe(true);
    expect(element.text()).toBe(details);
  });

  it('should check if alert details markup not rendered if alert details are missing', () => {
    const title = 'Fake alert title';
    const alert = new Alert(alertTypes.SUCCESS_ALERT, title);
    wrapper = createWrapper(alert);
    const element = wrapper.find('[data-test-id="alert-item__details"]');
    expect(element.exists()).not.toBe(true);
  });

  it('should check if remove-alert event with alert, passed by props, is emitted when input event is fired on VAlert', () => {
    const title = 'Another fake alert title';
    const alert = new Alert(alertTypes.SUCCESS_ALERT, title);
    wrapper = createWrapper(alert);
    wrapper.findComponent(VAlert).vm.$emit('input');
    const removeAlertEvent = wrapper.emitted('remove-alert');
    expect(removeAlertEvent).toBeTruthy();
    expect(removeAlertEvent.length).toBe(1);
    expect(removeAlertEvent[0][0]).toEqual(alert);
  });
});
