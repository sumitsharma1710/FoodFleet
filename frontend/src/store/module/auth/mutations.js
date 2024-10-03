import Cookies from "js-cookie"; // Import Cookies library for cookie management

export default {
  // Set user data in state and localStorage
  SET_USER(state, user) {
    state.user = user; // Update state with user data
    if (user) {
      localStorage.setItem('user', JSON.stringify(user)); // Save user in localStorage
    } else {
      localStorage.removeItem('user'); // Remove user from localStorage if null
    }
  },

  // Update loading state
  SET_LOADING(state, loading) {
    state.loading = loading; // Set loading status
  },

  // Set error message in state
  SET_ERROR(state, error) {
    state.error = error; // Store error message
  },

  // Set access token and manage cookies
  SET_ACCESSTOKEN(state, accesstoken) {
    state.accesstoken = accesstoken; // Update access token in state
    if (accesstoken) {
      Cookies.set('accessToken', accesstoken); // Save access token in cookies
    } else {
      Cookies.remove('accessToken'); // Remove access token cookie if null
    }
  },

  // Set refresh token and manage cookies
  SET_REFRESHTOKEN(state, refreshtoken) {
    state.refreshtoken = refreshtoken; // Update refresh token in state
    if (refreshtoken) {
      Cookies.set('refreshToken', refreshtoken); // Save refresh token in cookies
    } else {
      Cookies.remove('refreshToken'); // Remove refresh token cookie if null
    }
  },

  // Clear all user-related data from state and storage
  CLEAR_USER_DATA(state) {
    state.user = null; // Clear user data
    state.accesstoken = null; // Clear access token
    state.refreshtoken = null; // Clear refresh token
    state.error = null; // Clear error message
    localStorage.removeItem('user'); // Remove user from localStorage
    Cookies.remove('accessToken'); // Remove access token cookie
    Cookies.remove('refreshToken'); // Remove refresh token cookie
  }
};
