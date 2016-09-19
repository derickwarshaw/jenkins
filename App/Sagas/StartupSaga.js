import { take } from 'redux-saga/effects';
import Types from '../Actions/Types';


// process STARTUP actions
export function * watchStartup () {
  yield take(Types.STARTUP);
}
