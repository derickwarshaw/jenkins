import { take, put, call } from 'redux-saga/effects';
import Types from '../Actions/Types';
import Actions from '../Actions/Creators';

// attempts to login
export default (api) => {

  function * worker (username, password, instanceName, host, port) {

    const response = yield call(api.login, username, password, instanceName, host, port);

    if (response.ok) {
      yield put(Actions.loginSuccess(username, instanceName, host, port ));

      yield put(Actions.getJobs());
    } else {
      yield put(Actions.loginFailure(response.statusCode));
    }
  }

  function * watcher () {
    while (true) {
      const { username, password, instanceName, host, port } = yield take(Types.LOGIN_ATTEMPT);
      yield call(worker,username, password, instanceName, host, port);
    }
  }

  return {
    watcher,
    worker
  };
};
