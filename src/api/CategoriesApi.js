import mainHttpClient from '@/http/main/MainHttpClient';

export class CategoriesApi {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  getCategories() {
    const url = '/api/categories';
    return this.httpClient.get(url);
  }

  addCategory(payload) {
    const url = '/api/categories';
    return this.httpClient.post(url, payload);
  }

  deleteCategory(categoryId) {
    const url = `/api/categories/${categoryId}`;
    return this.httpClient.delete(url);
  }
}

export default new CategoriesApi(mainHttpClient);
