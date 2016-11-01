import Types from '../Actions/Types';
import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

export const INITIAL_STATE = Immutable({
  username: null,
  loginSuccess: false,
  password: null,
  errorCode: null,
  attempting: false,
  instanceName: null,
  host: null,
  port: null,
  https: null
});

// login attempts
const attempt = (state, action) =>
  state.merge({ attempting: true, username: action.username, password: action.password, instanceName: action.instanceName, host: action.host, port: action.port, https: action.https });

// successful logins
const success = (state, action) =>
  state.merge({ attempting: false, loginSuccess: true, password: null, errorCode: null, username: action.username, instanceName: action.instanceName, host: action.host, port: action.port });

// login failure
const failure = (state, action) =>
  state.merge({ attempting: false, errorCode: action.errorCode, instanceName: null });

// logout
const logout = (state, action) =>
  state.merge({ username: null });

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.LOGIN_ATTEMPT]: attempt,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT]: logout
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
