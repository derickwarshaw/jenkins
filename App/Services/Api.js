// a library to wrap and simplify api calls
import apisauce from 'apisauce';
import { info, builds, jobs, views, que, load, login } from '../Services/';

// our "constructor"
const create = (baseURL = 'http://') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.64 Safari/537.31',
      'Accept-Language': 'en-US,en;q=0.8'
    },
    // 10 second timeout...
    timeout: 10000
  });

  // Wrap api's addMonitor to allow the calling code to attach
  // additional monitors in the future.
  const addMonitor = api.addMonitor((response) => {
    // Monitors are called passively after every request.
  });

  const updateDefaultBaseURL = (data) => {
    const protocol = data.https ? 'https' : 'http';
    api.axiosInstance.defaults.baseURL = `${protocol}://${data.host}:${data.port}`;
  };

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  const getJenkinsJobs = () => jobs.getJobs(api);
  const getJenkinsViews = () => views.getViews(api);
  const getQueAPI = () => que.getQueApi(api);
  const getLoadAPI = () => load.getLoadApi(api);
  const getBuilds = (job) => builds.getBuilds(api, job);
  const getJenkinsInfo = () => info.getInfo(api);
  const startJob = (job) =>  jobs.getJob(api, job);
  const startLogin = (username, password, instanceName, host, port, https) => {
    updateDefaultBaseURL({host, port, https});
    return login.attemptLogin(api, username, password, https);
  };



  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getJenkinsInfo,
    getJenkinsJobs,
    getJenkinsViews,
    getQueAPI,
    getLoadAPI,
    getBuilds,
    startLogin,
    startJob,
    // additional utilities
    addMonitor
  };
};

// let's return back our create method as the default.
export default {
  create
};
