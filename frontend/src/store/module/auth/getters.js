export default {
  // Check if a user is authenticated
  isAuthenticated: state => !!state.user, // Return true if user exists

  // Get the full name of the user
  userFullName: state => {
    if (!state.user) return ''; // Return empty string if no user
    return `${state.user.firstName} ${state.user.lastName}`; // Return full name
  },
  
  // Return the user object from state
  user: state => state.user // Access user data
};
