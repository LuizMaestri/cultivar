import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { deleteRequest } from '../../../../utils/http';
import { FaTrash } from 'react-icons/fa';

export default class extends Component {

    static propTypes = {
        typeEvent: PropTypes.object.isRequired,
        afterDelete: PropTypes.func.isRequired
    }

    handlerDelete() {
        const { project, afterDelete } = this.props;
        deleteRequest(
            `/project/${project.codProject}`,
            afterDelete
        )
    }

    render() {
        const { project } = this.props;
        return (
            <tr>
                <td>
                    <strong>
                        {project.name}
                    </strong>
                </td>
                <td>
                    <strong>
                        {new Date(project.start).toLocaleDateString()}
                    </strong>
                </td>
                <td>
                    <strong>
                        {new Date(project.end).toLocaleDateString()}
                    </strong>
                </td>
                <td>
                    <FaTrash style={{ cursor: 'pointer' }} color="red" onClick={this.handlerDelete.bind(this)} />
                </td>
            </tr>
        );
    }
}