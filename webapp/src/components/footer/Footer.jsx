import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import './footer.css';

export default () => (
    <footer className="footer">
        <Container>
            <Row>
                <Col>
                    <span className="text-muted">By Luiz Maestri</span>
                </Col>
            </Row>
        </Container>
    </footer>
);