import deepmerge from 'deepmerge';

export default class HttpClient {
  constructor(axiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  get(url, params = {}, extraConfig = {}) {
    const defaultConfig = { params };
    const config = deepmerge(defaultConfig, extraConfig);
    return this.axiosInstance.get(url, config);
  }

  post(url, payload = {}, extraConfig = {}) {
    const defaultConfig = {};
    const config = deepmerge(defaultConfig, extraConfig);
    return this.axiosInstance.post(url, payload, config);
  }

  put(url, payload = {}, extraConfig = {}) {
    const defaultConfig = {};
    const config = deepmerge(defaultConfig, extraConfig);
    return this.axiosInstance.put(url, payload, config);
  }

  delete(url, params = {}, extraConfig = {}) {
    const defaultConfig = { params };
    const config = deepmerge(defaultConfig, extraConfig);
    return this.axiosInstance.delete(url, config);
  }
}
