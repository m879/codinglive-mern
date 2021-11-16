import { INTERVIEW_LIST_UPDATE } from "../ActionTypes";

export const Interview_list = (state =[] , action) => {
    switch(action.type){
        case INTERVIEW_LIST_UPDATE:
            return [
              ...action.interview_list,
            ];
        default: 
            return state
    }
}

