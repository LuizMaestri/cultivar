// @flow
import React, { Component } from 'react';
import { Header, Footer } from './components';
import { BrowserRouter } from 'react-router-dom'
import { Route, Redirect } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap';
import { Dashboard, Login, Register } from './pages';
import { User } from './model';
import { getAsObject, saveObject } from './utils/storage';
import './App.css';

export default class App extends Component {
	constructor(){
		super();
		const user = getAsObject('user')
		this.state = {
			logged: false,
			user: user ? user : new User()
		};
		this.handlerLogin = this.handlerLogin.bind(this);
  	}

	handlerLogin(user){
		saveObject('user', user);
		this.setState({ logged: true, user });
	}

	render() {
		const { logged, user } = this.state;
		return (
			<BrowserRouter>
				<div>
					<Header/>
					<Container style={{ margin: '3% 0' }} fluid>
						<Row>
							<Col>
								<Route path="/dashboard" render={() => (<Dashboard cpf={user.cpf} role={user.role}/>)}/>
								<Route path="/login" render={() => <Login logged={logged} afterLogin={this.handlerLogin}/>}/>
								<Route path="/cadastrar" render={() => <Register afterSubmit={this.handlerLogin}/>}/>
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
