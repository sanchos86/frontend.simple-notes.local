import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import faker from 'faker';
import cloneDeep from 'lodash.clonedeep';

import categories, { getDefaultState } from '@/store/modules/categories';
import Category from '@/models/Category';

const createCategory = () => {
  const id = faker.datatype.number();
  const name = faker.lorem.word();
  return new Category({ id, name });
};

describe('categories.js', () => {
  let localVue;
  let store;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    store = new Vuex.Store({ modules: { categories: cloneDeep(categories) } });
  });

  it('initial module state should be equal to the getDefaultState function returned value', () => {
    const defaultState = getDefaultState();
    expect(store.state.categories).toEqual(defaultState);
  });

  it('addCategories mutation should add categories to the store', () => {
    const categoriesToAdd = Array.from({ length: 5 }).map(() => createCategory());
    store.commit('categories/setCategories', categoriesToAdd);
    expect(store.state.categories.categories).toEqual(categoriesToAdd);
  });

  it('addCategory mutation should add category to the store', () => {
    const category = createCategory();
    store.commit('categories/addCategory', category);
    expect(store.state.categories.categories).toHaveLength(1);
    expect(store.state.categories.categories[0]).toEqual(category);
  });

  it('deleteCategory mutation should remove mutation from the store', () => {
    const category = createCategory();
    store.commit('categories/addCategory', category);
    store.commit('categories/deleteCategory', category.id);
    expect(store.state.categories.categories).toHaveLength(0);
  });

  it('resetState mutation should reset state to initial', () => {
    const defaultState = getDefaultState();
    const categoriesToAdd = Array.from({ length: 3 }).map(() => createCategory());
    store.commit('categories/setCategories', categoriesToAdd);
    store.commit('categories/resetState');
    expect(store.state.categories).toEqual(defaultState);
  });
});
