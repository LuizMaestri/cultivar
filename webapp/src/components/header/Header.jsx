import React, { Component, Fragment } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarToggler,
    Collapse
} from 'reactstrap';
import logo from './logo.png';
import { Roles } from '../../model';

export default class extends Component{
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        const { isOpen } = this.state;
        this.setState({
            isOpen: !isOpen
        });
    }
    render() {
        const { role, logged, logout } = this.props;
        return (
            <Navbar color="light" light expand="md">
                <NavbarBrand tag="button" className="btn btn-outline-secondary" style={{ borderWidth: '0'} }>
                    <NavLink href="/">
                        <img src={logo} alt="Logo" height="35px"/>
                    </NavLink>
                </NavbarBrand>
                {
                    logged && (
                        <Fragment>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    {
                                        role === Roles.ADMIN && (
                                            <Fragment>
                                                <NavItem>
                                                    <NavLink href="/admin">
                                                        administração
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink href="/relatorio">
                                                        Relátorios
                                                    </NavLink>
                                                </NavItem>
                                            </Fragment>
                                        )
                                    }
                                    <NavItem onClick={logout} style={{cursor: 'pointer'}}>
                                        <NavLink>
                                            Sair
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </Fragment>
                    )
                }
            </Navbar>
        );
    }
}
