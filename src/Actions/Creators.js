import Types from './Types';

const attemptLogin = (username, password, instanceName, host, port, https) => ({ type: Types.LOGIN_ATTEMPT, username, password, instanceName, host, port, https });
const loginSuccess = (username, instanceName, host, port) => ({ type: Types.LOGIN_SUCCESS, username, instanceName, host, port });
const loginFailure = (errorCode) => ({ type: Types.LOGIN_FAILURE, errorCode });

const initJobs = () => ({ type: Types.GETJOBS_INIT });
const getJobs = (job) => ({ type: Types.GETJOBS_ATTEMPT, job });
const getJobsSuccess = (result) => ({ type: Types.GETJOBS_SUCCESS, result });
const getJobsFailure = (errorCode) => ({ type: Types.GETJOBS_FAILURE, errorCode });

const initBuilds = () => ({ type: Types.GETBUILDS_INIT });
const getBuilds = (job) => ({ type: Types.GETBUILDS_ATTEMPT, job });
const getBuildsSuccess = (result) => ({ type: Types.GETBUILDS_SUCCESS, result });
const getBuildsFailure = (errorCode) => ({ type: Types.GETBUILDS_FAILURE, errorCode });

const initBuild = () => ({ type: Types.GETBUILD_INIT });
const getBuild = (job, buildNumber) => ({ type: Types.GETBUILD_ATTEMPT, job, buildNumber });
const getBuildSuccess = (result) => ({ type: Types.GETBUILD_SUCCESS, result });
const getBuildFailure = (errorCode) => ({ type: Types.GETBUILD_FAILURE, errorCode });

const logoutAttempt = () => ({ type: Types.LOGOUT_ATTEMPT });
const logoutSuccess = () => ({ type: Types.LOGOUT_SUCCESS });
const logoutFailure = (errorCode) => ({ type: Types.LOGOUT_FAILURE, errorCode });

const startup = () => ({ type: Types.STARTUP });

/**
 Makes available all the action creators we've created.
 */
export default {
  attemptLogin,
  getBuild,
  getBuildSuccess,
  getBuildFailure,
  getBuilds,
  getBuildsSuccess,
  getBuildsFailure,
  getJobs,
  getJobsSuccess,
  getJobsFailure,
  initBuild,
  initBuilds,
  initJobs,
  loginSuccess,
  loginFailure,
  logoutAttempt,
  logoutSuccess,
  logoutFailure,
  startup
};
