import React, { Component } from 'react';
import Company from '../../../../../model/company';
import PropTypes from 'prop-types';
import { postRequest } from '../../../../../utils/http';
import { Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Wizard, Input, MaskInput, DatePicker } from '../../../../../components';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            evaluate: null
        };
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }
    
    static propTypes = {
        afterSubmit: PropTypes.func.isRequired,
        isOpen: PropTypes.bool.isRequired,
        close: PropTypes.func.isRequired
    }

    handlerSubmit(){
        const { afterSubmit, close } = this.props;
        const { evaluate } = this.state;
        postRequest(
            '/company',
            evaluate,
            () => {
                afterSubmit();
                close();
            }
        );
    }

    render(){
        const { close, isOpen } = this.props;
        const { evaluate } = this.state;
        return (
            <Modal isOpen={isOpen} toggle={close}>
                <ModalHeader toggle={close}>Avaliação</ModalHeader>
                <ModalBody>
                    <Wizard onCancel={close} submitLabel="cadastrar" onSubmit={this.handlerSubmit}>
                        <div>
                            <h3></h3>
                            <hr className="row"/>
                        </div>
                    </Wizard>
                </ModalBody>
            </Modal>
        );
    }
}