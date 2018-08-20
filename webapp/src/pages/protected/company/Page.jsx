import React, { Component } from 'react';
import { ListPage } from '../../../components';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { getRequest } from '../../../utils/http';
import Line from './Line.jsx';
import Form from './Form.jsx'

const headers = ['CNPJ', 'Nome', 'Status']
const mapping = {
    CNPJ: 'id',
    Nome: 'name',
    Status: 'status'
}


export default class CompanyList extends Component {

    constructor() {
        super();
        this.state = {
            companies: [],
            open: false
        };
        this.toggle = this.toggle.bind(this);
    }

    componentWillMount() {
        getRequest(
            '/place/company',
            res => this.setState({ companies: res.data }),
            () => { }
        )
    }

    toggle() {
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        return (
            <div>
                <ListPage title="Empresas Envolvidas" elements={this.state.companies}
                    headers={headers} mapping={mapping} addOnClick={this.toggle}
                    noneMessage="Nenhuma Empresa encontrada." component={Line} />
                <Modal isOpen={this.state.open} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Cadastrar Empresa</ModalHeader>
                    <ModalBody>
                        <Form toggle={this.toggle}/>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}