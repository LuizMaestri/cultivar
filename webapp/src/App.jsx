// @flow
import React, { Component } from 'react';
import { Header, Footer } from './components';
import { BrowserRouter } from 'react-router-dom'
import { RedirectRoute, PrivateRoute, MissingRoute } from './components/route';
import { Route } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap';
import { getAsObject } from './utils/storage';
import { Roles } from './model';
import { Dashboard, Login, VolunterList, CompanyList, SchoolList, RegisterPage } from './pages';
import './App.css';

export default class App extends Component {
	constructor(){
		super();
		this.state = {
			logged: getAsObject('authenticated'),
			user: getAsObject('user')
		};
  	}

	handlerLogin(){
		debugger;
		this.setState({logged: true});
	}

	render() {
		const { logged, user } = this.state;
		return (
			<BrowserRouter>
				<div>
					<Header/>
					<br/>
					<Container fluid>
						<Row>
							<Col>
								<RedirectRoute path="/login" forward={!logged} to="/dashboard">
									<Login onAuthenticate={() => this.setState({ logged: true })} />
								</RedirectRoute>
								<PrivateRoute path="/dashboard" logged={logged}>
									<Dashboard user={user} role={user ? user.role: null} />
								</PrivateRoute>
								<PrivateRoute path="/voluntarios" logged={logged}>
									<VolunterList/>
								</PrivateRoute>
								<PrivateRoute path="/escolas" logged={logged} component={(null)}>
									<SchoolList/>
								</PrivateRoute>
								<PrivateRoute path="/empresas" logged={logged} component={(null)}>
									<CompanyList/>
								</PrivateRoute>
								<PrivateRoute path="/usuarios" logged={logged} component={(null)}>
									{null}
								</PrivateRoute>
								<PrivateRoute path="/profile" logged={logged} component={(null)}>
									{null}
								</PrivateRoute>
								<Route path="/cadastro" component={RegisterPage}/>
								<MissingRoute logged={logged}/>
							</Col>
						</Row>
					</Container>
					<Footer/>
				</div>
			</BrowserRouter>
		);
  	}
}
