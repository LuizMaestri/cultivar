import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import Required from '../Required.jsx'
import requiredIf from 'react-required-if';

export default class extends Component{
    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        invalidMessage: requiredIf(PropTypes.string, props => props.required),
        type: PropTypes.string,
        placeholder: PropTypes.string,
        required: PropTypes.bool,
        children: requiredIf(PropTypes.node, props => props.type === 'select')
    }

    static defaultProps = {
        type: 'text',
    }

    componentDidMount() {
        const { id, value } = this.props;
        document.getElementById(id).value = value;
    }

    render(){
        const { id, label, type, placeholder, invalidMessage, required, children, ...rest } = this.props
        return (
            <FormGroup>
                <Label for={id}>{label}{required ? <Required /> : null}</Label>
                <Input id={id} type={type} placeholder={placeholder} {...rest}>
                    {children}
                </Input>
                <FormFeedback>{invalidMessage}</FormFeedback>
            </FormGroup>
        );
    }
}