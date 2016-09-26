export default {
  getQueApi: (api) => {
    return api.get('/queue/api/json?pretty=true');
  }
};
