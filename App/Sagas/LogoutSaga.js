import { take, put, call } from 'redux-saga/effects';
import Types from '../Actions/Types';
import Actions from '../Actions/Creators';

// attempts to login
export default (api) => {

  function * worker () {

    const response = yield call(api.startLogout);

    // When logging out there is a 302 redirect to / and response status 403 with new auth header indicating anonymous
    if (response.status === 403 || response.headers['x-you-are-authenticated-as'] === 'anonymous') {
      yield put(Actions.logoutSuccess());
    } else {
      yield put(Actions.logoutFailure(response.statusCode));
    }
  }

  function * watcher () {
    while (true) {
      yield take(Types.LOGOUT_ATTEMPT);
      yield call(worker);
    }
  }

  return {
    watcher,
    worker
  };
};
