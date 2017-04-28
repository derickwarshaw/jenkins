const INIT = 'jenkins/jobs/INIT';
const LOAD = 'jenkins/jobs/LOAD';
const LOAD_SUCCESS = 'jenkins/jobs/LOAD_SUCCESS';
const LOAD_FAIL = 'jenkins/jobs/LOAD_FAIL';

const START = 'jenkins/jobs/START';
const START_SUCCESS = 'jenkins/jobs/START_SUCCESS';
const START_FAIL = 'jenkins/jobs/START_FAIL';

const initialState = {
  data: [],
  errorCode: null,
  attempting: false,
  selectedJob: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState
      };
    case LOAD:
      return {
        ...state,
        attempting: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        attempting: false,
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        attempting: false,
        errorCode: action.errorCode
      };
    default:
      return state;
  }
}

export function init() {
  return {
    type: INIT
  };
}
export function load() {
  return {
    type: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    request: {
      url: '/api/json?tree=jobs[name,color]',
      options: {
        method: 'GET'
      }
    }
  };
}

export function start(job) {
  return {
    type: [START, START_SUCCESS, START_FAIL],
    request: {
      url: `/job/${job}/build`,
      options: {
        method: 'POST'
      }
    }
  };
}
