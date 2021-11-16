import { PROBLEM_UPDATE } from "../ActionTypes";

export const Problem = (state='',
    action) => {
    switch(action.type){
        case PROBLEM_UPDATE:
            return {
              ...action.problem
            }
        default: 
            return state;
    }
}