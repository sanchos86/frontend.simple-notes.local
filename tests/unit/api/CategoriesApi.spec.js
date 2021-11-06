import { CategoriesApi } from '@/api/CategoriesApi';
import mainHttpClient from '@/http/main/MainHttpClient';

describe('CategoriesApi.js', () => {
  let categoriesApi;

  beforeEach(() => {
    categoriesApi = new CategoriesApi(mainHttpClient);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('if getCategories method is called, then httpClient get method should be called with expected url', async () => {
    const url = '/api/categories';
    const spy = jest.spyOn(mainHttpClient, 'get').mockImplementation(() => Promise.resolve());
    await categoriesApi.getCategories();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(url);
  });

  it('if addCategory method is called, then httpClient post method should be called with expected url and payload', async () => {
    const url = '/api/categories';
    const payload = { name: 'Hello, world!' };
    const spy = jest.spyOn(mainHttpClient, 'post').mockImplementation(() => Promise.resolve());
    await categoriesApi.addCategory(payload);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(url, payload);
  });

  it('if deleteCategory method is called, then httpClient delete method should be called with expected url', async () => {
    const categoryId = 1;
    const url = `/api/categories/${categoryId}`;
    const spy = jest.spyOn(mainHttpClient, 'delete').mockImplementation(() => Promise.resolve());
    await categoriesApi.deleteCategory(categoryId);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(url);
  });
});
