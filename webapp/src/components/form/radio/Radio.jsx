import React from 'react';
import './radio.css';

export default ({ value, label, name, disabled, checked, onChange}) => (
    <label className="control control--radio">{label}
        <input type="radio" name={name} value={value} disabled={disabled} checked={checked} onChange={onChange}/>
        <div className="control__indicator"></div>
    </label>
)