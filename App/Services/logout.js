import {util} from '../Util';

export default {
  attemptLogout: (api) => {
    return api.get('/logout');
  }
};
