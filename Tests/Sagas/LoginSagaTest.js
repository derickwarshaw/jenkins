import test from 'ava';
import { take, call, put } from 'redux-saga/effects';
import login from '../../App/Sagas/LoginSaga';
import Actions from '../../App/Actions/Creators';
import Types from '../../App/Actions/Types';

const stepper = (fn) => (mock) => fn.next(mock).value;

test('watcher', t => {
  const mockApi = {};
  const loginSaga = login(mockApi);
  const mockState = {username: 'user', password: 'pass', instanceName: 'instance1', host: 'host.com', port: '80', https: false};
  const step = stepper(loginSaga.watcher());

  t.deepEqual(step(), take(Types.LOGIN_ATTEMPT));

  t.deepEqual(step(mockState), call(loginSaga.worker, mockState.username, mockState.password, mockState.instanceName, mockState.host, mockState.port, mockState.https));
});

test('login - success', t => {
  const mockApi = {
    startLogin: function() {}
  };
  const loginSaga = login(mockApi);
  const step = stepper(loginSaga.worker('user', 'pass', 'instance1', 'host.com', '80', false));

  t.deepEqual(step(), call(mockApi.startLogin, 'user', 'pass', 'instance1', 'host.com', '80', false));
  t.deepEqual(step({ok: true}), put(Actions.loginSuccess('user', 'instance1', 'host.com', '80', false)));
  t.deepEqual(step(), put(Actions.getJobs()));
});

test('login - error', t => {
  const mockApi = {
    startLogin: function() {}
  };
  const loginSaga = login(mockApi);
  const step = stepper(loginSaga.worker('user', 'pass', 'instance1', 'host.com', '80', false));

  t.deepEqual(step(), call(mockApi.startLogin, 'user', 'pass', 'instance1', 'host.com', '80', false));
  t.deepEqual(step({statusCode: 500}), put(Actions.loginFailure(500)));
});
