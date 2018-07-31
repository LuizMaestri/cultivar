import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import logo from './logo.png';

export default (props) => (
    <Navbar color="light" light>
        <NavbarBrand>
            <NavLink to="/">
                <img src={logo} alt="Logo" height="35px"/>
            </NavLink>
        </NavbarBrand>
    </Navbar>
);
