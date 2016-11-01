import Types from './Types';

const attemptLogin = (username, password, instanceName, host, port, https) => ({ type: Types.LOGIN_ATTEMPT, username, password, instanceName, host, port, https });
const loginSuccess = (username, instanceName, host, port) => ({ type: Types.LOGIN_SUCCESS, username, instanceName, host, port });
const loginFailure = (errorCode) => ({ type: Types.LOGIN_FAILURE, errorCode });

const getJobs = () => ({ type: Types.GETJOBS_ATTEMPT });
const getJobsSuccess = (result) => ({ type: Types.GETJOBS_SUCCESS, result });
const getJobsFailure = (errorCode) => ({ type: Types.GETJOBS_FAILURE, errorCode });

const getBuilds = (job) => ({ type: Types.GETBUILDS_ATTEMPT, job });
const getBuildsSuccess = (result) => ({ type: Types.GETBUILDS_SUCCESS, result });
const getBuildsFailure = (errorCode) => ({ type: Types.GETBUILDS_FAILURE, errorCode });

const logout = () => ({ type: Types.LOGOUT });

const startup = () => ({ type: Types.STARTUP });

/**
 Makes available all the action creators we've created.
 */
export default {
  attemptLogin,
  getBuilds,
  getBuildsSuccess,
  getBuildsFailure,
  getJobs,
  getJobsSuccess,
  getJobsFailure,
  loginSuccess,
  loginFailure,
  logout,
  startup
};
