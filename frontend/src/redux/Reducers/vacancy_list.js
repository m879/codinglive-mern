import * as ActionTypes from "../ActionTypes";

export const Vacancy_list = (state = [], action) => {
    switch(action.type){
        case ActionTypes.VACANCY_LIST_UPDATE:
            return [
              ...action.vacancy_list,
            ];
        default: 
            return state
    }
}