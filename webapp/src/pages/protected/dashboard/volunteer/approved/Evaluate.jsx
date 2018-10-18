import React, { Component, Fragment } from 'react';
import { Row, Col, Button } from 'reactstrap';
import Form from './Form';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            isOpen : false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    }

    render(){
        const { evaluate, cpf, afterSubmit } = this.props;
        const { isOpen } = this.state
        return (
            <Fragment>
                <Row>
                    <Col>
                        <Button color="primary" style={{ width: 'inherit', height: '40px' }} onClick={this.toggle}>
                            {evaluate.title}
                        </Button>
                    </Col>
                </Row>
                {isOpen && <Form cpf={cpf} afterSubmit={afterSubmit} isOpen={isOpen} close={this.toggle}/>}
                <br />
            </Fragment>
        )
    }
}