import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VolunteerModal from './Modal.jsx';
import Item from '../Item.jsx'

export default class VolunteerItem extends Component{
    static propTypes = {
        volunteer: PropTypes.object.isRequired
    };

    render(){
        return(
            <Item modal={VolunteerModal} element={this.props.volunteer}/>
        )
    }
}