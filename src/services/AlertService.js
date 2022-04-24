import alertTypes from '@/constants/alertTypes';
import store from '@/store';
import Alert from '@/models/Alert';
import translationService from '@/services/TranslationService';

export class AlertService {
  readAlertTime = 5000;

  // eslint-disable-next-line no-shadow
  constructor(store, translationService) {
    this.store = store;
    this.translationService = translationService;
  }

  /**
   * @param {Alert} alert
   */
  addAlert(alert) {
    this.store.commit('alerts/addAlert', alert);
    setTimeout(() => {
      this.removeAlert(alert);
    }, this.readAlertTime);
  }

  removeAlert(alert) {
    this.store.commit('alerts/removeAlert', alert);
  }

  /**
   * @param {string} code
   * @param {string} [details]
   */
  addSuccessAlert(code, details) {
    const title = this.translationService.getSuccessMessage(code);
    const alert = new Alert(alertTypes.SUCCESS_ALERT, title, details);
    this.addAlert(alert);
  }

  /**
   * @param {string} code
   * @param {string} [details]
   */
  addErrorAlert(code, details) {
    const title = this.translationService.getErrorMessage(code);
    const alert = new Alert(alertTypes.ERROR_ALERT, title, details);
    this.addAlert(alert);
  }

  /**
   * @param {string} code
   * @param {string} [details]
   */
  addInfoAlert(code, details) {
    const title = this.translationService.getInfoMessage(code);
    const alert = new Alert(alertTypes.INFO_ALERT, title, details);
    this.addAlert(alert);
  }
}

export default new AlertService(store, translationService);
