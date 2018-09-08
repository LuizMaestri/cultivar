import React, { Component } from 'react';
import { Button, Label } from 'reactstrap';
import { FaTrash } from 'react-icons/fa';
import Details from './Details.jsx';
import Recommend from './Recommend.jsx'
import formatter from '../../../../utils/formatter';
import { deleteRequest } from '../../../../utils/http';
import { Status } from '../../../../model';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            openDetails: false,
            openForm: false
        };
        this.handlerDelete = this.handlerDelete.bind(this);
        this.toggleRecommend = this.toggleRecommend.bind(this);
        this.toggleDetails = this.toggleDetails.bind(this);
    }

    toggleRecommend(){
        const { openForm } = this.state;
        this.setState({ openForm: !openForm, openDetails: false });
    }

    toggleDetails() {
        const { openDetails } = this.state;
        this.setState({ openDetails: !openDetails, openForm: false });
    }

    handlerDelete(){
        const { volunteer, afterDelete } = this.props;
        const { user, company } = volunteer;
        deleteRequest(`/user/${user.cpf}`, () => afterDelete(company));
    }

    render(){
        const { volunteer } = this.props;
        const { user } = volunteer;
        const { openDetails, openForm } = this.state;
        return (
            <tr>
                <td style={ {width: '15%'}}>{ formatter.cpf(user.cpf) }</td>
                <td style={{ maxWidth: '130px' }}>{ user.name }</td>
                <td style={{ maxWidth: '115px' }}>
                    <Label className="btn btn-warning" style={{ color: 'white', cursor: 'default', whiteSpace: 'unset'}}>
                        { Status.translate(user.status) }
                    </Label>
                </td>
                <td style={{ width: '40px' }}>
                    <Button type="button" color="info" onClick={this.toggleDetails}>
                        Detalhes
                    </Button>
                    {
                        openDetails && (
                            <Details close={this.toggleDetails} openForm={openForm} cpf={user.cpf} isOpen={true} closeRecommend={this.toggleRecommend} deleteFunc={this.handlerDelete}/>
                        )
                    }
                </td>
                <td style={{ width: '60px' }}>
                    {
                        user.status === Status.WAIT_COMPANY && (
                            <div>
                                <Button type="button" color="info" onClick={this.toggleRecommend}>
                                    Recomendar
                                </Button>
                                {
                                    openForm && (
                                        <Recommend close={this.toggleRecommend} cpf={user.cpf} isOpen={true}/>
                                    )
                                }
                            </div>
                            
                        )
                    }
                </td>
                <td style={{maxWidth: '15px'}}>
                    <FaTrash style={{ cursor: 'pointer' }} color="red" onClick={this.handlerDelete} />
                </td>
            </tr>
        );
    }
}