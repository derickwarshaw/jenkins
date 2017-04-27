import formatUrl from '../../utils/formatUrl';

export default ({ dispatch, getState }) => next => (action) => {
  if (typeof action === 'function') {
    // thunk
    return action(dispatch, getState);
  }

  const { request, type, ...rest } = action;
  if (!request) {
    return next(action);
  }

  const [REQUEST, SUCCESS, FAILURE] = type;
  const url = formatUrl(request.url);
  const { user } = getState();
  const bearerAuth = `Bearer ${user.opco.id}|${user.id}|${user.username}`;
  let { options } = request;
  let status;

  next({ ...rest, type: REQUEST });

  options = {
    cache: 'no-cache',
    headers: new Headers({
      Authorization: bearerAuth,
      'Content-Type': 'application/json'
    }),
    mode: 'cors',
    ...options
  };

  return fetch(url, options).then((response) => {
    status = response.status.toString();
    return response.text().then(text => text ? JSON.parse(text) : {});
  }).then((result) => {
    next({
      ...rest,
      result,
      type: status.startsWith('20') ? SUCCESS : FAILURE
    });
  }).catch((error) => {
    console.warn('MIDDLEWARE ERROR:', error); // eslint-disable-line no-console
    next({ ...rest, error, type: FAILURE });
  });
};
