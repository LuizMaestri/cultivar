import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import ListAttachment from './attachment';
import ListQuestion from './question';
import ListEventType from './eventType';
import ListProject from './project';
import { Roles } from '../../../model';

const Hr = () => (
    <Fragment>
        <br />
        <hr />
        <br />
    </Fragment>
);

export default ({role}) => {
    if(role === Roles.ADMIN){
        return (
            <Row>
                <Col md="1" />
                <Col>
                    <Row style={{height: '400px', maxHeight: '400px'}}>
                        <Col>
                            <ListProject />
                        </Col>
                        <Col md="1" />
                        <Col>
                            <ListEventType />
                        </Col>
                    </Row>
                    <Hr/>
                    <Row style={{ height: '400px', maxHeight: '400px' }}>
                        <Col>
                            <ListAttachment />
                        </Col>
                    </Row>
                    <Hr/>
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