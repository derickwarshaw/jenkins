import test from 'ava'
import reducer, { INITIAL_STATE } from '../../App/Reducers/BuildsReducer'
import Actions from '../../App/Actions/Creators'

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.getBuilds('u', 'p'));

  t.true(state.attempting)
  t.false(state.loaded)
});

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.getBuildsSuccess('hi'));

  t.false(state.attempting)
  t.true(state.loaded)
  t.is(state.data, 'hi')
});

test('failure', t => {
  const state = reducer(INITIAL_STATE, Actions.getBuildsFailure(69))

  t.false(state.attempting)
  t.false(state.loaded)
  t.is(state.errorCode, 69)
});
