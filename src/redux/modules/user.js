const LOGIN = 'jenkins/user/LOGIN';
const LOGIN_SUCCESS = 'jenkins/user/LOGIN_SUCCESS';
const LOGIN_FAIL = 'jenkins/user/LOGIN_FAIL';
const LOGOUT = 'jenkins/user/LOGOUT';
const LOGOUT_SUCCESS = 'jenkins/user/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'jenkins/user/LOGOUT_FAIL';

const initialState = {
  username: null,
  loginSuccess: false,
  password: null,
  errorCode: null,
  attempting: false,
  instanceName: null,
  host: null,
  port: null,
  https: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        attempting: true, 
        username: action.username, 
        password: action.password, 
        instanceName: action.instanceName, 
        host: action.host, 
        port: action.port, 
        https: action.https
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        attempting: false, 
        loginSuccess: true, 
        password: null, 
        errorCode: null, 
        username: action.username, 
        instanceName: action.instanceName, 
        host: action.host, 
        port: action.port
      };
    case LOGIN_FAIL:
      return {
        ...state,
        attempting: false, 
        errorCode: action.errorCode, 
        instanceName: null
      };
    case LOGOUT:
      return {
        ...state,
        attempting: true
      };
    case LOGOUT_SUCCESS: {
      return {
        ...initialState
      };
    }
    case LOGOUT_FAIL:
      return {
        ...state,
        attempting: false, 
        errorCode: action.errorCode
      };
    default:
      return state;
  }
}

export function login(username, password, instanceName, host, port, https) {
  return (dispatch) => {
    
    const payload = {
      j_username: username,
      j_password: password,
      from: '/'
    };
    
    if (https) {
      return dispatch({
        type: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
        request: {
          url: '/crumbIssuer/api/json',
          options: {
            method: 'GET'
          }
        }
      }).then((response) => {
        const crumb = response.data.crumb;
        const fieldName = response.data.crumbRequestField;

        if (crumb && fieldName) {
          payload[fieldName] = crumb;
        }
        
        return dispatch({
          type: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
          request: {
            url: '/j_acegi_security_check',
            options: {
              method: 'POST',
              body: JSON.stringify({
                j_username: username,
                j_password: password,
                from: '/'
              }),
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }
          },
          username,
          instanceName,
          host,
          port,
          https
        });
      });
    } else {
      return dispatch({
        type: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
        request: {
          url: '/j_acegi_security_check',
          options: {
            method: 'POST',
            body: JSON.stringify({
              j_username: username,
              j_password: password,
              from: '/'
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        },
        username,
        instanceName,
        host,
        port,
        https
      });
    }
  }
}

export function logout() {
  return {
    type: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    request: {
      url: '/logout',
      options: {
        method: 'GET'
      }
    }
  };
}
