import {take, put, call} from 'redux-saga/effects';
import Types from '../Actions/Types';
import Actions from '../Actions/Creators';

export default (api) => {
  function * worker(job) {
    // make the call to the api
    const response = yield call(api.getBuilds, job);

    if (response.ok) {
      yield put(Actions.getBuildsSuccess(response.data.builds, job));
    } else {
      yield put(Actions.getBuildsFailure(response.statusCode));
    }
  }

  function * watcher() {
    while (true) {
      const { job } = yield take(Types.GETBUILDS_ATTEMPT);
      yield call(worker, job);
    }
  }

  return {
    watcher,
    worker
  };
};
