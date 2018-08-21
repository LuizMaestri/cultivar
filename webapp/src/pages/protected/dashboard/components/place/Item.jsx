import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlaceModal from './Modal.jsx';
import Item from '../Item.jsx';
import { getRequest } from '../../../../../utils/http';
import axios from 'axios';

const request = url => getRequest(url, res => res.data)

export default class CompanyItem extends Component{
    static propTypes = {
        place: PropTypes.object.isRequired
    };
    constructor(props){
        super(props);
        this.state = {
            place: props.place
        }
    }

    beforeToggle(isOpen){
        const { place } = this.state;
        const userId = place.responsible.id;
        const addressId = place.address.id;
        if(!isOpen){
            axios.all([request('user/' + userId), request('address/' + addressId)])
                .then(res => {
                    place.responsible = res[0];
                    place.address = res[1]
                    this.setState({ place });
                });
        }
    }

    render(){
        return(
            <Item modal={PlaceModal} element={this.state.place} beforeToggle={this.beforeToggle.bind(this)}/>
        )
    }
}