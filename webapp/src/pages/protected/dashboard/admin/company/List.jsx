import React, { Component } from 'react';
import { getRequest } from '../../../../../utils/http';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import CompanyItem from './ListItem.jsx';
import Add from './Add.jsx';

export default class extends Component {
    constructor() {
        super()
        this.state = {
            companies: []
        }
    }

    componentWillMount() {
        getRequest('/company', res => this.setState({ companies: res.data }));
    }

    render() {
        const { companies } = this.state;
        return (
            <div>
                <Row>
                    <Col>
                        <h3>
                            Empresas Envolvidas
                        </h3>
                    </Col>
                    <Col md="2">
                        <Add afterSubmit={this.componentWillMount.bind(this)}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <ListGroup>
                            {
                                companies.length ? 
                                    companies.map(
                                        company => 
                                            <CompanyItem key={company.cnpj} company={company} afterDelete={this.componentWillMount.bind(this)}/>
                                    ) : (
                                        <ListGroupItem>
                                            <strong>
                                                Nenhuma Empresa Cadastrada
                                            </strong>
                                        </ListGroupItem>
                                    )
                            }
                        </ListGroup>
                    </Col>
                </Row>
            </div>
        );
    }
}