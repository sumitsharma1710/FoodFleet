import Cookies from "js-cookie";

export default {
  SET_USER(state, user) {
    state.user = user;
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  SET_ACCESSTOKEN(state, accesstoken) {
    state.accesstoken = accesstoken;
    if (accesstoken) {
      Cookies.set('accessToken', accesstoken);
    } else {
      Cookies.remove('accessToken');
    }
  },
  SET_REFRESHTOKEN(state, refreshtoken) {
    state.refreshtoken = refreshtoken;
    if (refreshtoken) {
      Cookies.set('refreshToken', refreshtoken);
    } else {
      Cookies.remove('refreshToken');
    }
  },
  CLEAR_USER_DATA(state) {
    state.user = null;
    state.accesstoken = null;
    state.refreshtoken = null;
    state.error = null;
    localStorage.removeItem('user');
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
  }
};