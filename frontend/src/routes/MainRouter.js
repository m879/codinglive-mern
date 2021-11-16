import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Message from '../containers/Utility/MsgComponent';
import Loading from '../containers/Utility/LoadingComponent';
import CandidateRouter from './CandidateRouter'
import WelcomeRouter from './WelcomeRouter';
import CompanyRouter from './CompanyRouter';
import AdminRouter from './AdminRouter';
import {OAuthConnect} from  '../redux/Actions/Login';

function VIEW(usertype){
  if(usertype==="candidate")
      return( 
        <CandidateRouter/>
      );
    else if(usertype==="company")
      return( 
        <CompanyRouter/>
      );
    else if(usertype==="admin")
      return( 
        <AdminRouter/>
      );
    else
      return( 
        <WelcomeRouter/>
      );
}

function Main(){
   var auth=useSelector(state=>state.auth);
   const dispatch = useDispatch();  
   var url =new URL(document.URL);
   var oauth=url.searchParams.get("success"); //For OAuth Login , equals null if not used

   /**********For Google and Facebook Login*********/
   if(oauth!==null){ //OauthLogin was attempted
    dispatch(OAuthConnect(url));
    window.history.replaceState(null, "", "/") 
   }
   /*********************************/  


    return(
    <React.Fragment>
        <Loading/>        
        <Message/>
        {VIEW(auth.usertype)}
    </React.Fragment>
    );
 }
export default Main;