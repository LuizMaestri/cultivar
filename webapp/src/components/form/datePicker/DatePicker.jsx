import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import './datePicker.css';

const Picker = props => (
    <FormGroup>
        <Label for={props.id}>{props.label}</Label>
        <Input id={props.id} type="date" max={new Date().toISOString().substr(0, 10)} 
            placeholder={props.placeholder ? props.placeholder : "DD/MM/AAAA"} onChange={props.onChange} {...props.err} />
        <FormFeedback>{props.errMessage}</FormFeedback>
    </FormGroup>
);

Picker.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    errMessage: PropTypes.string.isRequired,
    err: PropTypes.object.isRequired,
    format: PropTypes.string,
    onChange: PropTypes.func
};

export default Picker;