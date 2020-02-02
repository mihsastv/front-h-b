import React, { Component } from 'react';
import { ListGroup } from 'bootstrap-4-react';
import { Button, Row, Col } from 'bootstrap-4-react';
import { connect } from "react-redux";
import moment from "moment";
import {deletedBooking, setMonth} from "../redux/action";
import './booking.css'

class Booking extends Component {
    onDelete(event) {
        this.props.deleteCalendar({id: event.target.value, months: this.props.months, year: this.props.year})
    }

    componentDidMount() {
        while (this.props.state.length !==0) {
            this.props.setMonth({month: new Date().getMonth(), year: new Date().getFullYear()})
        }

    }

    render () {
        return (
            <ListGroup className="style">
                <ListGroup.Item active>Данный автомобиль забронирован в следующие даты
                </ListGroup.Item>
                    {this.props.state.map((e, idx) => {
                            return (
                                <ListGroup.Item key={idx} border="primary">
                                    <Row className="rowStyle" alignItems="start">
                                        <Col md="8">
                                            <b>c </b> {moment(e.dateFrom, 'YYYY-MM-DD').format('DD.MM.YYYY')}
                                            <b> по </b> {moment(e.dateTo, 'YYYY-MM-DD').format('DD.MM.YYYY')}
                                        </Col>
                                        <Col md="4" alignSelf="center">
                                            <Button value={e._id} danger sm outline onClick={this.onDelete.bind(this)}>Отменить бронирование</Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )
                    })}
            </ListGroup>
        )
    }
}

function mapStateToProps(state) {
    return{
        state: state.carsCalendar,
        months: state.months,
        year: state.year
    }
}

function mapDispatchToProps(dispatch) {
    return{
        deleteCalendar: (data) => dispatch(deletedBooking(data)),
        setMonth: (id) => dispatch(setMonth(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Booking);
