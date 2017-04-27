import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import JobsReducer from './JobsReducer';
import BuildsReducer from './BuildsReducer';
import BuildReducer from './BuildReducer';

// glue all the reducers together into 1 root reducer
export default combineReducers({
  login: LoginReducer,
  jobs: JobsReducer,
  builds: BuildsReducer,
  build: BuildReducer
});

// Put reducer keys that you do NOT want stored to persistence here
export const persistentStoreBlacklist = ['login', 'jobs', 'builds', 'build'];
