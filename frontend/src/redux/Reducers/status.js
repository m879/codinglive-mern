import * as ActionTypes from '../ActionTypes';

export const Status = (state = {
    //default parameters are set as such when Auth reducer is used for the first time
    isLoading: false,
    success: null,
    msg: null,
}, action) => {
    switch (action.type) {
        case ActionTypes.STATUS_UPDATE:
            return {...state,
                isLoading: action.isLoading,
                success: action.success,
                msg: action.msg,
            };
        default:
            return state
    }
}