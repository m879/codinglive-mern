import React,{useState} from 'react';
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse,NavItem} from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';       
import {NavLink} from 'react-router-dom';
import { logoutUser} from '../../redux/Actions/Logout'
import {useDispatch} from 'react-redux';
import logo from '../../shared/logo.PNG';
import dp from '../../shared/profile.jpg';

const Header = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false);

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
            <Navbar expand="md" className="col-10 col-md-11 navbar-light">
                    <NavbarToggler className="mx-1" onClick={setToggleNav} />
                    <NavbarBrand className="mx-md-0 mx-auto  mb-1" href="/">
                    &nbsp;<img src={logo}  alt ="CodingLive"/>
                    </NavbarBrand>
                    <Collapse isOpen={isNavOpen} navbar className="">
                        <Nav navbar className=" ml-auto p-2">
                            <NavItem>
                                <NavLink className="nav-link" to='/home'>
                                    <span className="font-weight-bold">Dashboard</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/applications'>
                                    <span className="font-weight-bold">Applications</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/users'>
                                    <span className="font-weight-bold">Users</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/addadmin'>
                                    <span className="font-weight-bold ">Add Admin</span>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>                   
            </Navbar>
            <Dropdown isOpen={dropdownOpen} toggle={toggle} className="col-2 col-md-1 p-2 m-0 ">
                        <DropdownToggle className="bg-light border-light rounded-circle p-0">
                            <img src={dp} height="55" className="rounded-circle " alt ="CodingLive"/>
                        </DropdownToggle>
                        <DropdownMenu right className="bg-light">
                            <DropdownItem header className="text-dark font-weight-bold">Welcome, Admin</DropdownItem>
                            <DropdownItem divider className="m-0 "/>
                            <DropdownItem className="m-0 " onClick={handleLogout}>
                               Logout
                            </DropdownItem>
                        </DropdownMenu>
            </Dropdown> 
            </div>   
        </div>
    );
} 

export default Header;