import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { getRequest } from '../../../../../utils/http';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            company: null
        }
    }

    componentWillMount(){
        const { cnpj } = this.props;
        getRequest(`/company/${cnpj}`, res => this.setState({ company: res.data }));
    }

    render(){
        const { company } = this.state;
        if (company){
            const { responsible } = company;
            return (
                <Row style={{textAlign: 'center'}}>
                    <Col>
                        <h2>
                            Aguarde resposta de sua empresa, para mais informações entre em contato com 
                            <br/>
                            <strong>{responsible.name}</strong>
                        </h2>
                    </Col>
                </Row>
            );
        } else {
            return null;
        }
    }
}