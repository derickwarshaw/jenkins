import Types from '../Actions/Types';
import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

export const INITIAL_STATE = Immutable({
  data: [],
  errorCode: null,
  attempting: false,
  selectedJob: null
});

// init jobs
const init = (state, action) =>
state.merge(INITIAL_STATE);

const attempt = (state, action) =>
  state.merge({ attempting: true });

const success = (state, action) =>
  state.merge({ attempting: false, data: action.result });

const failure = (state, action) =>
  state.merge({ attempting: false, errorCode: action.errorCode });

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.GETJOBS_INIT]: init,
  [Types.GETJOBS_ATTEMPT]: attempt,
  [Types.GETJOBS_SUCCESS]: success,
  [Types.GETJOBS_FAILURE]: failure
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
