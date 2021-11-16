import React,{useState} from 'react';
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse,NavItem} from 'reactstrap';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'; 
import {NavLink} from 'react-router-dom';
import {logoutUser} from '../../redux/Actions/Logout'
import {useDispatch, useSelector} from 'react-redux';
import logo from '../../shared/logo.PNG';
import dp from '../../shared/profile.jpg';
import { UncontrolledDropdown } from 'reactstrap';

const Header = () => {


    const [dropdownOpen, setDropdownOpen] = useState(false);

    const profile = useSelector(state=>state.profile);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const dispatch = useDispatch()
    const [isNavOpen,toggleNav]= useState(false);
    const setToggleNav=()=>{
        toggleNav(!isNavOpen);
    }
    const handleLogout=()=>{
        dispatch(logoutUser());
    }
    
    return(
        <div className="container-fluid position-fixed sticky-top">
            <div className="row bgc-alt">
            <Navbar expand="md" className="col-10 col-md-11 navbar-light" style={{background:'white',color:'darkviolet',boxShadow:'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px'}}>
                    <NavbarToggler className="mx-1" onClick={setToggleNav} />
                    <NavbarBrand className="mx-md-0 mx-auto  mb-1" href="/">
                    &nbsp;<img src={logo}  alt ="CodingLive"/>
                    </NavbarBrand>
                    <Collapse isOpen={isNavOpen} navbar className="">
                        <Nav navbar className=" ml-auto p-2">
                            <NavItem className="mr-3">
                                <NavLink className="nav-link" to='/home'>
                                    <span className="font-weight-bold">Dashboard</span>
                                </NavLink>
                            </NavItem>
                            <NavItem className="mr-2 mb-2">
                                    <UncontrolledDropdown>
                                            <DropdownToggle tag="button" caret className="btn-nav p-0">
                                                Vacancy
                                            </DropdownToggle>
                                            <DropdownMenu className="bg-light mt-2">
                                                    <NavLink className="nav-link " to='/vacancy'>
                                                        <DropdownItem className="font-weight-bold ">
                                                           Company Vacancies 
                                                        </DropdownItem>
                                                    </NavLink>
                                                    <NavLink className="nav-link " to='/postvacancy'>
                                                        <DropdownItem className="font-weight-bold ">
                                                            Post New Vacancy
                                                        </DropdownItem>
                                                    </NavLink>
                                            </DropdownMenu>
                                    </UncontrolledDropdown>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/interview'>
                                    <span className="font-weight-bold ">Interview</span>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>                   
            </Navbar>
            <Dropdown isOpen={dropdownOpen} toggle={toggle} className="col-2 col-md-1 p-2 m-0 ">
                        <DropdownToggle className="bg-light border-light rounded-circle p-0">
                            <img src={dp} height="50" className="rounded-circle " alt ="Profile_Picture"/>
                        </DropdownToggle>
                        <DropdownMenu right className="bg-light">
                            <DropdownItem header className="text-dark font-weight-bold">Welcome, {profile?profile.firstname:"Company"} </DropdownItem>
                            <DropdownItem divider className="m-0 "/>
                            <DropdownItem className="m-0 " onClick={handleLogout}>
                               Logout
                            </DropdownItem>
                        </DropdownMenu>
            </Dropdown> 
            </div>   
        </div>
    )
}

export default Header;