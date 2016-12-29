import Types from './Types';

const attemptLogin = (username, password, instanceName, host, port, https) => ({ type: Types.LOGIN_ATTEMPT, username, password, instanceName, host, port, https });
const loginSuccess = (username, instanceName, host, port) => ({ type: Types.LOGIN_SUCCESS, username, instanceName, host, port });
const loginFailure = (errorCode) => ({ type: Types.LOGIN_FAILURE, errorCode });

const initJobs = () => ({ type: Types.GETJOBS_INIT });
const getJobs = () => ({ type: Types.GETJOBS_ATTEMPT });
const getJobsSuccess = (result) => ({ type: Types.GETJOBS_SUCCESS, result });
const getJobsFailure = (errorCode) => ({ type: Types.GETJOBS_FAILURE, errorCode });

const initBuilds = () => ({ type: Types.GETBUILDS_INIT });
const getBuilds = (job) => ({ type: Types.GETBUILDS_ATTEMPT, job });
const getBuildsSuccess = (result) => ({ type: Types.GETBUILDS_SUCCESS, result });
const getBuildsFailure = (errorCode) => ({ type: Types.GETBUILDS_FAILURE, errorCode });

const logoutAttempt = () => ({ type: Types.LOGOUT_ATTEMPT });
const logoutSuccess = () => ({ type: Types.LOGOUT_SUCCESS });
const logoutFailure = (errorCode) => ({ type: Types.LOGOUT_FAILURE, errorCode });

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
  initBuilds,
  initJobs,
  loginSuccess,
  loginFailure,
  logoutAttempt,
  logoutSuccess,
  logoutFailure,
  startup
};
