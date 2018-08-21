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


export default class SchoolList extends Component {

    constructor() {
        super();
        this.state = {
            schools: [],
            open: false
        };
        this.toggle = this.toggle.bind(this);
    }

    componentWillMount() {
        getRequest(
            '/place/school',
            res => this.setState({ schools: res.data }),
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
                <ListPage title="Escolas Benificiadas" elements={this.state.schools}
                    headers={headers} mapping={mapping} addOnClick={this.toggle}
                    noneMessage="Nenhuma Escola encontrada." component={Line} onDelete={this.componentWillMount.bind(this)}/>
                <Modal isOpen={this.state.open} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Cadastrar Escola</ModalHeader>
                    <ModalBody>
                        <Form toggle={this.toggle}/>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}