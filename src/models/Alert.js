export default class Alert {
  /**
   * @param {string} alertType
   * @param {string} title
   * @param {string} [details]
   */
  constructor(alertType, title, details) {
    this.alertType = alertType;
    this.title = title;
    this.details = details;
    this.created = Date.now();
  }
}
