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

    getLabel() {
        const { ratings, rating } = this.props.volunteer;
        const lastRating = ratings[0];
        let className, text;
        if (lastRating) {
            if (rating < 40 || lastRating.grade < 40) {
                className = 'danger';
            } else if (rating < 70) {
                className = 'warning';
            } else {
                className = 'success';
            }
        } else {
            className = 'secondary';
            text = 'Ainda não há avaliações';
        }

        return (
            <Label className={`btn btn-${className}`} style={{ cursor: 'default', width: 'inherit', height: '40px' }}>
                {text}
            </Label>
        );
    }

    render(){
        const { volunteer, afterDelete } = this.props;
        const { user } = volunteer;
        const { openDetails, openForm } = this.state;
        return (
            <tr>
                <td style={ {width: '15%'}}>{ formatter.cpf(user.cpf) }</td>
                <td style={{ maxWidth: '130px' }}>{ user.name }</td>
                <td style={{ maxWidth: '115px' }}>
                    <Label className={`btn btn-${user.status === Status.WAIT_COMPANY ? 'warning': 'info'}`} style={{ color: 'white', cursor: 'default', whiteSpace: 'unset'}}>
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
                <td style={{ width: user.status === Status.WAIT_COMPANY ? '60px': '200px' }}>
                    {
                        user.status === Status.WAIT_COMPANY ? (
                            <div>
                                <Button type="button" color="info" onClick={this.toggleRecommend}>
                                    Recomendar
                                </Button>
                                {
                                    openForm && (
                                        <Recommend close={this.toggleRecommend} cpf={user.cpf} isOpen={true} afterSubmit={afterDelete}/>
                                    )
                                }
                            </div>
                        ) : this.getLabel()
                    }
                </td>
                <td style={{maxWidth: '15px'}}>
                    <FaTrash style={{ cursor: 'pointer' }} color="red" onClick={this.handlerDelete} />
                </td>
            </tr>
        );
    }
}