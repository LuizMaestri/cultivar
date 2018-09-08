import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import { Wizard } from '../../../../components';
import { getRequest } from '../../../../utils/http';
import formatter from '../../../../utils/formatter';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            volunteer : null
        };
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }

    componentWillMount(){
        const { cpf } = this.props;
        getRequest(`/volunteer/${cpf}`, res => this.setState({ volunteer: res.data }));
    }

    handlerSubmit(){}

    render(){
        const { volunteer } = this.state;
        const { close, isOpen } = this.props;
        if(volunteer){
            const { user } = volunteer;
            return (
                <Modal toggle={close} isOpen={isOpen} >
                    <ModalHeader toggle={close}>
                        {user.name} -
                        <small>
                            {formatter.cpf(user.cpf)}
                        </small>
                    </ModalHeader>
                    <ModalBody>
                        <Wizard onCancel={close} submitLabel="Recomendar" onSubmit={this.handlerSubmit}>
                            <div>
                                <hr/>
                            </div>
                            <div>
                                <hr/>
                            </div>
                        </Wizard>
                    </ModalBody>
                </Modal>
            );
        } 
        return (null);
    }
}