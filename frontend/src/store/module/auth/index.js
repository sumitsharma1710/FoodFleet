import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      user: null,
      loading: false,
      error: null,
      initialized: false 
    };
  },
  mutations,
  actions,
  getters
};