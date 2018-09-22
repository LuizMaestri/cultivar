import React from 'react';
import { Redirect } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import ListAttachment from './attachment';
import ListQuestion from './question';
import { Roles } from '../../../model';

export default ({role}) => {
    if(role === Roles.ADMIN){
        return (
            <Row>
                <Col md="1" />
                <Col>
                    <Row style={{height: '400px', maxHeight: '400px'}}>
                        <Col>
                            <ListAttachment />
                        </Col>
                        <Col md="1" />
                        <Col>
                            <ListAttachment />
                        </Col>
                    </Row>
                    <br/>
                    <hr/>
                    <br/>
                    <Row style={{maxHeight: '400px' }}>
                        <Col>
                            <ListQuestion />
                        </Col>
                    </Row>
                </Col>
                <Col md="1" />
            </Row>
        )
    }
    return <Redirect to="/dashboard"/>
};