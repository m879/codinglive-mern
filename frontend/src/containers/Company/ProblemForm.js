/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { Label, Col, Row } from 'reactstrap';
import { Control, Form, Errors,} from 'react-redux-form';
import {Button} from 'reactstrap'
import {useDispatch, useSelector} from 'react-redux';
import { postVacancy } from "../../redux/Actions/Company";


const required = (val) => val && val.length;
const minLength = (len) => (val) => !(val) || (val.length >= len);


function ProblemForm({prev}){
   
    const dispatch = useDispatch();
    const VacancyInfo = useSelector(state=>state.VacancyInfo);

    const handlesubmit = (ProblemInfo)=>{
        dispatch(postVacancy(VacancyInfo,ProblemInfo)); 
        prev();
    }

    return(
                   <Form model="ProblemInfo" className="col-10 shadow p-5" 
                        onSubmit={handlesubmit}
                    >
                        <div className="mb-5 row">
                            <h4 className="border-bottom font-dark">Problem Details</h4>
                        </div>
                        <Row className="form-group frh">
                                <Label htmlFor="title" md={4}>Title</Label>
                                <Col md={8}>
                                    <Control.text model=".title" id="title" name="title"
                                        placeholder="Problem Title"
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3)
                                        }}                                        
                                    />                        
                                    <Errors
                                        className="text-danger small"
                                        model=".title"
                                        component="li"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Too Short'
                                        }}
                                    />   
                                </Col>
                        </Row> 
                        <Row className="form-group frh">
                                <Label htmlFor="duration" md={4}>Duration</Label>
                                <Col md={8} >
                                    <Control type="number" model=".duration" id="duration" name="duration"
                                        placeholder="Problem Duration in minutes"
                                        className="form-control" 
                                        validators={{
                                            required
                                        }}                                        
                                    />
                                    <Errors
                                        className="text-danger small "
                                        model=".duration"
                                        component="li"
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />                           
                                </Col>
                                
                        </Row>                     
                        <Row className="form-group">
                                <Label htmlFor="statement" md={4}>Statement</Label>
                                <Col md={8}>
                                    <Control.textarea model=".statement" id="statement" name="statement"
                                        placeholder="Problem Statement"
                                        className="form-control" 
                                        validators={{
                                            required
                                        }}  
                                        rows="12"                                      
                                    />                        
                                    <Errors
                                        className="text-danger small"
                                        model=".statement"
                                        component="li"
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />   
                                </Col>
                        </Row>  
                        <Row className="form-group">
                                <Label htmlFor="input" md={4}>Sample Input</Label>
                                <Col md={8}>
                                    <Control.textarea model=".input" id="input" name="input"
                                        className="form-control" 
                                        validators={{
                                            required
                                        }}  
                                        rows="4"                                      
                                    />                        
                                    <Errors
                                        className="text-danger small"
                                        model=".input"
                                        component="li"
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />   
                                </Col>
                        </Row> 
                        <Row className="form-group">
                                <Label htmlFor="output" md={4}>Sample Output</Label>
                                <Col md={8}>
                                    <Control.textarea model=".output" id="output" name="output"
                                        className="form-control" 
                                        validators={{
                                            required
                                        }}  
                                        rows="4"                                      
                                    />                        
                                    <Errors
                                        className="text-danger small"
                                        model=".output"
                                        component="li"
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />   
                                </Col>
                        </Row> 

                        <Row className="form-group justify-content-between">
                            <Col >
                                <Button onClick={()=>prev()} className=" btn-primary">
                                       Previous
                                </Button>
                            </Col>
                            <Col className="text-right">
                                <Button type="submit" className="btn-primary">
                                        Submit
                                </Button>
                            </Col>
                        </Row>     
                   </Form>     
            
    )
}

export default ProblemForm;