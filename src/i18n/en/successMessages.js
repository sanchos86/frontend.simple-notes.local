import successCodes from '@/constants/successCodes';

export default {
  [successCodes.UNKNOWN]: 'Success',
  [successCodes.DELETE_CATEGORY]: 'Category successfully deleted',
  [successCodes.EDIT_CATEGORY]: 'Category successfully updated',
  [successCodes.ADD_CATEGORY]: 'Added new category',
};
