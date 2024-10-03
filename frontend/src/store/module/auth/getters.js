export default {
    isAuthenticated: state => !!state.user,
    userFullName: state => {
      if (!state.user) return '';
      return `${state.user.firstName} ${state.user.lastName}`;
    },
    user: state => state.user
  };