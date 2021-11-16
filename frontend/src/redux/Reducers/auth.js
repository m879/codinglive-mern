import * as ActionTypes from '../ActionTypes';

export const Auth = (state = {
    //default parameters are set as such when Auth reducer is used for the first time
    isAuthenticated: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token'),
    user: localStorage.getItem('creds') ? localStorage.getItem('creds') : null,
    usertype : localStorage.getItem('usertype') ?(localStorage.getItem('usertype')) : null,
}, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST:
            return {...state,
                isAuthenticated: false,
            };
        case ActionTypes.LOGIN_SUCCESS:
            return {...state,
                isAuthenticated: true,
                token: action.token,
                usertype: action.usertype,
                user: action.creds
            };
        case ActionTypes.LOGIN_FAILURE:
                return {...state,
                    isAuthenticated: false,
                };
        case ActionTypes.LOGOUT_REQUEST:
                return {...state,
                    isAuthenticated: true
                };
        case ActionTypes.LOGOUT_SUCCESS:
                return {...state,
                    isAuthenticated: false,
                    token: '',
                    user: null,
                    usertype: '',
                };
        default:
            return state
    }
}