import { serializeJSON } from '../Util';

export default {
  attemptLogin: (api) => {
    return api.post('/j_acegi_security_check', serializeJSON({
      j_username: username,
      j_password: password,
      from: '/'
    }), {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });
  }
};
