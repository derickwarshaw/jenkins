export default {
  getBuilds: (api, job) => {
    return api.get(`/job/${job}/api/json?tree=builds[number,status,timestamp,id,result]`);
  }
}
