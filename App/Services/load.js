export default {
  getLoadApi: (api) => {
    return api.get('/overallLoad/api/json?pretty=true');
  }
};
