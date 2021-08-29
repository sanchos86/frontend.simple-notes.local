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
  deleteCategory(state, categoryId) {
    state.categories = state.categories.filter((el) => el.id !== categoryId);
  },
};

export default {
  state: getDefaultState(),
  namespaced: true,
  mutations,
};
