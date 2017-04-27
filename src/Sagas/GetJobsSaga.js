import {take, put, call} from 'redux-saga/effects';
import Types from '../Actions/Types';
import Actions from '../Actions/Creators';

export default (api) => {
  function * worker() {
    const response = yield call(api.getJenkinsJobs);

    if (response.ok) {
      yield put(Actions.getJobsSuccess(response.data.jobs));
    } else {
      yield put(Actions.getJobsFailure(response.statusCode));
    }
  }

  function * watcher() {
    while (true) {
      yield take(Types.GETJOBS_ATTEMPT);
      yield call(worker);
    }
  }

  return {
    watcher,
    worker
  };
};
