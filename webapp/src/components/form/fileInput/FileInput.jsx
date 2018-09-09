import React from 'react';
import PropTypes from 'prop-types';
import { Input, Label } from 'reactstrap';
import './fileInput.css'

const FileInput =  ({label, onChange, className, color, ...rest}) => (
    <Label className={`btn btn-${color} ${className}`}>
        <Input type="file" name="file" onChange={onChange} {...rest}/>
        {label}
    </Label>
);

FileInput.propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    color: PropTypes.oneOf([
        'primary',
        'success',
        'info',
        'warning',
        'danger'
    ])
};

FileInput.defaultProps = {
    color: 'info'
};

export default FileInput;