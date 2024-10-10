// import Cookies from "js-cookie"; // Import Cookies library for cookie management

export default {
  SET_USER(state, user) {
    state.user = user; // Update state with user data
  },

  SET_INITIALIZED(state, value) {
    state.initialized = value;
  },

  // Update loading state
  SET_LOADING(state, loading) {
    state.loading = loading; // Set loading status
  },

  // Set error message in state
  SET_ERROR(state, error) {
    state.error = error; // Store error message
  },
  // Clear all user-related data from state and storage
  CLEAR_USER_DATA(state) {
    state.user = null; // Clear user data
    state.accesstoken = null; // Clear access token;
    state.refreshtoken = null; // Clear refresh token
    state.error = null; // Clear error message
    state.initialized = false;
  }
};

