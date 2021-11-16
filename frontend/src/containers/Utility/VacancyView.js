import React from 'react';
import { CardText, CardTitle, CardSubtitle, CardHeader,CardBody} from 'reactstrap';



function VacancyView({vacancy}){
    
    var str = vacancy.skills.join(' , ');
    
    return(
            <React.Fragment> 
                <CardHeader className="h4 bgc-dark" >{vacancy.companyname}</CardHeader>     
                <CardBody >
                        <CardTitle className="h5 text-uppercase font-weight-bold">Hiring For {vacancy.position}</CardTitle>
                        <CardSubtitle className="font-dark">{vacancy.description}<br/><br/>
                         <span className="font-weight-bold text-dark ">Skills Required</span><br/>
                         <p className="font-weight-bold font-dark">{str}</p><br/>
                        </CardSubtitle>

                        <CardText className="row font-short">
                            <div className="col-5 font-weight-bold">
                                Interview At<br/>Duration<br/> Deadline <br/>
                            </div>
                            <div className="col-7 font-italic">
                                
                                {new Intl.DateTimeFormat('en-US', {timeStyle:"medium",dateStyle:"medium"}).format(new Date(Date.parse(vacancy.commencement)))} <br/>
                                {vacancy.duration} minutes <br/>
                                {new Intl.DateTimeFormat('en-US', {timeStyle:"medium",dateStyle:"medium"}).format(new Date(Date.parse(vacancy.deadline)))} <br/>
                            </div>                                                      
                        </CardText>
                </CardBody>    
            </React.Fragment>  
    );
}

export default VacancyView;

