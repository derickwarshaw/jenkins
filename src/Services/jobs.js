export default {
  getJobs: (api) => {
    return api.get('/api/json?tree=jobs[name,color]');
  },
  startJob: (api, job) => {
    return api.post(`/job/${job}/build`);
  }
};
