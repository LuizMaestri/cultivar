import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { ClipLoader } from 'react-spinners';
import { FileInput } from '../../../../../components';
import { postRequest, getRequest } from '../../../../../utils/http';

export default class extends Component{
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
        const { attachment, cpf } = this.props;
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
                    this.props.afterUpload(attachment.codAttachment);
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