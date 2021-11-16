import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Button,
       } from 'reactstrap';
import {Link} from 'react-router-dom';
function SignUp(){
  return(
    <React.Fragment>
      <div className="container-fluid getstarted">
        <div className="row justify-content-around">
          <Card className="col-7 col-md-4 my-5 shadow">
                  <CardImg/>
                  <CardBody className="text-center">
                      <CardTitle className="font-dark border-bottom mb-4">Candidate</CardTitle>
                      <CardText >Further your placement by applying for jobs and taking coding interview rounds from anywhere in the world with ease</CardText>
                      <Link to={`/signup/candidate`}>
                        <Button className="btn-primary">Get Hired</Button>
                      </Link>
                  </CardBody>                               
          </Card>
          <Card className="col-7 col-md-4  my-5 shadow">
                  <CardImg/>
                  <CardBody className="text-center">
                      <CardTitle className="font-dark border-bottom mb-4">Company</CardTitle>
                      <CardText >Ease your hiring Process by conducting Live online interview rounds with full survelliance for Interested Candidiates</CardText>
                      <Link to={`/signup/company`}>
                        <Button className="btn-primary">Start Hiring</Button>
                      </Link>
                  </CardBody>                               
          </Card>
        </div>
      </div>
    </React.Fragment>
  )
}
export default SignUp;