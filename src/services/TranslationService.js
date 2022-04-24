import i18n from '@/i18n/i18n';

export class TranslationService {
  // eslint-disable-next-line no-shadow
  constructor(i18n) {
    this.i18n = i18n;
  }

  t(key, values) {
    if (this.i18n.te(key)) {
      return this.i18n.t(key, values);
    }
    return `TRANSLATION_MISSING FOR KEY: ${key}`;
  }

  tc(key, choice, values) {
    if (this.i18n.te(key)) {
      return this.i18n.t(key, values);
    }
    return `TRANSLATION_MISSING FOR KEY: ${key}`;
  }

  static getNormalizedCode(prefix, code) {
    return `${prefix}.${code}`;
  }

  getSuccessMessage(code, values) {
    const prefix = 'successMessages';
    const normalizedCode = TranslationService.getNormalizedCode(prefix, code);
    return this.i18n.t(normalizedCode, values);
  }

  getErrorMessage(code, values) {
    const prefix = 'errorMessages';
    const normalizedCode = TranslationService.getNormalizedCode(prefix, code);
    return this.i18n.t(normalizedCode, values);
  }

  getInfoMessage(code, values) {
    const prefix = 'infoMessages';
    const normalizedCode = TranslationService.getNormalizedCode(prefix, code);
    return this.i18n.t(normalizedCode, values);
  }

  getValidationMessage(code, values) {
    const prefix = 'validationMessages';
    const normalizedCode = TranslationService.getNormalizedCode(prefix, code);
    return this.i18n.t(normalizedCode, values);
  }
}

export default new TranslationService(i18n);
