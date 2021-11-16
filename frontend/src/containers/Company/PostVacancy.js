import React,{useState} from 'react';
import VacancyForm from './VacancyForm';
import ProblemForm from './ProblemForm';




function PostVacancy(){
    
    const [index,changeIndex] = useState(0);

    return(
        <div className="container">
            <div className ="row frh"></div>
            <div className="row mt-5">
                <h3 className="col-11 font-dark text-center">New Vacancy Details</h3>                
            </div>
            <div className="row justify-content-center my-5">
              {(!index)?<VacancyForm next={()=>changeIndex(1)}/>
              :<ProblemForm prev={()=>changeIndex(0)}/>}
            </div>
        </div>
    )
}

export default PostVacancy;