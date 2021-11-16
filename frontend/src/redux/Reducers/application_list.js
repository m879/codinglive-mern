import { APPLICATION_LIST_UPDATE } from "../ActionTypes";

export const Application_list = (state =[] , action) => {
    switch(action.type){
        case APPLICATION_LIST_UPDATE:
            return [
              ...action.application_list,
            ];
        default: 
            return state
    }
}

