export const getDefaultState = () => ({
  categories: [],
});

const mutations = {
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  setCategories(state, categories) {
    state.categories = categories;
  },
  addCategory(state, category) {
    state.categories.push(category);
  },
  editCategory(state, category) {
    state.categories = state.categories.map((item) => {
      if (category.id === item.id) {
        return category;
      }
      return item;
    });
  },
  deleteCategory(state, categoryId) {
    state.categories = state.categories.filter((el) => el.id !== categoryId);
  },
};

export default {
  state: getDefaultState(),
  namespaced: true,
  mutations,
};
