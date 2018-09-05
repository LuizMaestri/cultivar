import React from 'react';
import { Label } from 'reactstrap';
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';
import './switch.css';

export default ({ id, label, onChange}) => (
    <div>
        <Label for={id}>{label}</Label>
        <Switch id={id} onChange={onChange} checkedChildren="Sim" unCheckedChildren="Não" style={{width: '50px'}}/>
    </div>
)