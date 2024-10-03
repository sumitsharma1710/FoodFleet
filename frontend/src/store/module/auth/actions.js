import axios from "axios";
// import Cookies from "js-cookie";

export default {
  registerUser: async (context, payload) => {
    try {
      context.commit('SET_LOADING', true);
      context.commit('SET_ERROR', null);
      
      const postData = {
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        country_code: payload.country_code,
        phone_number: payload.phone_number,
        password: payload.password,
        dob: payload.dob,
        role_name: payload.role_name,
      };
      
      const response = await axios.post('http://localhost:8000/user/v1/signup', postData);
      
      if (response.data.user) {
        context.commit('SET_USER', response.data.user);
      }

      
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      context.commit('SET_ERROR', errorMessage);
      throw error;
    } finally {
      context.commit('SET_LOADING', false);
    }
  },

  loginUser: async (context, payload) => {
    try {
      context.commit('SET_LOADING', true);
      context.commit('SET_ERROR', null);
      
      const response = await axios.post('http://localhost:8000/user/v1/login', {
        email: payload.email,
        password: payload.password,
        role_name: payload.role_name
      }, {
        withCredentials: true
      });
      
      const userData = response.data.data.user;
      
      context.commit('SET_USER', {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email
      });
      
      if (response.data.data.accessToken) {
        context.commit('SET_ACCESSTOKEN', response.data.data.accessToken);
      }
      if (response.data.data.refreshToken) {
        context.commit('SET_REFRESHTOKEN', response.data.data.refreshToken);
      }
      
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      context.commit('SET_ERROR', errorMessage);
      throw error;
    } finally {
      context.commit('SET_LOADING', false);
    }
  },

  logoutUser: async (context) => {
    try {
      context.commit('SET_LOADING', true);
      
      await axios.post('http://localhost:8000/user/v1/logout', {}, {
        withCredentials: true
      });
      
      context.commit('CLEAR_USER_DATA');
      
      return { success: true };
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      context.commit('SET_LOADING', false);
    }
  },

  loadUserFromStorage: ({ commit }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      commit('SET_USER', user);
    }
  },

  forgotPassword: async (context, email) => {
    try {
      context.commit('SET_LOADING', true);
      context.commit('SET_ERROR', null);
      
      const response = await axios.post('http://localhost:8000/user/v1/forgotPassword', { email });

      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Server error occurred');
      } else if (error.request) {
        throw new Error('No response received from server');
      } else {
        throw error;
      }
    } finally {
      context.commit('SET_LOADING', false);
    }
  },
  resetPassword: async (context, { token, password }) => {
    try {
      context.commit('SET_LOADING', true);
      context.commit('SET_ERROR', null);
      
      const response = await axios.post(`http://localhost:8000/user/v1/resetPassword/${token}`, { password });
  
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Server error occurred');
      } else if (error.request) {
        throw new Error('No response received from server');
      } else {
        throw error;
      }
    } finally {
      context.commit('SET_LOADING', false);
    }
  }
};