import { util } from '../Util';

export default {
  attemptLogin: (api, username, password) => {
    return api.post('/j_acegi_security_check', util.serializeJSON({
      j_username: username,
      j_password: password,
      from: '/'
    }), {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });
  }
};
