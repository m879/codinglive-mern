import {combineReducers} from 'redux';
import {createForms} from 'react-redux-form';
import {Auth} from './Reducers/auth';
import {Status} from './Reducers/status';
import {User_list} from './Reducers/user_list';
import { Application_list} from './Reducers/application_list';
import {InitialSignUp} from './Forms/InitialSignUp';
import {InitialApply} from './Forms/InitialApply';
import {InitialCreate} from './Forms/InitialCreate';
import {DESTROY_SESSION} from './ActionTypes';
import {User_Report} from './Reducers/user_report';
import { Profile } from './Reducers/profile';
import { InitialVacancy } from './Forms/InitialVacancy';
import { InitialProblem } from './Forms/InitialProblem';
import { Vacancy_list } from './Reducers/vacancy_list';
import { Interview_list } from './Reducers/interview_list';
import {Problem} from './Reducers/problem';

const appReducer = combineReducers({
    auth: Auth,
    status: Status,            
    ...createForms({
        SignUpInfo: InitialSignUp,
        ApplyInfo: InitialApply,
        CreateInfo: InitialCreate,
        VacancyInfo: InitialVacancy,
        ProblemInfo: InitialProblem
    }),
    user_list: User_list,
    application_list: Application_list,
    interview_list: Interview_list,
    vacancy_list: Vacancy_list,
    user_report: User_Report,
    profile: Profile,
    problem: Problem,
});

const rootReducer = (state, action) => {
    if (action.type === DESTROY_SESSION) {
      state = undefined;
    }  
    return appReducer(state, action);
};

export default rootReducer;