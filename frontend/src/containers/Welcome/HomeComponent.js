import React from 'react';
import Footer from './FooterComponent';
import headerImg from './bg2.jpg';
import aboutImg from './about.png';
import { Button ,Card,Container,Row,Col,Carousel} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const team=[
    {
        name:'Adeeb Akhtar',
        course:'B-Tech 3rd Year',
        branch:'Computer Engineering',
        college:'ZHCET, AMU',
        img:'https://avatars.githubusercontent.com/u/60551119?v=4'
    },
    {
        name:'Meraj Ahmed' ,
        course:'B-Tech 3rd Year',
        branch:'Computer Engineering',
        college:'ZHCET, AMU',
        img:'https://avatars.githubusercontent.com/u/57950583?v=4'
    }
]

const carousel=[
    {},{},{}
]

export default function HomeComponent() {
    return (
        <div>
            <section className='home-header' style={{padding:'50px 0px 50px 0px'}}>
                <Container fluid>
                    <Row>
                        <Col lg={6} className='p-4'>
                            <Container style={{padding:'50px'}}>
                                <h1 style={{fontFamily: 'Secular One'}}>Come</h1>
                                <h1 style={{fontFamily: 'Secular One'}}>and Join Us</h1>
                                <div className='my-4 py-4'>
                                <p className='text-secondary' style={{fontFamily: 'Roboto',lineHeight:2,fontWeight:'normal'}}>It is an ideal platform for students who are ready to connect to the outside world where they can be
                                     hired by people of upper heirarchy, thus making them industry- ready. 
                                     The site is a perfect aid to create alliances with people interested in your field 
                                     instead of 'Letting your skills be wasted since you couldn't find someone who could guide or hire you!' 
                                     </p>
                                     <NavLink to="/signup">
                                        <Button  className='my-4' 
                                        style={{background:'darkviolet',color:'white',border:'1px solid darkviolet',borderRadius:'20px',padding:'10px 20px',fontFamily: 'Secular One'}}
                                        >Join Us to Explore</Button>
                                     </NavLink>
                             </div>
                            </Container>
                        </Col>
                        <Col lg={6}>
                            <img src={headerImg}
                            style={{height:'400px',width:'100%'}}></img>
                        </Col>
                    </Row>
                </Container> 
            </section>
            <section className='about' style={{background:'#f5f8fd',padding:'100px 0px 100px 0px'}}>
                <Container>
                    <Row>
                        <Col lg={6}>
                            <img src={aboutImg} style={{height:'400px',width:'100%'}}></img>
                        </Col>
                        <Col lg={6} className='p-4'>
                             <div><h1 style={{fontFamily: 'Secular One'}}>About Us</h1></div>
                             <div className='my-4'>
                                 <p style={{fontFamily: 'Roboto',lineHeight:2}}>It is an ideal platform for students who are ready to connect to the outside world where they can be hired by people of upper heirarchy, thus making them industry- ready. The site is a perfect aid to create alliances with people interested in your field instead of 'Letting your skills be wasted since you couldn't find someone who could guide or hire you!' EXPLIFY gears in finding freelance work, potential partners, base for industrial work and even a means to keep your career prospects open while you are studying in college!</p>
                             </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section style={{padding:'100px 0px 100px 0px'}}>
                <Container>
                    <div><h1 className='text-center' style={{fontFamily: 'Secular One'}}>Why choose us?</h1></div>
                    <Row style={{marginTop:'50px'}}>
                        <Col lg={6} xs={12} className='my-4'>

                        </Col>
                        <Col lg={6} xs={12} className='my-4'>
                            <div>
                                <div  className='my-4'>
                                    <h3 style={{fontFamily: 'Secular One'}}>OUR APPROACH:</h3>
                                    <p className='text-secondary' style={{fontFamily: 'Roboto',lineHeight:2}}>Some quick example text to build on the card title and make up the bulk of
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.</p>
                                </div>
                                <hr/>
                                <div  className='my-4'>
                                    <h3 style={{fontFamily: 'Secular One'}}>OUR AIM & OBJECTIVE:</h3>
                                    <p className='text-secondary'  style={{fontFamily: 'Roboto',lineHeight:2}}>Some quick example text to build on the card title and make up the bulk of
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.</p>
                                </div>
                                <hr/>
                                <div  className='my-4'>
                                    <h3 style={{fontFamily: 'Secular One'}}>OUR POLICIES:</h3>
                                   <p className='text-secondary'  style={{fontFamily: 'Roboto',lineHeight:2}}>Some quick example text to build on the card title and make up the bulk of
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.</p>
                                </div>
                            </div>  
                        </Col>
                    </Row>
                </Container>
            </section>
            <section id='testimony' style={{padding:'100px 0px 100px 0px'}}>
            <div style={{paddingBottom:'50px'}}><h1 style={{fontFamily: 'Secular One'}} className='text-center'>Testimonials</h1></div>
                <Container>
                    <Row>
                    <Col lg={3} xs={12}></Col>
                    <Col lg={6} xs={12}>
                    <Carousel>
                        {
                            carousel.map(()=>(
                                <Carousel.Item>
                                <Card style={{ width: '100%',boxShadow:'rgba(0, 0, 0, 0.24) 0px 3px 8px',borderRadius:'20px'}}>
                                    <Row>
                                        <Col lg={6} xs={12}>
                                            <div style={{padding:'50px'}}>
                                                <img src={aboutImg} style={{height:'150px',width:'150px',borderRadius:'100%',border:'5px solid darkviolet'}}></img>
                                            </div>
                                        </Col>
                                        <Col lg={6} xs={12}>
                                           <Card.Body className='my-4'>
                                                <Card.Title style={{fontFamily: 'Secular One'}}>Zaid Ali</Card.Title>
                                                <Card.Text className='my-4' style={{fontFamily: 'Roboto',lineHeight:2}}>
                                                  <q>Some quick example text to build on the card title and make up the bulk of
                                                  Some quick example text to build on the card title and make up the bulk of
                                                  the card's content.</q>
                                                </Card.Text>
                                           </Card.Body>
                                        </Col>
                                    </Row>
                                    </Card>
                              </Carousel.Item>
                            ))
                        }
                        </Carousel>
                    </Col>
                    <Col lg={3} xs={12}></Col>
                    </Row>
                </Container>
            </section>
            <section className='team' style={{background:'#f5f8fd',padding:'100px 0px 150px 0px'}}>
                <Container>
                    <div style={{paddingBottom:'50px'}}><h1 style={{fontFamily: 'Secular One'}} className='text-center'>Developer Team</h1></div>
                    <Row>
                        {
                            team.map((row)=>(
                                <Col lg={6} xs={12} className='my-4' style={{display:'flex',justifyContent:'center'}}>
                                    <div className='text-center'>
                                    <Card  style={{width:'50vh',boxShadow:'rgba(0, 0, 0, 0.24) 0px 3px 8px',marginTop:-10 }}>
                                        <div className='text-center mt-4'>
                                      <Card.Img variant="top" className='mt-4' src={row.img} style={{height:'150px',width:'150px',boxShadow:'rgba(0, 0, 0, 0.24) 0px 3px 8px',borderRadius:'100%'}}/>
                                        </div>
                                      <Card.Body>
                                        <Card.Title className='text-center mt-4' style={{fontFamily: 'Secular One'}}>{row.name}</Card.Title>
                                        <Card.Text className='my-1' style={{fontFamily: 'Roboto'}}>{row.course}</Card.Text>
                                        <Card.Text className='my-1' style={{fontFamily: 'Roboto'}}>{row.branch}</Card.Text>
                                        <Card.Text className='my-1' style={{fontFamily: 'Roboto'}}>{row.college}</Card.Text>
                                      </Card.Body>
                                      <Card.Footer style={{display:'flex',justifyContent:'center'}}>
                                      <a className="btn btn-social-icon text-dark rounded-circle" href="mailto:">
                                          <i className="fa fa-github"></i></a>
                                      <a className="btn btn-social-icon text-dark rounded-circle" href="http://www.linkedin.com/in/">
                                          <i className="fa fa-linkedin"></i></a>&nbsp;
                                      <a className="btn btn-social-icon text-dark rounded-circle" href="http://www.facebook.com/profile.php?id=">
                                          <i className="fa fa-facebook"></i></a>&nbsp;
                                      </Card.Footer>
                                    </Card>
                                    </div>

                                </Col>
                            ))
                        }
                       
                    </Row>
                </Container>
            </section>
            <Footer/>
        </div>
    )
}
