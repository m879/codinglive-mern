import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import Dashboard from '../containers/Candidate/Dashboard';
import Header from '../containers/Candidate/Header';
import CopyRightFooter from '../containers/Utility/CopyRightFooter';
import Interview from '../containers/Candidate/Interview';
import Vacancies from '../containers/Candidate/Vacancies';
import Applications from '../containers/Candidate/Applications';
import InterviewPage from '../containers/Interview/Test';
import CandidateProfile from '../containers/Candidate/Profile';

function CandidateRouter(){

  console.log("Inside candidate");
    return(
        <div>
          <Header/>
          <Switch>
                <Route exact path='/' component={() => <Dashboard/>} />
                <Route exact path='/vacancies' component={() => <Vacancies/>} />
                <Route exact path='/applications' component={() => <Applications/>} />
                <Route exact path='/interview' component={() => <Interview/>} />
                <Route exact path='/profile' component={() => <CandidateProfile/>} />
                <Route exact path='/test/:id' component={() => <InterviewPage/>} />
                <Redirect to='/' />
          </Switch>
          <CopyRightFooter/>
        </div>
    )
}

export default CandidateRouter;