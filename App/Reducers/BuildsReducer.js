import Types from '../Actions/Types';
import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

export const INITIAL_STATE = Immutable({
  data: [],
  errorCode: null,
  attempting: false,
  loaded: false
});

// init builds
const initBuilds = (state, action) =>
state.merge(INITIAL_STATE);

// attempt
const attempt = (state, action) =>
  state.merge({ attempting: true, loaded: false });

// successful
const success = (state, action) =>
  state.merge({ attempting: false, loaded: true, data: action.result });

// failure
const failure = (state, action) =>
  state.merge({ attempting: false, loaded: false, errorCode: action.errorCode });

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.GETBUILDS_INIT]: initBuilds,
  [Types.GETBUILDS_ATTEMPT]: attempt,
  [Types.GETBUILDS_SUCCESS]: success,
  [Types.GETBUILDS_FAILURE]: failure
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
