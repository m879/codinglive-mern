import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import Home from '../containers/Welcome/HomeComponent';
import Header from '../containers/Welcome/HeaderComponent';
import Login from '../containers/Authentication/LoginComponent';
import SignUp from '../containers/Authentication/SignUpComponent';
import SignUpCandidate from '../containers/Authentication/SignUpCandidate';
import SignUpCompany from '../containers/Authentication/SignUpCompany';
import OAuth from '../containers/Authentication/OAuth';
import ForgetPassword from '../containers/Authentication/ForgetPassword';
import ResetPassword from '../containers/Authentication/ResetPassword';
import CopyRightFooter from '../containers/Utility/CopyRightFooter';

function WelcomeRouter(){
    return(
        <div >
          <Header/>
          <Switch>
                <Route exact path='/' component={() => <Home/>} /> 
                <Route exact path='/login' component={()=><React.Fragment><Login/><OAuth/></React.Fragment>}/>
                <Route exact path="/signup" component={()=><SignUp/>}/> 
                <Route exact path="/signup/company" component={()=><SignUpCompany/>}/>
                <Route exact path="/signup/candidate" component={()=><React.Fragment><SignUpCandidate/><OAuth/></React.Fragment>}/>
                <Route exact path="/forgetpassword" component={()=><ForgetPassword/>}/>
                <Route path="/resetpassword/:token/:userId" component={()=><ResetPassword/>}/>
                <Redirect to="/" />             
          </Switch>
          <CopyRightFooter/>
        </div>
    )
}

export default WelcomeRouter;