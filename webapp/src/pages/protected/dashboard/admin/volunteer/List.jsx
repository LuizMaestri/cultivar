import React, { Component } from 'react';
import { getRequest } from '../../../../../utils/http';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';

export default class extends Component{
    constructor() {
        super()
        this.state = {
            volunteers: []
        }
    }

    componentWillMount() {
        getRequest('/volunteer', res => this.setState({ volunteers: res.data }));
    }



    render(){
        const { volunteers } = this.state;
        return (
            <div>
                <Row>
                    <Col>
                        <h3>Mentores Voluntários</h3>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <ListGroup>
                            {
                                volunteers.length ?
                                volunteers.map(volunteer => null) :
                                (
                                    <ListGroupItem>
                                            <strong>
                                                Nenhum Voluntário Cadastrado
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