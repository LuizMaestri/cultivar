import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { deleteRequest } from '../../../../../utils/http';
import { Row, Col, ListGroupItem } from 'reactstrap';
import { FaTrash } from 'react-icons/fa';
import Details from './Details.jsx';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            isOpen: false
        }
        this.handlerDelete = this.handlerDelete.bind(this);
        this.handlerDetails = this.handlerDetails.bind(this);
    }

    static propTypes = {
        company: PropTypes.object.isRequired,
        afterDelete: PropTypes.func.isRequired
    }

    handlerDelete(){
        const { company, afterDelete } = this.props;
        deleteRequest(`/company/${company.cnpj}`, afterDelete);
    }

    handlerDetails(){
        const { isOpen } = this.state; 
        this.setState({ isOpen: !isOpen });
    }

    render(){
        const { company } = this.props;
        const { isOpen } = this.state;
        return (
            <ListGroupItem key={company.cnpj}>
                <Row>
                    <Col md="10" onClick={this.handlerDetails} style={{ cursor: 'pointer' }}>
                        {company.name}
                    </Col>
                    <Col>
                        <FaTrash style={{ cursor: 'pointer' }} color="red" onClick={this.handlerDelete} />
                    </Col>
                </Row>
                {
                    isOpen ? <Details cnpj={company.cnpj} isOpen={isOpen} close={this.handlerDetails}/> : null
                }
            </ListGroupItem>
        );
    }
}