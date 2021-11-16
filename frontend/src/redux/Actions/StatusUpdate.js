import * as ActionTypes from '../ActionTypes';
import { logoutUser } from './Logout';

export const statusupdate = (isLoading,success,msg) => {
    return{
        type: ActionTypes.STATUS_UPDATE,
        isLoading,
        success,
        msg,
     }
}

export const statusUpdate=(isLoading,success,msg)=>(dispatch)=>{
    if(msg==="Error 401 : Unauthorized"){
        msg="Session Expired!! Please Login Again"
        dispatch(logoutUser());
        dispatch(statusupdate(isLoading,success,msg));
    }
    else{
       dispatch(statusupdate(isLoading,success,msg));
    }
}