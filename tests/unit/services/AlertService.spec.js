import Vuex from 'vuex';

import alertTypes from '@/constants/alertTypes';
import Alert from '@/models/Alert';
import alertServiceInstance, { AlertService } from '@/services/AlertService';
import { TranslationService } from '@/services/TranslationService';
import successCodes from '@/constants/successCodes';
import errorCodes from '@/constants/errorCodes';
import infoCodes from '@/constants/infoCodes';

jest.mock('@/services/TranslationService');

const createAlert = (alertType) => {
  const title = `Fake alert title with type ${alertType}`;
  const details = `Fake alert details with type ${alertType}`;
  return new Alert(alertType, title, details);
};

describe('AlertService.js', () => {
  let mutations;
  let store;
  let alertService;
  let addAlertSpy;
  let removeAlertSpy;
  let translationService;

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

    translationService = new TranslationService();
    alertService = new AlertService(store, translationService);
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
    const code = successCodes.EDIT_CATEGORY;
    const title = 'Success alert title';
    const details = 'Success alert details';
    const alertType = alertTypes.SUCCESS_ALERT;
    translationService.getSuccessMessage.mockReturnValue(title);
    addAlertSpy = jest.spyOn(alertService, 'addAlert').mockImplementation(() => {});
    alertService.addSuccessAlert(code, details);

    expect(addAlertSpy).toHaveBeenCalled();

    const alert = addAlertSpy.mock.calls[0][0];
    expect(alert).toEqual(expect.objectContaining({
      title,
      alertType,
      details,
    }));

    addAlertSpy.mockRestore();
  });

  it('should call addAlert method with error alert instance', () => {
    const code = errorCodes.EDIT_CATEGORY;
    const title = 'Error alert title';
    const details = 'Error alert details';
    const alertType = alertTypes.ERROR_ALERT;
    translationService.getErrorMessage.mockReturnValue(title);
    addAlertSpy = jest.spyOn(alertService, 'addAlert').mockImplementation(() => {});
    alertService.addErrorAlert(code, details);

    expect(addAlertSpy).toHaveBeenCalled();

    const alert = addAlertSpy.mock.calls[0][0];
    expect(alert).toEqual(expect.objectContaining({
      title,
      alertType,
      details,
    }));

    addAlertSpy.mockRestore();
  });

  it('should call addAlert method with info alert instance', () => {
    const code = infoCodes.UNKNOWN;
    const title = 'Info alert title';
    const details = 'Info alert details';
    const alertType = alertTypes.INFO_ALERT;
    translationService.getInfoMessage.mockReturnValue(title);
    addAlertSpy = jest.spyOn(alertService, 'addAlert').mockImplementation(() => {});
    alertService.addInfoAlert(code, details);

    expect(addAlertSpy).toHaveBeenCalled();

    const alert = addAlertSpy.mock.calls[0][0];
    expect(alert).toEqual(expect.objectContaining({
      title,
      alertType,
      details,
    }));

    addAlertSpy.mockRestore();
  });
});
