import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { FaPlus } from 'react-icons/fa';
import Form from './Form.jsx';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            isOpen: false
        };
    }

    static propTypes = {
        afterSubmit: PropTypes.func.isRequired
    }

    handlerAdd(){
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    }

    render(){
        const { isOpen } = this.state;
        const { afterSubmit } = this.props;
        return (
            <div>
                <Button type="button" color="primary" onClick={this.handlerAdd.bind(this)}>
                    <FaPlus />
                </Button>
                <Form isOpen={isOpen} afterSubmit={afterSubmit} close={this.handlerAdd.bind(this)}/>
            </div>
        );
    }
}