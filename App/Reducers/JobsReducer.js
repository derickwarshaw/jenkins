import Types from '../Actions/Types';
import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

export const INITIAL_STATE = Immutable({
  data: [],
  errorCode: null,
  attempting: false
});

// login attempts
const attempt = (state, action) =>
  state.merge({ attempting: true });

// successful logins
const success = (state, action) =>
  state.merge({ attempting: false, data: action.result });

// login failure
const failure = (state, action) =>
  state.merge({ attempting: false, errorCode: action.errorCode });

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.GETJOBS_ATTEMPT]: attempt,
  [Types.GETJOBS_SUCCESS]: success,
  [Types.GETJOBS_FAILURE]: failure
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
