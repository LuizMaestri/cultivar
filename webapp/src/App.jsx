// @flow
import React, { Component } from 'react';
import { Header, Footer } from './components';
import Login from './login';
import Dashboard from './protected/dashboard';
import { Container, Row, Col } from 'reactstrap';
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { getAsObject } from './storage';
import { Roles } from './model';
import './App.css';

const RedirectRoute = ({ component, redirect, to, ...rest }) => (
  <Route {...rest} render={props => redirect ? component : <Redirect to={to} />}/>
);

const PrivateRoute = ({ component, logged, ...rest }) => (
  <RedirectRoute {...rest} redirect={logged} component={component} to="/login"/>
);

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      logged: getAsObject('authenticated')
    };
  }

  handlerLogin(){
    this.setState({logged: getAsObject('authenticated')});
  }

  render() {
    const { logged } = this.state;
    return (
      <div>
        <Header/>
          <Container fluid>
              <BrowserRouter>
                <Row>
                  <Col>
                    <PrivateRoute exact path="/" logged={logged} component={(<Redirect to="/dashboard"/>)}/>
                    <RedirectRoute path="/login" redirect={!logged} component={(<Login onAuthenticate={this.handlerLogin.bind(this)} />)} to="/dashboard"/>
                    <PrivateRoute path="/dashboard" logged={logged} component={(<Dashboard role={Roles.ADMIN} />)} />
                    <PrivateRoute path="/voluntarios" logged={logged} component={(<Redirect to="/dashboard"/>)} />
                    <PrivateRoute path="/escolas" logged={logged} component={(<Redirect to="/dashboard"/>)} />
                    <PrivateRoute path="/empresas" logged={logged} component={(<Redirect to="/dashboard"/>)} />
                    <PrivateRoute path="/usuarios" logged={logged} component={(<Redirect to="/dashboard"/>)} />
                    <PrivateRoute path="/profile" logged={logged} component={(<Redirect to="/dashboard"/>)} />
                    <Route render={props => (<Redirect to="/dashboard" />)}/>
                  </Col>
                </Row>
              </BrowserRouter>
          </Container>
        <Footer/>
      </div>
    );
  }
}
