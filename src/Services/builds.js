/**
 * Add more function comments!
 */
export default {
  getBuilds: (api, job) => {
    return api.get(`/job/${job}/api/json?tree=builds[number,status,timestamp,id,result]`);
  },
  getBuild: (api, job, buildNumber) => {
    return api.get(`/job/${job}/${buildNumber}/api/json?tree=actions[parameters[name,value]]`);
  }
};
