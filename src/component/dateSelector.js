import React, {Component} from 'react';
import * as moment from 'moment'
import {Row, Col, Form, Button} from 'bootstrap-4-react';
import {setMonth} from "../redux/action";
import {connect} from "react-redux";

const date = moment().format('YYYY-MM-DD')

class DateSelector extends Component {

    onChangeMonth (event) {
        const m = new Date(event.target.value).getMonth();
        this.props.setMonth(m)
    }
    render() {
        return (
            <Row>
                <Col md="4" mb="3">
                    <label htmlFor="dateFrom">Дата начала</label>
                    <Form.Input
                        type="date"
                        id="dateFrom"
                        defaultValue={date}
                        onChange={this.onChangeMonth.bind(this)}
                        required/>
                    <Form.Feedback invalid>Valid first name is required.</Form.Feedback>
                </Col>
                <Col md="4" mb="3">
                    <label htmlFor="dateTo">Дата окончания</label>
                    <Form.Input
                        type="date"
                        id="dateTo"
                        defaultValue={date}
                        required/>
                    <Form.Feedback invalid>Valid last name is required.</Form.Feedback>
                </Col>
                <Col md="4" mb="3">
                    <Button primary lg block>Забронировать</Button>
                </Col>
            </Row>
        )

    }
}

function mapStateToProps(state) {
    return{
        months: state.months
    }
}

function mapDispatchToProps(dispatch) {
    return{
        setMonth: (id) => dispatch(setMonth(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DateSelector);
