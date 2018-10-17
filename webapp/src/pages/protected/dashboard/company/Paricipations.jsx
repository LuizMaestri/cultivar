import React, { Component, Fragment } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { getRequest } from '../../../../utils/http';
import { Address } from '../../../../model';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            visible: false,
            participations: []
        };
        this.toggle = this.toggle.bind(this)
    }

    toggle(){
        const { visible } = this.state;
        const { cpf } = this.props;
        if(!visible){
            getRequest(
                `volunteer/${cpf}/participations`,
                res => {
                    let participations = res.data.map(
                        participation => {
                            const { school } = participation;
                            const address = new Address();
                            Object.assign(address, participation);
                            return {
                                address, school
                            }
                        }
                    );
                    this.setState({ visible: true, participations });
                }
            )
        } else{
            this.setState({ visible: false })
        }
    }

    render(){
        const { cpf } = this.props;
        const { visible, participations } = this.state;
        const { length } = participations;
        return (
            <Fragment>
                <Button id={`volunteer-${cpf}`} color="info" onClick={this.toggle}>Locais</Button>
                <Popover placement="auto" isOpen={visible} target={`volunteer-${cpf}`} toggle={this.toggle}>
                    <PopoverHeader>Paticipações</PopoverHeader>
                    <PopoverBody>
                        {
                            length ?
                                participations.map(
                                    (participation, index) => (
                                        <Fragment>
                                            {participation.school} -> {participation.address.toString()}
                                            {index !== length-1 && <hr/>}
                                        </Fragment>
                                    )
                                ) : <strong>Este voluntário ainda não participou de nenhum evento pela CnE.</strong>
                        }
                    </PopoverBody>
                </Popover>
            </Fragment>
        );
    }
}