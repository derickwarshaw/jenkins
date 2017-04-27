const LOAD = 'jenkins/builds/LOAD';
const LOAD_SUCCESS = 'jenkins/builds/LOAD_SUCCESS';
const LOAD_FAIL = 'jenkins/builds/LOAD_FAIL';

const initialState = {
  data: [],
  errorCode: null,
  attempting: false,
  loaded: false
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
        attempting: true,
        loaded: false,
        selectedJob: action.job
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        attempting: false,
        loaded: true,
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        attempting: false,
        loaded: false,
        errorCode: action.errorCode
      };
    default:
      return state;
  }
}

export function init() {
  return {
    type: INIT
  }
}
export function load(job) {
  return {
    type: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    request: {
      url: `/job/${job}/api/json?tree=builds[number,status,timestamp,id,result]`,
      options: {
        method: 'GET'
      }
    }
  }
}
