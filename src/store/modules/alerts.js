export const getDefaultState = () => ({
  alerts: [],
});

const mutations = {
  resetState: (state) => {
    Object.assign(state, getDefaultState());
  },
  addAlert: (state, alert) => {
    state.alerts = state.alerts.filter(
      (el) => JSON.stringify(el.data) !== JSON.stringify(alert.data),
    );
    state.alerts.push(alert);
  },
  removeAlert: (state, alert) => {
    state.alerts = state.alerts.filter((el) => el.created !== alert.created);
  },
};

export default {
  namespaced: true,
  state: getDefaultState(),
  mutations,
};
