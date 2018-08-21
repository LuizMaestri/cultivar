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
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            element: props.element
        }
        this.toggle = this.toggle.bind(this);
    }

    static propTypes = {
        element: PropTypes.object.isRequired,
        modal: PropTypes.func.isRequired,
        beforeToggle: PropTypes.func
    }

    toggle() {
        const { element, isOpen } = this.state;
        this.props.beforeToggle && this.props.beforeToggle(isOpen, element);
        this.setState({ isOpen: !isOpen, element });
    }

    render() {
        const { modal } = this.props;
        const { element, isOpen } = this.state;
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