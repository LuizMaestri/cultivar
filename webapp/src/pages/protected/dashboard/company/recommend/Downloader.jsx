import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { saveAs } from 'file-saver/FileSaver';
import axios from 'axios';

export default class extends Component{

    handlerDownload(){
        const { cpf, codAttachment, name } = this.props;
        axios(`/volunteer/${cpf}/attachment/${codAttachment}`, {
            method: 'GET',
            responseType: 'blob' //Force to receive data in a Blob Format
        }).then(res =>{
            const file = new Blob(
                [res.data], 
                {type: 'application/pdf'}
            );
            saveAs(file, `${name}.pdf`);
        });
    }

    render(){
        const { name } = this.props;
        return (
            <Row>
                <Col md="9">
                    <Button onClick={this.handlerDownload.bind(this)}>{name}</Button>
                </Col>
            </Row>
        );
    }
}