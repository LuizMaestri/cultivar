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
        const { evaluate, codSchool, afterSubmit } = this.props;
        const { isOpen } = this.state
        console.log(evaluate)
        return (
            <Fragment>
                <Row>
                    <Col>
                        <Button color="primary" style={{ width: 'inherit', height: '40px' }} onClick={this.toggle}>
                            {evaluate.title}
                        </Button>
                    </Col>
                </Row>
                {isOpen && <Form codSchool={codSchool} code={evaluate.codEvent | evaluate.codProject} afterSubmit={afterSubmit} isOpen={isOpen} close={this.toggle} isProject={evaluate.isProject}/>}
                <br />
            </Fragment>
        )
    }
}