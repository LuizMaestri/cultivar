// @flow
import React, { Component } from 'react';
import { Header, Footer } from './components';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { Dashboard, Login, Register, Admin } from './pages';
import { User } from './model';
import { getAsObject, saveObject } from './utils/storage';
import './App.css';

export default class App extends Component {
	constructor(){
		super();
		const user = getAsObject('user'); 
		this.state = {
			logged: getAsObject('logged'),
			user: user ? user : new User()
		};
		this.handlerLogin = this.handlerLogin.bind(this);
  	}

	handlerLogin(user){
		saveObject('user', user);
		saveObject('logged', true);
		this.setState({ logged: true, user });
	}

	render() {
		const { logged, user } = this.state;
		return (
			<BrowserRouter>
				<div>
					<Header role={user.role} logged={logged} name={user.name}/>
					<Container style={{ margin: '3% 0' }} fluid>
						<Row>
							<Col>
								<Route path="/dashboard" render={() => (<Dashboard cpf={user.cpf} role={user.role}/>)}/>
								<Route path="/login" render={() => <Login logged={logged} afterLogin={this.handlerLogin}/>}/>
								<Route path="/cadastrar" render={() => <Register afterSubmit={this.handlerLogin}/>}/>
								<Route path="/admin" render={()=> <Admin role={user.role}/>}/>
								<Route exact path="/" render={() => <Redirect to="/login"/>}/>
							</Col>
						</Row>
					</Container>
					<Footer/>
				</div>
			</BrowserRouter>
		);
  	}
}
