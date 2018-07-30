import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import logo from './logo.png';

export default (props) => (
    <Navbar color="light" light>
        <NavbarBrand href="#">
            <img src={logo} alt="Logo" height="35px"/>
        </NavbarBrand>
    </Navbar>
);
