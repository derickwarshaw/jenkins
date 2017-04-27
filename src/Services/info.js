export default {
  getInfo: (api) => {
    return api.get('/api/json?pretty=true');
  }
};
