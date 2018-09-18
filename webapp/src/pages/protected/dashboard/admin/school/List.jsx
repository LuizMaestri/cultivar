import React, { Component } from 'react';
import { getRequest } from '../../../../../utils/http';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import SchoolItem from './ListItem.jsx';
import Add from './Add.jsx';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            schools: []
        };
        this.componentWillMount = this.componentWillMount.bind(this)
    }

    componentWillMount(){
        getRequest('/school', res => this.setState({ schools: res.data }));
    }

    render(){
        const { schools } = this.state;
        const { onSelectSchool } = this.props;
        return (
            <div>
                <Row>
                    <Col>
                        <h3>
                            Escola Beneficiadas
                        </h3>
                    </Col>
                    <Col md="2">
                        <Add afterSubmit={this.componentWillMount} />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <ListGroup>
                            {
                                schools.length ?
                                    schools.map(
                                        school =>
                                            <SchoolItem key={school.codSchool} onSelectSchool={onSelectSchool} school={school} afterDelete={this.componentWillMount} />
                                    ) : (
                                        <ListGroupItem>
                                            <strong>
                                                Nenhuma Escola Cadastrada
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