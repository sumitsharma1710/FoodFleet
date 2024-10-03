import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
import Cookies from "js-cookie";

export default {
  namespaced: true,
  state() {
    return {
      user: JSON.parse(localStorage.getItem('user')) || null,
      loading: false,
      error: null,
      accesstoken: Cookies.get('accessToken') || null,
      refreshtoken: Cookies.get('refreshToken') || null
    };
  },
  mutations,
  actions,
  getters
};