export default {
  getViews: (api) => {
    return api.get('/api/json?tree=views[name,url]');
  }
};
