import React, { useState } from 'react';
import { Alert } from 'reactstrap';
import { statusUpdate } from '../../redux/Actions/StatusUpdate';
import {useSelector,useDispatch} from 'react-redux';

//Alert box Will be reflected if the status state is changed
//Whwn the box is dismissed its state is reset so that if a similar error occurs later on the alert box displays it as the state will change
function Message(){
    var status=useSelector(state=>state.status);
    const dispatch=useDispatch();

    const [visible, setVisible] = useState(true); 
    const onDismiss = () => {
        setVisible(false);
        dispatch(statusUpdate(false,null,'')); 
        setVisible(true);
    }; 
    if(visible&&status.msg){
        setTimeout(()=>{onDismiss()},4000);
    }
    if(status.msg){ //status msg is empty for no requests
        return(
            <Alert className="text-center position-fixed sticky-top w-100" isOpen={visible}  color={(status.success)?"success":"danger"}>
               {status.msg}
            </Alert>
        ); 
    }   
    else{
        return(
            <div></div>
        )
    }
}
export default Message;