import Vuex from 'vuex';
import faker from 'faker';

import categoriesApi from '@/api/CategoriesApi';
import Category from '@/models/Category';
import { CategoriesService } from '@/services/CategoriesService';

describe('CategoriesService.js', () => {
  let store;
  let mutations;
  let categoriesService;

  beforeEach(() => {
    mutations = {
      setCategories: jest.fn(),
      addCategory: jest.fn(),
      deleteCategory: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        categories: {
          namespaced: true,
          mutations,
        },
      },
    });

    categoriesService = new CategoriesService(categoriesApi, store);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('if getCategories is called and underlying api call is succeed: store commit "categories/setCategories" should be called with expected arguments, getCategories should resolve with undefined', async () => {
    // eslint-disable-next-line no-shadow
    const categories = Array.from({ length: 5 }).map(() => ({
      id: faker.datatype.number(),
      name: faker.lorem.word(),
    }));
    const models = categories.map((el) => new Category(el));

    jest.spyOn(categoriesApi, 'getCategories').mockResolvedValue(categories);
    const result = await categoriesService.getCategories();

    expect(mutations.setCategories).toHaveBeenCalled();
    expect(mutations.setCategories).toHaveBeenCalledWith({}, models);
    expect(result).toBe(undefined);
  });

  it('if getCategories is called and underlying api call is failed: store commit "categories/setCategories" should not be called, no errors should be thrown by getCategories, getCategories should resolve with undefined', async () => {
    const error = new Error('categoriesApi.getCategories error');
    jest.spyOn(categoriesApi, 'getCategories').mockRejectedValue(error);
    const spy = jest.spyOn(categoriesService, 'getCategories');
    const result = await categoriesService.getCategories();

    expect(mutations.setCategories).not.toHaveBeenCalled();
    expect(spy).not.toThrowError();
    expect(result).toBe(undefined);
  });

  it('if addCategory is called and underlying api call is succeed: store commit "categories/addCategory" should be called with expected arguments, addCategory should resolve to undefined', async () => {
    const categoryFormStub = {};
    const category = {
      id: faker.datatype.number(),
      name: faker.lorem.word(),
    };
    const model = new Category(category);
    jest.spyOn(categoriesApi, 'addCategory').mockResolvedValue(category);

    const result = await categoriesService.addCategory(categoryFormStub);
    expect(mutations.addCategory).toHaveBeenCalled();
    expect(mutations.addCategory).toHaveBeenCalledWith({}, model);
    expect(result).toBe(undefined);
  });

  it('if addCategory is called and underlying api call is failed: store commit "categories/addCategory" should not be called, error should be thrown', async () => {
    expect.assertions(2);
    const categoryFormStub = {};
    const error = new Error('categoriesApi.addCategory error');
    jest.spyOn(categoriesApi, 'addCategory').mockRejectedValue(error);

    try {
      await categoriesService.addCategory(categoryFormStub);
    } catch (e) {
      expect(e).toEqual(error);
    }
    expect(mutations.addCategory).not.toHaveBeenCalled();
  });

  it('if deleteCategory is called and underlying api call is succeed: store commit "categories/deleteCategory" should be called with expected arguments, deleteCategory should resolve with undefined', async () => {
    const categoryId = faker.datatype.number();
    jest.spyOn(categoriesApi, 'deleteCategory').mockImplementation(() => Promise.resolve());
    const result = await categoriesService.deleteCategory(categoryId);

    expect(mutations.deleteCategory).toHaveBeenCalled();
    expect(mutations.deleteCategory).toHaveBeenCalledWith({}, categoryId);
    expect(result).toBe(undefined);
  });

  it('if deleteCategory is called and underlying api call is failed: store commit "categories/deleteCategory" should not be called, error should be thrown', async () => {
    expect.assertions(2);
    const categoryId = faker.datatype.number();
    const error = new Error('categoriesApi.deleteCategory error');
    jest.spyOn(categoriesApi, 'deleteCategory').mockRejectedValue(error);

    try {
      await categoriesService.deleteCategory(categoryId);
    } catch (e) {
      expect(e).toEqual(error);
    }
    expect(mutations.deleteCategory).not.toHaveBeenCalled();
  });
});
