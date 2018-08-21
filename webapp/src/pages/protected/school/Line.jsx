import React, { Component } from 'react';
import { FaTrash } from "react-icons/fa";

export default class extends Component {
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
                <td onClick={() => alert('hahaha')}>
                    <FaTrash color="red" />
                </td>
            </tr>
        );
    }
}