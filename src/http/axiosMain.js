import axios from 'axios';

import store from '@/store';
import contentTypes from '@/constants/contentTypes';

const instance = axios.create({
  baseURL: store.state.appConfig.axiosMainBaseUrl,
  headers: {
    'Content-Type': contentTypes.APPLICATION_JSON,
    'X-Requested-With': 'XMLHttpRequest',
  },
});

instance.interceptors.response.use(
  (response) => response.data,
);

export default instance;
