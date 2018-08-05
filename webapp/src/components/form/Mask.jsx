import React from 'react';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';

const Mask = props => (
    <FormGroup>
        <Label for={props.id}>{props.label}</Label>
        <InputMask id={props.id} onChange={event => props.onChange(event)} mask={props.mask} maskChar="_" >
            {(inputProps) => <Input {...inputProps} type={props.type} placeholder={props.placeholder} {...props.err} />}
        </InputMask>
        <FormFeedback tooltip>{props.errMessage}</FormFeedback>
    </FormGroup>
);

Mask.propTypes = {
    id : PropTypes.string.isRequired,
    mask: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label : PropTypes.string.isRequired,
    errMessage: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    err: PropTypes.object,
    onChange: PropTypes.func
};

export default Mask;