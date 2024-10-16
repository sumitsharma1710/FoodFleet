import axios from "axios"; // Import axios for making HTTP requests
import forge from 'node-forge';


const publicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsBkewVv0CVezUKfAai2g
oNOww4CH7xxFe4h/E0SBypfD168vnZ+jbjNkHZWWmIqhPtwCaFLng/WTt0VvUDax
bz2wpHtEdKew0i/wdr5rSKALgHFF0BwNzUv9gDP3SNLEDcY/GcwqCaURUbsxfP9F
D54zDWeBQRpQWM9pBliyofGp07+vwppvWsoxvbyFw3RhH7muiyUQcN5e9gmNpeWu
YBO68Dg8sHlyqkDz2p289PifgnJwIYoPxqk47vkKENHhQTENNdSIj8+sZ3gxFoKz
8TSz6E5g5YNau8OBR/A4G07YnI9fJFiwpPLbBNu+UpOua+qLV0fidp4cJuUmdby8
gwIDAQAB
-----END PUBLIC KEY-----`;

function encryptPassword(password) {
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  const encrypted = publicKey.encrypt(password, 'RSA-OAEP');
  return forge.util.encode64(encrypted); // Return Base64-encoded encrypted password
}

export default {
  // Register a new user
  registerUser: async (context, payload) => {
    try {
      context.commit("SET_LOADING", true); // Set loading state
      context.commit("SET_ERROR", null); // Clear any previous errors

      // Encrypt the password
      const encryptedPassword = encryptPassword(payload.password);

      // Prepare user data for registration
      const postData = {
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        country_code: payload.country_code,
        phone_number: payload.phone_number,
        password: encryptedPassword,
        dob: payload.dob,
        role_name: payload.role_name,
      };

      // Make POST request to register user
      const response = await axios.post(
        "http://192.1.200.39:8000/user/v1/signup",
        postData
      );

      if (response.data.user) {
        context.commit("SET_USER", response.data.user); // Set user data in the store
      }

      return response.data; // Return response data
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Registration failed";
      context.commit("SET_ERROR", errorMessage); // Commit error message to store
      throw error; // Rethrow the error
    } finally {
      context.commit("SET_LOADING", false); // Reset loading state
    }
  },

  // Log in an existing user
  loginUser: async (context, payload) => {
    try {
      context.commit("SET_LOADING", true); // Set loading state
      context.commit("SET_ERROR", null); // Clear previous errors

      // Encrypt the password
      const encryptedPassword = encryptPassword(payload.password);

      // Make POST request to log in user
      const response = await axios.post(
        "http://192.1.200.39:8000/user/v1/login",
        {
          email: payload.email,
          password: encryptedPassword,
          role_name: payload.role_name,
        },
        {
          withCredentials: true, // Include cookies for session management
        }
      );

      const userData = response.data.data.user; // Extract user data

      context.commit("SET_USER", {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      }); // Commit user data to store

      context.commit("SET_INITIALIZED",true);

      return response.data; // Return response data
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      context.commit("SET_ERROR", errorMessage); // Commit error message to store
      throw error; // Rethrow the error
    } finally {
      context.commit("SET_LOADING", false); // Reset loading state
    }
  },

  // Log out the current user
  logoutUser: async (context) => {
    try {
      context.commit("SET_LOADING", true); // Set loading state

      // Make POST request to log out user
      await axios.post(
        "http://192.1.200.39:8000/user/v1/logout",
        {},
        {
          withCredentials: true, // Include cookies for session management
        }
      );


      context.commit("CLEAR_USER_DATA"); // Clear user data from store

      return { success: true }; // Return success response
    } catch (error) {
      const err = error;
      throw err; // Rethrow the error
    } finally {
      context.commit("CLEAR_USER_DATA");
      context.commit("SET_LOADING", false); // Reset loading state
    }
  },

  // Load user data from local storage
  loadUserFromDB: async ({ commit, state }) => {
    // Only proceed if not already initialized
    if (state.initialized) return;

    commit("SET_LOADING", true);
    commit("SET_ERROR", null);
    commit("SET_INITIALIZED", true); // Set to true immediately

    try {
      const response = await axios.get(
        "http://192.1.200.39:8000/user/v1/user/details",
        {
          withCredentials: true,
        }
      );
      const user = response.data.data.user;
      if (user) {
        commit("SET_USER", user);
      }
    } catch (error) {
      commit("SET_ERROR", "Failed to load user data");
      commit("SET_INITIALIZED", false); // Reset if failed
    } finally {
      commit("SET_LOADING", false);
    }
  },

  // Request password reset link
  forgotPassword: async (context, email) => {
    try {
      context.commit("SET_LOADING", true); // Set loading state
      context.commit("SET_ERROR", null); // Clear previous errors

      // Make POST request to request password reset
      const response = await axios.post(
        "http://192.1.200.39:8000/user/v1/forgotPassword",
        { email }
      );

      return response.data; // Return response data
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Server error occurred"); // Handle server response error
      } else if (error.request) {
        throw new Error("No response received from server"); // Handle no response error
      } else {
        throw error; // Rethrow the error
      }
    } finally {
      context.commit("SET_LOADING", false); // Reset loading state
    }
  },

  // Reset user password
  resetPassword: async (context, { token, password }) => {
    try {
      context.commit("SET_LOADING", true); // Set loading state
      context.commit("SET_ERROR", null); // Clear previous errors

      const encryptedPassword = encryptPassword(password);

      // Make POST request to reset password
      const response = await axios.post(
        `http://192.1.200.39:8000/user/v1/resetPassword/${token}`,
        { encryptedPassword }
      );

      return response.data; // Return response data
    } catch (error) {
      console.log(error);
      if (error.response) {
        throw new Error(error.response.data.message || "Server error occurred"); // Handle server response error
      } else if (error.request) {
        throw new Error("No response received from server"); // Handle no response error
      } else {
        throw error; // Rethrow the error
      }
    } finally {
      context.commit("SET_LOADING", false); // Reset loading state
    }
  },
};
