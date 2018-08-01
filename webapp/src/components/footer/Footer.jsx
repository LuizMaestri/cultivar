import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import logo from './logo.svg'
import './footer.css';

export default () => (
    <footer className="footer">
        <Container>
            <Row>
                <Col>
                    <span className="text-muted">Powered by <img className="react-logo" src={logo} alt="React"/></span>
                </Col>
            </Row>
        </Container>
    </footer>
);