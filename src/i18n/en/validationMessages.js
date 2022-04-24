import validationCodes from '@/constants/validationCodes';

export default {
  [validationCodes.UNKNOWN]: 'Error',
  [validationCodes.REQUIRED]: 'Field is required',
  [validationCodes.EMAIL]: 'Invalid email format',
  [validationCodes.MIN_LENGTH]: 'Field should be at least {min} characters length',
  [validationCodes.MAX_LENGTH]: 'Field should be less or equal {max} characters length',
};
