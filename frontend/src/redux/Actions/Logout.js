import * as ActionTypes from '../ActionTypes';      
import { statusUpdate } from './StatusUpdate';


export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

//No logout error cause everything happens locally
export const logoutUser = () =>async (dispatch) => {
    dispatch(statusUpdate(true,null,''))
    dispatch(requestLogout());
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    localStorage.removeItem('usertype');
    localStorage.removeItem('profile');
    dispatch(receiveLogout());
    dispatch({type: ActionTypes.DESTROY_SESSION})
    dispatch(statusUpdate(false,true,'Logout Successfull!!'));
}

