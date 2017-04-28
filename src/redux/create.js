import { applyMiddleware, createStore } from 'redux';

import clientMiddleware from './middleware/client';
// import reducers from './reducers';
import user from './modules/user'

export default () => createStore(
  user,
  applyMiddleware(clientMiddleware)
);
