import validationCodes from '@/constants/validationCodes';
import translationService from '@/services/TranslationService';

export default {
  methods: {
    $getValidationMessage(validation) {
      if (validation.$error) {
        let validationMessage = translationService.getValidationMessage(validationCodes.UNKNOWN);
        if (validation?.required !== undefined && !validation.required) {
          validationMessage = translationService.getValidationMessage(validationCodes.REQUIRED);
        } else if (validation.email !== undefined && !validation.email) {
          validationMessage = translationService.getValidationMessage(validationCodes.EMAIL);
        } else if (validation.minLength !== undefined && !validation.minLength) {
          validationMessage = translationService.getValidationMessage(
            validationCodes.MIN_LENGTH,
            { min: validation.$params.minLength.min },
          );
        } else if (validation.maxLength !== undefined && !validation.maxLength) {
          validationMessage = translationService.getValidationMessage(
            validationCodes.MAX_LENGTH,
            { max: validation.$params.maxLength.max },
          );
        }
        return validationMessage;
      }
      return '';
    },
  },
};
