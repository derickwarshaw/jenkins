import { combineReducers } from 'redux';

import * as reducers from './modules';

const appReducer = combineReducers(reducers);
const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
