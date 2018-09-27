import React from 'react';
import './checkbox.css';

export default ({ value, label, disabled, checked, onChange}) => (
    <label className="control control--checkbox">{label}
        <input type="checkbox" value={value} disabled={disabled} checked={checked} onChange={onChange}/>
        <div className="control__indicator"></div>
    </label>
)