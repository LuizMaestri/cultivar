// @flow
import React, { Component } from 'react';
import { Header } from './components';
import Login from './login';
import Dashboard from './protected/dashboard';
import { Container } from 'reactstrap';
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { getAsObject } from './storage';
import { Roles } from './model';
import './App.css';

const redirectOpt = (props, path) => ({
  pathname: path,
  state: {
    from: props.location
  }
});

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
    return (
      <div>
        <Header/>
        <BrowserRouter>
          <Container fluid>
            <br/>
            <Route exact path='/'
              render={props => this.state.logged ? 
                (<Redirect to={redirectOpt(props, '/dashboard')} />) :
                (<Redirect to={redirectOpt(props, '/login') }/>)
              }/>
            <Route exact path='/login' 
              render={props => this.state.logged ? 
                (<Redirect to={redirectOpt(props, '/dashboard') } />) :
                (<Login onAuthenticate={ this.handlerLogin.bind(this) }/>)
              }/>
              <Route path="/dashboard"
              render={props => this.state.logged ?
                (<Dashboard role={Roles.ADMIN} />) :
                (<Redirect to={redirectOpt(props, '/login')} />)
              }/>
          </Container>
        </BrowserRouter>
      </div>
    );
  }
}
