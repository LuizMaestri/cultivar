import React from 'react';
import { FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import Required from '../Required.jsx'
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';

const Option = ({label, type, onChange, required, invalidMessage, ...rest}) => (
    <FormGroup check>
        <Label check>
            <Input type={type} onChange={onChange} {...rest}/>
            {' ' + label}
            {required? <Required/>: null}
        </Label>
        <FormFeedback>{invalidMessage}</FormFeedback>
    </FormGroup>
);

Option.propTypes = {
    label: PropTypes.string.isRequired,
    invalidMessage: requiredIf(PropTypes.string, props => props.required),
    type: PropTypes.oneOf(['checkbox', 'radio']),
    required: PropTypes.bool,
};

Option.defaultProps = {
    type: 'radio',
};

export default Option;