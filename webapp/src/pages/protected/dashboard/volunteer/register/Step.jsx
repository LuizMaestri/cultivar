import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import AttachmentUploader from './Attachment.jsx';
import { getRequest } from '../../../../../utils/http';
import { Status } from '../../../../../model';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            attachments: []
        }
    }

    componentWillMount(){
        getRequest(`/attachment/${Status.REGISTER}`, res => this.setState({ attachments: res.data}));
    }

    render(){
        const { attachments } = this.state; 
        const { cpf, afterUpload } = this.props;
        if(cpf){
            return (
                <Row>
                    { 
                        attachments.map(
                            attachment => (
                                <Col key= { attachment.codAttachment }>
                                    <AttachmentUploader cpf={cpf} attachment={attachment} afterUpload={afterUpload}/>
                                </Col>
                            )
                        ) 
                    }
                </Row>
            );
        }
        return (null);
    }
}