import axios from 'axios';

import contentTypes from '@/constants/contentTypes';

const instance = axios.create({
  baseURL: process.env.VUE_APP_AXIOS_BASE_URL,
  headers: {
    'Content-Type': contentTypes.APPLICATION_JSON,
    'X-Requested-With': 'XMLHttpRequest',
  },
});

instance.interceptors.response.use(
  (response) => response.data,
);

export default instance;
