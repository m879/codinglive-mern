import React from 'react'; 
import {Link} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getvacancylist } from '../../redux/Actions/Candidate';
import {Card , CardFooter, Button, CardText, CardBody} from 'reactstrap';
import VacancyView from '../Utility/VacancyView';
import {Container,Row,Col} from 'react-bootstrap';


const VacancyList = () =>{
  
    const dispatch = useDispatch();
    var vacancy_list= useSelector(state=>state.vacancy_list);
 
    console.log("VACANCY LIST = ",vacancy_list);

    useEffect(()=>{
        dispatch(getvacancylist());
    },[dispatch])
  
      if(vacancy_list.length!==0){
          const listview = vacancy_list.map((vacancy)=>{
              return(
                  <Col lg={4} xs={12}>
                      <Card key={vacancy._id} className="p-0  my-3 shadow" >  
                          <VacancyView vacancy={vacancy}/>
                          <CardBody className="border-top">
                            <CardText className="row font-short">
                                <div className="col-5 font-weight-bold">
                                    Pending <br/>Selected<br/>Created At<br/>
                                </div>
                                <div className="col-7 font-italic">
                                    {vacancy.applicants.length}<br/>
                                    {vacancy.selected.length}<br/>
                                    {new Intl.DateTimeFormat('en-US', {timeStyle:"medium",dateStyle:"medium"}).format(new Date(Date.parse(vacancy.createdAt)))} <br/>
                                </div>                                                      
                            </CardText>
                          </CardBody>
                          <CardFooter className="bg-white">
                              <Link to={`/vacancy/${vacancy._id}`}>
                                <Button className="btn-primary mr-4">ShortList</Button>
                              </Link>
                          </CardFooter>  
                      </Card>
                  </Col>

              );
          })
  
          return(
              <div className="container">
                  <div>
                      <Row>
                         {listview}
                      </Row>
                  </div>    
              </div>      
          )
      }
      else
      return(
          <div className="container vh-height">
              <div className="row justify-content-center">
                  <h3 className="my-5 col-10 p-4 text-center bgc-light">
                      There are no available vacancies at the moment ....
                  </h3>
              </div>
          </div>
      )
}


function Vacancy(){
    return(
        <React.Fragment>
            <div className="container">
                <div className ="row frh"></div>
                <div className="row my-5 border-bottom">              
                    <h2 className="col-10 font-dark ">Vacancies Posted</h2>
                    <div className="col-2  text-center">
                        <Link to="/postVacancy" className="font-dark text-decoration-none">
                            <i className="fa fa-plus fa-2x"></i>  
                        </Link>
                    </div>    
                </div>
            </div>
            <VacancyList/>
        </React.Fragment>
    )
}

export default Vacancy; 