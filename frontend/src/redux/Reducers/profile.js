import { PROFILE_UPDATE } from "../ActionTypes";

export const Profile = (state=localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : null,
    action) => {
    switch(action.type){
        case PROFILE_UPDATE:
            return {
              ...action.profile
            }
        default: 
            return state;
    }
}