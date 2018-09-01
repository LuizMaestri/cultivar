import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import Input from '../input';
import './datePicker.css';

const DatePicker = ({ id, label, placeholder, invalidMessage, required, ...rest}) => (
    <Input id={id} type="date" label={label} placeholder={placeholder} invalidMessage={invalidMessage} required={required} {...rest}/>
);

DatePicker.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    invalidMessage: requiredIf(PropTypes.string, props => props.required),
    placeholder: PropTypes.string,
    required: PropTypes.bool
};

DatePicker.defaultProps = {
    placeholder: 'DD/MM/AAAA',
};

export default DatePicker;