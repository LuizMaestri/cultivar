import React, { Component } from 'react';
import { FaTrash } from 'react-icons/fa';
import { deleteRequest } from '../../../utils/http';

export default class extends Component {
    delete() {
        const { id } = this.props.element;
        window.confirm(`Tem certeza de deseja deletar o registro ${id}?`) &&
            deleteRequest('/place/' + id)
                .then(this.props.onDelete)
                .catch(() => alert('Problemas ao deletar registro: ' + id));
    }
    render() {
        const { element, mapping, headers } = this.props;
        return (
            <tr style={{ cursor: 'pointer' }}>
                {
                    headers.map(
                        header => (
                            <td key={header} onClick={() => alert(element)}>
                                {element[mapping[header]]}
                            </td>
                        )
                    )
                }
                <td onClick={this.delete.bind(this)}>
                    <FaTrash color="red" />
                </td>
            </tr>
        );
    }
}