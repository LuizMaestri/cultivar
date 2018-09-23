import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { deleteRequest } from '../../../../utils/http';
import { FaTrash } from 'react-icons/fa';
import Trainings from './Trainings.jsx';

export default class extends Component{

    static propTypes = {
        typeEvent: PropTypes.object.isRequired,
        afterDelete: PropTypes.func.isRequired
    }

    handlerDelete(){
        const { typeEvent, afterDelete } = this.props;
        deleteRequest(
            `/typeEvent/${typeEvent.type}`,
            afterDelete
        )
    }

    render(){
        const { typeEvent } = this.props;
        return (
            <Fragment>
                <tr>
                    <td>
                        <strong>
                            {typeEvent.name}
                        </strong>
                    </td>
                    <td>
                        <Trainings type={typeEvent.type}/>
                    </td>
                    <td>
                        <FaTrash style={{ cursor: 'pointer' }} color="red" onClick={this.handlerDelete.bind(this)} />
                    </td>
                </tr>
            </Fragment>
        );
    }
}