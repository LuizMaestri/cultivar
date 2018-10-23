import React, { Component } from 'react';
import { getRequest } from '../../../../../../../utils/http';
import { Row, Col } from 'reactstrap';
import { Switch } from '../../../../../../../components';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            others: []
        }
    }
}