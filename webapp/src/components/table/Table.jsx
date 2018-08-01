import React, { Component } from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';

export default class extends Component{
    constructor(props){
        super(props);
    }

    static propsTypes = {
        elements: PropTypes.array,
        component: PropTypes.oneOfType(Component).isRequired,
        headers: PropTypes.array.isRequired,
        mapping: PropTypes.object.isRequired
    };

    render(){
        const { headers, mapping } = this.props;
        const LineTag = this.props.line;
        
        return (
            <Table hover striped>
                <thead>
                    { headers.map(header => (<th>{ header }</th>)) }
                </thead>
                <tbody>
                    { this.props.elements.map(element => (<LineTag element={element} {...{ headers, mapping }} />)) }
                </tbody>
            </Table>
        )
    }
}