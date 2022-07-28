import { createStore } from 'vuex'

export default createStore({
  state: {
    toasts: []
  },
  mutations: {
    addToast(state, toast) {
      state.toasts.push(toast);
    },
    clearToast(state, title) {
      // Find toast
      const index = state.toasts.findIndex((toast) => toast.title === title);
      // Remove toast
      state.toasts.splice(index, 1);
    }
  },
  getters: {
  },
  actions: {
  },
  modules: {
  }
})
