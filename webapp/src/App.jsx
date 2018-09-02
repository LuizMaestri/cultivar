// @flow
import React, { Component } from 'react';
import { Header, Footer } from './components';
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap';
import { Dashboard, Login } from './pages';
import { User } from './model';
import './App.css';

export default class App extends Component {
	constructor(){
		super();
		this.state = {
			logged: false,
			user: new User()
		};
  	}

	handlerLogin(){
		this.setState({ logged: true });
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
								<Route path="/dashboard" render={() => (<Dashboard role={user.role}/>)}/>
								<Route path="/login" render={() => <Login logged={logged} afterLogin={this.handlerLogin}/>}/>
								<Route path="/cadastrar" render={() => null}/>
							</Col>
						</Row>
					</Container>
					<Footer/>
				</div>
			</BrowserRouter>
		);
  	}
}
