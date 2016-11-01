export default {
  // Log out
  attemptLogout: (api) => {
    return api.get('/logout');
  }
};
