import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { AttachmentUploader, AttachmentDownloader } from './Attachment.jsx';
import { getRequest } from '../../../../../utils/http';
import { Status } from '../../../../../model';

export default class extends Component{
    constructor() {
        super();
        this.state = {
            attachments: []
        }
    }

    componentWillMount() {
        getRequest(`/attachment/${Status.WAIT_STATEMENT}`, res => this.setState({ attachments: res.data }));
    }

    render(){
        const { attachments } = this.state;
        const { cpf, afterUpload } = this.props;
        return (
            <Row style={{textAlign: 'center'}}>
                <Col>
                    <Row>
                        <Col>
                            <a className="btn btn-info" target="_blank" rel="noopener noreferrer" href="http://www.computacaonaescola.ufsc.br/wp-content/uploads/2016/07/CnE_Politica_Protecao_Crianca_v10.pdf">
                                Politica Protecao Criança
                            </a>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        {
                            attachments.map(
                                attachment => (
                                    <Col key={attachment.codAttachment}>
                                        <Row>
                                            <Col>
                                                <AttachmentUploader cpf={cpf} attachment={attachment} afterUpload={afterUpload} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                {attachment.download && <AttachmentDownloader attachment={attachment}/>}
                                            </Col>
                                        </Row>
                                    </Col>
                                )
                            )
                        }
                    </Row>
                </Col>
            </Row>
        )
    }
}