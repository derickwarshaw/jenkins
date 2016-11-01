import {util} from '../Util';

export default {
  attemptLogin: (api, username, password, https) => {

    const payload = {
      j_username: username,
      j_password: password,
      from: '/'
    };

    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    const loginEndpoint = '/j_acegi_security_check';

    if (https) {
      return api.get('/crumbIssuer/api/json', {}, {
        auth: {
          username: username,
          password: password
        }
      }).then((response) => {
        const crumb = response.data.crumb;
        const fieldName = response.data.crumbRequestField;

        if (crumb && fieldName) {
          payload[fieldName] = crumb;
        }

        return api.post(loginEndpoint, util.serializeJSON(payload), {headers});
      });
    } else {
      return api.post(loginEndpoint, util.serializeJSON(payload), {headers});
    }
  }
};
