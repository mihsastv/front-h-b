import React, { Component } from 'react';
import { ListGroup } from 'bootstrap-4-react';
import { Button, Row, Col } from 'bootstrap-4-react';
import { connect } from "react-redux";
import moment from "moment";
import { deletedBooking } from "../redux/action";

const style = {
        textAlign: 'left',
        right: '0',
        Button: {
                textAlign: 'Left',
        }
}

class Booking extends Component {
    onDelete(event) {
        this.props.deleteCalendar(event.target.value)

    }
    render () {
        return (
            <ListGroup>
                <ListGroup.Item active>Бронирования в текущем месяце
                </ListGroup.Item>
                    {this.props.state.map((e, idx) => {
                            return (
                                <ListGroup.Item key={idx} style={style} border="primary">
                                    <Row>
                                        <Col md="10" mb="3" >
                                            <b>c </b> {moment(e.dateFrom, 'YYYY-MM-DD').format('DD.MM.YYYY')}
                                            <b> по </b> {moment(e.dateTo, 'YYYY-MM-DD').format('DD.MM.YYYY')}
                                        </Col>
                                        <Col md="2" mb="3">
                                            <Button value={e._id} danger outline onClick={this.onDelete.bind(this)}>Удалить</Button>
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
        state: state.carsCalendar
    }
}

function mapDispatchToProps(dispatch) {
    return{
        deleteCalendar: (id) => dispatch(deletedBooking(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Booking);
