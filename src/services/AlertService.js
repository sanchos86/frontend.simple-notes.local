import alertTypes from '@/constants/alertTypes';
import store from '@/store';
import Alert from '@/models/Alert';

export class AlertService {
  readAlertTime = 5000;

  // eslint-disable-next-line no-shadow
  constructor(store) {
    this.store = store;
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
   * @param {string} title
   * @param {string} [details]
   */
  addSuccessAlert(title, details) {
    const alert = new Alert(alertTypes.SUCCESS_ALERT, title, details);
    this.addAlert(alert);
  }

  /**
   * @param {string} title
   * @param {string} [details]
   */
  addErrorAlert(title, details) {
    const alert = new Alert(alertTypes.ERROR_ALERT, title, details);
    this.addAlert(alert);
  }

  /**
   * @param {string} title
   * @param {string} [details]
   */
  addNotificationAlert(title, details) {
    const alert = new Alert(alertTypes.NOTIFICATION_ALERT, title, details);
    this.addAlert(alert);
  }
}

export default new AlertService(store);
