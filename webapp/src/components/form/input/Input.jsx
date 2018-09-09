import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import Required from '../Required.jsx'
import requiredIf from 'react-required-if';

const FormInput = ({ id, label, type, placeholder, invalidMessage, required, children, ...rest}) => (
    <FormGroup>
        <Label for={id}>{label}{required ? <Required/> : null}</Label>
        <Input id={id} type={type} placeholder={placeholder} {...rest}>
            {children}
        </Input>
        <FormFeedback>{invalidMessage}</FormFeedback>
    </FormGroup>
);

FormInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    invalidMessage: requiredIf(PropTypes.string, props => props.required),
    type: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    children: requiredIf(PropTypes.node, props => props.type==='select')
};

FormInput.defaultProps ={
    type: 'text',
};

export default FormInput;