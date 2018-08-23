import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Status } from '../../../../model';
import { FileInput } from '../../../../components';
import { Row, Col } from 'reactstrap';
import FormData from 'form-data';
import { putRequest } from '../../../../utils/http';
import { saveObject } from '../../../../utils/storage';

export default class extends Component{

    static porpTypes = {
        user : PropTypes.object
    }

    constructor(props){
        super(props);
        this.state = {
            user: props.user
        }
    }

    handlerFile(event){
        const { id } = this.props.user;
        const file = event.target.files[0];
        if (file){
            let form = new FormData();
            form.append('file', file);
            putRequest(`/volunteer/${id}/tr`, form, ()=>{
                const { user } = this.props;
                user.status = Status.WAIT_TV;
                saveObject('user', user);
                this.setState({user});
            });
        }
        
    }

    render(){
        const { user } = this.state;
        if(user.status === Status.WAIT_TR)
            return (
                <Row>
                    <Col md="6 offset-3">
                        <p className="text-center">
                            <small className="text-danger" style={{width: '100%'}}>O Termo de Responsabilidade ainda não foi submetido.</small>
                        </p>
                        <Row>
                            <Col>
                                <a href="tr.pdf" download="Termo de Responsabilidade.pdf" className="btn btn-info">Termo de Responsabilidade</a>
                            </Col>
                            <Col>
                                <FileInput color="primary" className="float-right" onChange={this.handlerFile.bind(this)} label="Submeter a aprovação"/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            );
        else
            return (null);
    }
}