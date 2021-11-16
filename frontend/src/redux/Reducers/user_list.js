import * as ActionTypes from "../ActionTypes";

export const User_list = (state = [], action) => {
    switch(action.type){
        case ActionTypes.USER_LIST_UPDATE:
            return [
              ...action.user_list,
            ];
        default: 
            return state
    }
}