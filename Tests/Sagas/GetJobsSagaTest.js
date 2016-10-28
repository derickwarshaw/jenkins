import test from 'ava';
import { take, call, put } from 'redux-saga/effects';
import getJobs from '../../App/Sagas/GetJobsSaga';
import Types from '../../App/Actions/Types';
import Actions from '../../App/Actions/Creators';

const stepper = (fn) => (mock) => fn.next(mock).value;

test('watcher', t => {
  const mockApi = {};
  const getJobsSaga = getJobs(mockApi);
  const step = stepper(getJobsSaga.watcher());

  t.deepEqual(step(), take(Types.GETJOBS_ATTEMPT));
  t.deepEqual(step(), call(getJobsSaga.worker));
});

test('worker - success', t => {
  const mockApi = {
    getJenkinsJobs: function() {}
  };
  const mockResponse = {
      ok: true,
      data: {
          jobs: ['job1', 'job2']
      }
  };
  const getJobsSaga = getJobs(mockApi);
  const step = stepper(getJobsSaga.worker());

  t.deepEqual(step(), call(mockApi.getJenkinsJobs));
  t.deepEqual(step(mockResponse), put(Actions.getJobsSuccess(['job1', 'job2'])));
});

test('worker - error', t => {
    const mockApi = {
      getJenkinsJobs: function() {}
    };
    const mockResponse = {
        statusCode: 500
    };
    const getJobsSaga = getJobs(mockApi);
    const step = stepper(getJobsSaga.worker());

    t.deepEqual(step(), call(mockApi.getJenkinsJobs));
    t.deepEqual(step({statusCode: 500}), put(Actions.getJobsFailure(500)));
});
