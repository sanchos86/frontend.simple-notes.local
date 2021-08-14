import Vuex from 'vuex';
import faker from 'faker';

import alertTypes from '@/constants/alertTypes';
import Alert from '@/models/Alert';
import alertServiceInstance, { AlertService } from '@/services/AlertService';

const createAlert = (alertType) => {
  const title = faker.lorem.sentence();
  const details = faker.lorem.sentence();
  return new Alert(alertType, title, details);
};

describe('AlertService.js', () => {
  let mutations;
  let store;
  let alertService;
  let addAlertSpy;
  let removeAlertSpy;

  beforeEach(() => {
    mutations = {
      addAlert: jest.fn(),
      removeAlert: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        alerts: {
          namespaced: true,
          mutations,
        },
      },
    });

    alertService = new AlertService(store);
  });

  it('should check if alertServiceInstance is an instance of AlertService', () => {
    expect(alertServiceInstance).toBeInstanceOf(AlertService);
  });

  it('addAlert method of AlertService instance should commit "alerts/addAlert" mutation with Alert instance and then call removeAlert method with the same Alert instance', () => {
    const alert = createAlert(alertTypes.SUCCESS_ALERT);
    jest.useFakeTimers();
    removeAlertSpy = jest.spyOn(alertService, 'removeAlert').mockImplementation(() => {});
    alertService.addAlert(alert);

    expect(mutations.addAlert).toHaveBeenCalled();
    expect(mutations.addAlert).toHaveBeenCalledWith({}, alert);

    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), alertService.readAlertTime);

    jest.runAllTimers();
    expect(removeAlertSpy).toHaveBeenCalled();
    expect(removeAlertSpy).toHaveBeenCalledWith(alert);

    jest.useRealTimers();
    removeAlertSpy.mockRestore();
  });

  it('removeAlert method of AlertService instance should commit "alerts/removeAlert" with Alert instance', () => {
    const alert = createAlert(alertTypes.ERROR_ALERT);
    removeAlertSpy = jest.spyOn(alertService, 'removeAlert');
    alertService.removeAlert(alert);

    expect(mutations.removeAlert).toHaveBeenCalled();
    expect(mutations.removeAlert).toHaveBeenCalledWith({}, alert);

    removeAlertSpy.mockRestore();
  });

  it('should call addAlert method with success alert instance', () => {
    const title = faker.lorem.sentence();
    const details = faker.lorem.sentence();
    addAlertSpy = jest.spyOn(alertService, 'addAlert').mockImplementation(() => {});
    alertService.addSuccessAlert(title, details);

    expect(addAlertSpy).toHaveBeenCalled();

    const alert = addAlertSpy.mock.calls[0][0];
    expect(alert).toBeInstanceOf(Alert);
    expect(alert.alertType).toBe(alertTypes.SUCCESS_ALERT);

    addAlertSpy.mockRestore();
  });

  it('should call addAlert method with error alert instance', () => {
    const title = faker.lorem.sentence();
    const details = faker.lorem.sentence();
    addAlertSpy = jest.spyOn(alertService, 'addAlert').mockImplementation(() => {});
    alertService.addErrorAlert(title, details);

    expect(addAlertSpy).toHaveBeenCalled();

    const alert = addAlertSpy.mock.calls[0][0];
    expect(alert).toBeInstanceOf(Alert);
    expect(alert.alertType).toBe(alertTypes.ERROR_ALERT);

    addAlertSpy.mockRestore();
  });

  it('should call addAlert method with notification alert instance', () => {
    const title = faker.lorem.sentence();
    const details = faker.lorem.sentence();
    addAlertSpy = jest.spyOn(alertService, 'addAlert').mockImplementation(() => {});
    alertService.addNotificationAlert(title, details);

    expect(addAlertSpy).toHaveBeenCalled();

    const alert = addAlertSpy.mock.calls[0][0];
    expect(alert).toBeInstanceOf(Alert);
    expect(alert.alertType).toBe(alertTypes.NOTIFICATION_ALERT);

    addAlertSpy.mockRestore();
  });
});
