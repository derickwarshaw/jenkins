import { applyMiddleware, createStore } from 'redux';

import clientMiddleware from './middleware/client';
import reducers from './reducers';

export default () => createStore(
  reducers,
  applyMiddleware(clientMiddleware)
);
