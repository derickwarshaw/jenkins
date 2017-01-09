import {take, put, call} from 'redux-saga/effects';
import Types from '../Actions/Types';
import Actions from '../Actions/Creators';

export default (api) => {
  function * worker(job, number) {
    // make the call to the api
    const response = yield call(api.getBuild, job, number);
    let ghPluginData = {};

    if (response.ok) {
      const githubPlugin = 'org.jenkinsci.plugins.ghprb.GhprbParametersAction';
      const isGithubPlugin = response.data.actions.length && response.data.actions[0]._class === githubPlugin;

      if (isGithubPlugin) {
        const dataArray = response.data.actions[0].parameters;
        if (dataArray && dataArray.length) {
          for (const item of dataArray) {
            const name = item.name;
            ghPluginData[`${name}`] = item.value;
          }
        }
        response.data.ghPluginData = ghPluginData;
      }
      yield put(Actions.getBuildSuccess(response.data));
    } else {
      yield put(Actions.getBuildFailure(response.statusCode));
    }
  }

  function * watcher() {
    while (true) {
      const { job, buildNumber } = yield take(Types.GETBUILD_ATTEMPT);
      yield call(worker, job, buildNumber);
    }
  }

  return {
    watcher,
    worker
  };
};
