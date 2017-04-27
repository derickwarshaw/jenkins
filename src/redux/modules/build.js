const LOAD = 'jenkins/build/LOAD';
const LOAD_SUCCESS = 'jenkins/build/LOAD_SUCCESS';
const LOAD_FAIL = 'jenkins/build/LOAD_FAIL';

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
      const dataArray = action.data.actions[0].parameters;
      let payload = {};
      for (const item of dataArray) {
        const name = item.name;
        payload[`${name}`] = item.value;
      }
    {
      return {
        ...state,
        attempting: false,
        loaded: true,
        data: payload
      };
    }
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
export function load(job, buildNumber) {
  return {
    type: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    request: {
      url: `/job/${job}/${buildNumber}/api/json?tree=actions[parameters[name,value]]`,
      options: {
        method: 'GET'
      }
    }
  }
}
