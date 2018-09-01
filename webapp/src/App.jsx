// @flow
import React, { Component } from 'react';
import { Header, Footer } from './components';
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap';
import { Dashboard } from './pages';
import { Roles } from './model';
import './App.css';

export default class App extends Component {
	constructor(){
		super();
		this.state = {};
  	}

	handlerLogin(){}

	render() {
		return (
			<BrowserRouter>
				<div>
					<Header/>
					<br/>
					<Container fluid>
						<Row>
							<Col>
								<Dashboard role={Roles.ADMIN}/>
							</Col>
						</Row>
					</Container>
					<br/>
					<Footer/>
				</div>
			</BrowserRouter>
		);
  	}
}
