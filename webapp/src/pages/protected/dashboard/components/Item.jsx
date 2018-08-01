import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types';

const getColor = grade => {
    if (grade < 30) {
        return 'danger';
    } else if (grade < 60) {
        return 'warning';
    }
};

export default class Item extends Component{
    constructor() {
        super();
        this.state = {
            isOpen: false
        }
        this.toggle = this.toggle.bind(this);
    }

    static propTypes = {
        element: PropTypes.object.isRequired,
        modal: PropTypes.func.isRequired
    }

    toggle() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        const { element, modal } = this.props;
        const { isOpen } = this.state;
        const Modal = modal;
        return (
            <div>
                <ListGroupItem color={getColor(element.grade)} onClick={this.toggle} action>
                    {element.name}
                </ListGroupItem>
                {modal ? (<Modal element={element} isOpen={isOpen} toggle={this.toggle} />) : null}
            </div>
        );
    }
}