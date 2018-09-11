import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { ClipLoader } from 'react-spinners';
import { FileInput } from '../../../../../components';
import { postRequest, getRequest } from '../../../../../utils/http';
import { saveAs } from 'file-saver/FileSaver';
import axios from 'axios';

export class AttachmentUploader extends Component{
    constructor(){
        super();
        this.state = {
            loading: false,
            success: false
        }
        this.upload = this.upload.bind(this);
    }

    componentWillMount(){
        const { cpf, attachment } = this.props;
        const { codAttachment } = attachment;
        getRequest(`/volunteer/${cpf}/attachment/${codAttachment}`, res => this.setState({success: res.data.send}))
    }

    upload(event){
        const file = event.target.files[0];
        const { attachment, cpf, afterUpload } = this.props;
        if (file){
            this.setState({loading: true});
            const json = JSON.stringify(attachment);
            const blob = new Blob([json], {
                type: 'application/json'
            });
            let form = new FormData();
            form.append('attachment', blob);
            form.append('file', file);
            postRequest(
                `/volunteer/${cpf}/upload`,
                form,
                res => {
                    afterUpload(attachment.codAttachment);
                    this.setState({
                        loading: false,
                        success: true
                    });
                },
                () => this.setState({ loading: false, success: false })
            );
        }
    }

    render(){
        const { attachment } = this.props;
        const { loading, success } = this.state;
        return (
            <Row>
                <Col md="9">
                    <FileInput color={success ? 'success' : 'info'} label={attachment.name} onChange={this.upload} accept="application/pdf" disabled={loading || success}/>
                </Col>
                <Col md="2">
                    <ClipLoader sizeUnit="px" size={30} color="#007bff" loading={loading} />
                </Col>
            </Row>
        );
    }
}

export class AttachmentDownloader extends Component{

    handlerDownload(){
        const { codAttachment, name } = this.props.attachment;
        axios(`/attachment/${codAttachment}/download`, {
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
        const { attachment } = this.props;
        return (
            <Row>
                <Col md="9">
                    <Button onClick={this.handlerDownload.bind(this)}>{attachment.name}</Button>
                </Col>
            </Row>
        );
    }
}