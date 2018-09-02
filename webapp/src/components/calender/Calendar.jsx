import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar'
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import dates from 'react-big-calendar/lib/utils/dates'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

const { MONTH, WEEK, DAY } = BigCalendar.Views
const allViews = [MONTH, WEEK, DAY]

export default class extends Component{
    static propsTypes = {
        selectable: PropTypes.bool,
        events: PropTypes.array,
        onSelectEvent: requiredIf(PropTypes.func, props => props.selectable),
        onSelectSlot: PropTypes.func
    };
    static defaultProps = {
        events: [],
        onSelectEvent: () => null,
        onSelectSlot: () => null
    };
    render(){
        const { events, selectable, onSelectEvent, onSelectSlot, defaultView } = this.props;
        return (
            <BigCalendar
                selectable={selectable}
                onSelectEvent={onSelectEvent}
                onSelectSlot={onSelectSlot}
                events={events}
                defaultView={defaultView}
                views={allViews}
                max={dates.endOf(new Date(), 'day')}
                defaultDate={new Date()}
            />
        );
    }
}