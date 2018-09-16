import React, { Fragment } from 'react';
import { Navbar, NavbarBrand, Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import logo from './logo.png';
import { Roles } from '../../model';

export default ({role, name, logged}) => (
    <Navbar color="light" light>
        <NavbarBrand tag="button" className="btn btn-outline-secondary" style={{ borderWidth: '0'} }>
            <NavLink to="/">
                <img src={logo} alt="Logo" height="35px"/>
            </NavLink>
        </NavbarBrand>
        {
            logged && (
                <Nav className="ml-auto" navbar>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            {name}
                        </DropdownToggle>
                        <DropdownMenu right>
                        {
                            role === Roles.ADMIN && (
                                <Fragment>
                                    <DropdownItem>
                                        <NavLink to="/admin">
                                            administração
                                        </NavLink>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                </Fragment>
                            )
                        }
                            <DropdownItem>
                                Sair
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            )
        }
    </Navbar>
);
