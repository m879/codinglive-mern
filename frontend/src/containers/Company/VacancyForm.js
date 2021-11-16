/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { Label, Col, Row } from 'reactstrap';
import { Control, Form, Errors,} from 'react-redux-form';
import {Button} from 'reactstrap'
import {useDispatch, useSelector} from 'react-redux';
import { Dropdown} from 'semantic-ui-react';
import { actions } from "react-redux-form";


const options = [
  { key: 'angular', text: 'Angular', value: 'angular' },
  { key: 'css', text: 'CSS', value: 'css' },
  { key: 'design', text: 'Graphic Design', value: 'design' },
  { key: 'ember', text: 'Ember', value: 'ember' },
  { key: 'html', text: 'HTML', value: 'html' },
  { key: 'ia', text: 'Information Architecture', value: 'ia' },
  { key: 'javascript', text: 'Javascript', value: 'javascript' },
  { key: 'node', text: 'NodeJS', value: 'node' },
  { key: 'python', text: 'Python', value: 'python' },
  { key: 'rails', text: 'Rails', value: 'rails' },
  { key: 'react', text: 'React', value: 'react' },
  { key: 'ruby', text: 'Ruby', value: 'ruby' },
  { key: 'ui', text: 'UI Design', value: 'ui' },
  { key: 'ux', text: 'User Experience', value: 'ux' },
]

const required = (val) => val && val.length;
const minLength = (len) => (val) => !(val) || (val.length >= len);


function VacancyForm({next}){
   
    const companyname= useSelector(state=>state.profile.companyname);
    const skills = useSelector(state=>state.VacancyInfo.skills);
    const dispatch = useDispatch();

    const addskills = (event,{value})=>{
        dispatch(actions.change('VacancyInfo.skills',value));
    }

    const handlenext=(values)=>{
       next();    
    }

    return(
                   <Form model="VacancyInfo" className="col-10 shadow p-5" 
                        onSubmit={handlenext}
                        validators={{
                            '':{ 
                             required:(vals) => skills.length,
                           },
                         }}
                    >
                        <div className="mb-5 row">
                            <h4 className="border-bottom font-dark">About Job</h4>
                        </div>

                        <Row className="form-group frh">
                                <Label htmlFor="position" md={4}>Position</Label>
                                <Col md={8}>
                                    <Control.text model=".position" id="position" name="position"
                                        placeholder="Position Hiring For"
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3)
                                        }}                                        
                                    />                        
                                    <Errors
                                        className="text-danger small"
                                        model=".position"
                                        component="li"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Too Short'
                                        }}
                                    />   
                                </Col>
                        </Row>
                        <Row className="form-group frh">
                                <Label htmlFor="companyname" md={4}>Company Name</Label>
                                <Col md={8}>
                                    <Control.text model=".companyname" id="companyname" name="companyname"
                                        defaultValue={companyname}
                                        className="form-control" 
                                        disabled                                    
                                    />                           
                                </Col>
                        </Row>
                        <Row className="form-group frh">
                                <Label htmlFor="skills" md={4}>Skills Required</Label>
                                <Col md={8}>
                                  <Dropdown placeholder='Skills' 
                                            fluid 
                                            multiple 
                                            search 
                                            selection 
                                            options={options} 
                                            onChange={addskills}
                                            defaultValue={skills}
                                  /> 
                                  <Errors
                                    className="text-danger small"
                                    model="VacancyInfo"
                                    component="li"
                                    messages={{
                                        required: 'Required',
                                    }}
                                    /> 
                                </Col>     
                        </Row>
                        
                        <Row className="form-group">
                                <Label htmlFor="description" md={4}>Description</Label>
                                <Col md={8}>
                                    <Control.textarea model=".description" id="description" name="description"
                                        placeholder="About the Job"
                                        className="form-control" 
                                        validators={{
                                            required
                                        }}  
                                        rows="4"                                      
                                    />                        
                                    <Errors
                                        className="text-danger small"
                                        model=".description"
                                        component="li"
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />   
                                </Col>
                        </Row>                        
                        <Row className="form-group frh">
                                <Label htmlFor="commencement" md={4}>Commencement</Label>
                                <Col md={8}>
                                    <Control type="datetime-local" model=".commencement" id="commencement" name="commencement"
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3)
                                        }}                                        
                                    />
                                    <Errors
                                        className="text-danger small"
                                        model=".commencement"
                                        component="li"
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />                           
                                </Col>
                        </Row>
                        <Row className="form-group frh">
                                <Label htmlFor="duration" md={4}>Duration</Label>
                                <Col md={8} >
                                    <Control type="number" model=".duration" id="duration" name="duration"
                                        placeholder="Interview Duration in minutes"
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
                        <Row className="form-group frh">
                                <Label htmlFor="deadline" md={4}>Deadline</Label>
                                <Col md={8}>
                                    <Control type="datetime-local" model=".deadline" id="deadline" name="deadline"
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3)
                                        }}                                        
                                    />
                                    <Errors
                                        className="text-danger small"
                                        model=".deadline"
                                        component="li"
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />                           
                                </Col>
                        </Row>
            
                        <Row className="form-group text-right">
                            <Col>
                                <Button type="submit" className="col-3 btn-primary">
                                        Next
                                </Button>
                            </Col>
                        </Row>     
                   </Form>     
            
    )
}

export default VacancyForm;