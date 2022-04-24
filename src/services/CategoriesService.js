import categoriesApi from '@/api/CategoriesApi';
import store from '@/store';
import Category from '@/models/Category';

export class CategoriesService {
  // eslint-disable-next-line no-shadow
  constructor(categoriesApi, store) {
    this.categoriesApi = categoriesApi;
    this.store = store;
  }

  async getCategories() {
    try {
      let categories = await this.categoriesApi.getCategories();
      categories = categories.map((el) => new Category(el));
      this.store.commit('categories/setCategories', categories);
    } catch (e) {
    }
  }

  async addCategory(categoryForm) {
    const payload = Category.getPayloadToAddCategory(categoryForm);
    let category = await this.categoriesApi.addCategory(payload);
    category = new Category(category);
    this.store.commit('categories/addCategory', category);
  }

  async editCategory(categoryId, editCategoryForm) {
    const payload = Category.getPayloadToEditCategory(editCategoryForm);
    let category = await this.categoriesApi.editCategory(categoryId, payload);
    category = new Category(category);
    this.store.commit('categories/editCategory', category);
  }

  async deleteCategory(categoryId) {
    await this.categoriesApi.deleteCategory(categoryId);
    this.store.commit('categories/deleteCategory', categoryId);
  }
}

export default new CategoriesService(categoriesApi, store);
