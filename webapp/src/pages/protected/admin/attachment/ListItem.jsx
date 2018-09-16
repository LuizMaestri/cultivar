import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { deleteRequest } from '../../../../utils/http';
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
        attachment: PropTypes.object.isRequired,
        afterDelete: PropTypes.func.isRequired
    }

    handlerDelete(){
        const { attachment, afterDelete } = this.props;
        deleteRequest(
            `/attachment/${attachment.codAttachment}`,
            afterDelete
        )
    }

    handlerDetails(){
        const { isOpen } = this.state; 
        this.setState({ isOpen: !isOpen });
    }

    render(){
        const { attachment } = this.props;
        const { isOpen } = this.state;
        return (
            <Fragment>
                <tr>
                    <td onClick={this.handlerDetails} style={{ cursor: 'pointer' }}>
                        <strong>
                            {attachment.name}
                        </strong>
                    </td>
                    <td onClick={this.handlerDetails} style={{ cursor: 'pointer' }}>
                        <strong>
                            {attachment.required ? "Sim" : "Não"}
                        </strong>
                    </td>
                    <td>
                        <FaTrash style={{ cursor: 'pointer' }} color="red" onClick={this.handlerDelete} />
                    </td>
                </tr>
                {
                    isOpen ? <Details attachment={attachment} isOpen={isOpen} close={this.handlerDetails}/> : null
                }
            </Fragment>
        );
    }
}