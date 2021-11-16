import * as ActionTypes from "../ActionTypes";

export const User_Report = (state = {
    companies: 0,
    candidates: 0,
    admins: 0,
    users: 0,
}, action) => {
    switch(action.type){
        case ActionTypes.REPORT_UPDATE:
            return {
              ...state,
              admins: action.usertype_list[0].count,
              candidates: action.usertype_list[1].count,
              companies: action.usertype_list[2].count,
              users: action.total
        };
        default: 
            return state
    }
}