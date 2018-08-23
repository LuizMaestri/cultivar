import React from 'react';
import { Input, Label } from 'reactstrap';
import './fileInput.css'

const FileInput =  ({label, onChange, className, color}) => (
    <Label className={`btn btn-${color} ${className}`}>
        <Input type="file" name="file" onChange={onChange} />
        {label}
    </Label>
);

export default FileInput;