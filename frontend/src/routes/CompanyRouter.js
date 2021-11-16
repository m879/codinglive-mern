import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import Dashboard from '../containers/Company/Dashboard';
import Header from '../containers/Company/Header';
import CopyRightFooter from '../containers/Utility/CopyRightFooter';
import Vacancy from '../containers/Company/Vacancy';
import Interview from '../containers/Company/Interview';
import PostVacancy from '../containers/Company/PostVacancy';
import Applicants from '../containers/Company/Applicants';
import InterviewPage from '../containers/Interview/Test';


function CompanyRouter(){
    return(
        <div>
          <Header/>
          <Switch>
                <Route exact path='/' component={() => <Dashboard/>} />
                <Route exact path='/vacancy' component={() => <Vacancy/>} />
                <Route path="/vacancy/:id" component={()=><Applicants />} />
                <Route exact path='/interview' component={()=><Interview/>}/>
                <Route exact path='/postvacancy' component={()=><PostVacancy/>}/>
                <Route exact path='/test/:id' component={() => <InterviewPage/>} />
                <Redirect to="/" />
          </Switch>
          <CopyRightFooter/>
        </div>
    )
}

export default CompanyRouter;