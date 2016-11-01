import test from 'ava'
import reducer, { INITIAL_STATE } from '../../App/Reducers/LoginReducer'
import Actions from '../../App/Actions/Creators'

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.attemptLogin('u', 'p'));

  t.true(state.attempting)
});

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.loginSuccess('hi'));

  t.is(state.username, 'hi')
});

test('failure', t => {
  const state = reducer(INITIAL_STATE, Actions.loginFailure(69));

  t.false(state.attempting);
  t.is(state.errorCode, 69)
});

test('logout attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.logoutAttempt());

  t.true(state.attempting)
});

test('logout success', t => {
  const state = reducer(INITIAL_STATE, Actions.logoutSuccess());

  t.is(state.INITIAL_STATE);
});

test('logout failure', t => {
  const state = reducer(INITIAL_STATE, Actions.logoutFailure(69));

  t.false(state.attempting);
  t.is(state.errorCode, 69)
});
