import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from 'reactstrap';
import {  getRequest } from '../../../../utils/http';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            isOpen: false,
            trainings: []
        };
        this.handlerTrainings = this.handlerTrainings.bind(this);
    }

    static propTypes = {
        type: PropTypes.number.isRequired
    }

    handlerTrainings(){
        const { isOpen } = this.state;
        const { type } = this.props;
        if (!isOpen){
            getRequest(
                `/typeEvent/${type}/trainings`,
                res => this.setState({ isOpen: !isOpen, trainings: res.data })
            );
        } else {
            this.setState({ isOpen: !isOpen, trainings: [] });
        }
    }

    render(){
        const { isOpen, trainings } = this.state;
        const { type } = this.props;
        return (
            <Fragment>
                <Button id={`type-${type}`} type="button" color="info" onClick={this.handlerTrainings}>Anexos</Button>
                { isOpen && <Tooltip target={`type-${type}`} isOpen={isOpen}>
                    {
                        trainings.map(
                            (training, index) => (
                                <Fragment>
                                    { index + 1 } º -  { training.name}
                                    <br/>
                                </Fragment>
                            )
                        )
                    }
                    </Tooltip> }
            </Fragment>
        );
    }
}