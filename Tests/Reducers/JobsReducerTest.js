import test from 'ava'
import reducer, { INITIAL_STATE } from '../../App/Reducers/JobsReducer'
import Actions from '../../App/Actions/Creators'

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.getJobs('u', 'p'));

  t.true(state.attempting)
});

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.getJobsSuccess('hi'));

  t.false(state.attempting)
  t.is(state.data, 'hi')
});

test('failure', t => {
  const state = reducer(INITIAL_STATE, Actions.getJobsFailure(69))

  t.false(state.attempting)
  t.is(state.errorCode, 69)
});
