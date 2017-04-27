import Types from '../Actions/Types';
import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

export const INITIAL_STATE = Immutable({
  data: [],
  errorCode: null,
  attempting: false,
  loaded: false
});

// init build
const initBuild = (state, action) =>
  state.merge(INITIAL_STATE);

// attempt
const attempt = (state, action) =>
  state.merge({ attempting: true, loaded: false, selectedJob: action.job });

// successful
const success = (state, action) =>
  state.merge({ attempting: false, loaded: true, data: action.result });

// failure
const failure = (state, action) =>
  state.merge({ attempting: false, loaded: false, errorCode: action.errorCode });

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.GETBUILD_INIT]: initBuild,
  [Types.GETBUILD_ATTEMPT]: attempt,
  [Types.GETBUILD_SUCCESS]: success,
  [Types.GETBUILD_FAILURE]: failure
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
