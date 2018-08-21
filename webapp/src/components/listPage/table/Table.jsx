import React, { Component } from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';

export default class extends Component{
    
    static propsTypes = {
        elements: PropTypes.array.isRequired,
        component: PropTypes.any.isRequired,
        noneMessage: PropTypes.string.isRequired,
        headers: PropTypes.array.isRequired,
        mapping: PropTypes.object.isRequired,
        onClick: PropTypes.func,
        onDelete: PropTypes.func,
        onEdit: PropTypes.func
    };

    render(){
        const { 
            headers,
            mapping,
            onClick,
            elements,
            noneMessage,
            onDelete,
            onEdit
        } = this.props;
        const LineTag = this.props.component;

        return (
            <Table hover striped>
                <thead>
                    <tr>
                        {headers.map(header => (<th key={header}>{ header }</th>)) }
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        elements.length > 0 ?
                            elements.map(element => (<LineTag element={element} onClick={onClick} headers={headers} mapping={mapping} key={element.id} onDelete={onDelete} onEdit={onEdit}/>)) :
                            (
                                <tr>
                                    <td colSpan={headers.length + 1} style={ { width:'100%' } }>
                                        {noneMessage}
                                    </td>
                                </tr>
                            )
                    }
                </tbody>
            </Table>
        )
    }
}