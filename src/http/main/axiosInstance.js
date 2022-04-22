import axios from 'axios';

import contentTypes from '@/constants/contentTypes';

const instance = axios.create({
  headers: {
    'Content-Type': contentTypes.APPLICATION_JSON,
    'X-Requested-With': 'XMLHttpRequest',
  },
});

instance.interceptors.request.use((config) => ({
  ...config,
  url: `${process.env.VUE_APP_AXIOS_BASE_URL}${config.url}`,
}));

instance.interceptors.response.use(
  (response) => response.data,
);

export default instance;
