import test from 'ava';
import { take, call, put } from 'redux-saga/effects';
import getBuilds from '../../App/Sagas/GetBuildsSaga';
import Types from '../../App/Actions/Types';
import Actions from '../../App/Actions/Creators';

const stepper = (fn) => (mock) => fn.next(mock).value;

test('watcher', t => {
  const mockApi = {};
  const mockJob = {job: "JOB-1"};
  const getBuildsSaga = getBuilds(mockApi);
  const step = stepper(getBuildsSaga.watcher());

  t.deepEqual(step(), take(Types.GETBUILDS_ATTEMPT));
  t.deepEqual(step(mockJob), call(getBuildsSaga.worker, mockJob.job));
});

test('worker - success', t => {
  const mockApi = {
    getBuilds: function() {}
  };
  const mockJob = {job: "JOB-1"};
  const mockResponse = {
    ok: true,
    data: {
      builds: ["build1", "build2"]
    }
  };

  const getBuildsSaga = getBuilds(mockApi);
  const step = stepper(getBuildsSaga.worker(mockJob));

  t.deepEqual(step(), call(mockApi.getBuilds, mockJob));
  t.deepEqual(step(mockResponse), put(Actions.getBuildsSuccess(["build1", "build2"])));
});

test('worker - error', t => {
  const mockApi = {
    getBuilds: function() {}
  };
  const mockJob = {job: "JOB-1"};
  const mockResponse = {
    statusCode: 500
  };

  const getBuildsSaga = getBuilds(mockApi);
  const step = stepper(getBuildsSaga.worker(mockJob));

  t.deepEqual(step(), call(mockApi.getBuilds, mockJob));
  t.deepEqual(step({statusCode: 500}), put(Actions.getBuildsFailure(500)));
});
