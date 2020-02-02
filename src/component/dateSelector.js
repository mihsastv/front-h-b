import React, {Component} from 'react';
import * as moment from 'moment'
import {Row, Col, Form, Button, Alert, Container} from 'bootstrap-4-react';
import {addBooking, setMonth} from "../redux/action";
import {connect} from "react-redux";

const date = moment().format('YYYY-MM-DD')

class DateSelector extends Component {
    state = {
        al: false
    }

    onChangeDate (event) {
            if (isNaN(event.target.value)) {
                if (new Date(event.target.value).getFullYear() !== this.props.year) {
                    document.getElementById('dateFrom').value = event.target.value
                    document.getElementById('dateTo').value = event.target.value
                } else
                {
                    if (event.target.id === 'dateFrom')
                    {if (new Date(event.target.value).getMonth() !== new Date(document.getElementById('dateTo').value).getMonth()) {
                        document.getElementById('dateTo').value = event.target.value
                    } else {if (new Date(event.target.value)>new Date(document.getElementById('dateTo').value)) {
                        document.getElementById('dateTo').value = event.target.value
                    }}} else {
                        if (new Date(event.target.value).getMonth() !== new Date(document.getElementById('dateFrom').value).getMonth()) {
                            document.getElementById('dateFrom').value = event.target.value
                        } else {
                            if (new Date(event.target.value)<new Date(document.getElementById('dateFrom').value)) {
                                document.getElementById('dateFrom').value = event.target.value
                            }
                        }
                    }
                }
                this.props.setMonth({month: new Date(event.target.value).getMonth(), year: new Date(event.target.value).getFullYear()})
            }
    }

    onBooking () {
       let dateFrom=document.getElementById('dateFrom').value,
       dateTo=document.getElementById('dateTo').value,
       conflict=0;
       for (let i = new Date(dateFrom).getDate();
                i<new Date(dateTo).getDate()+1; ++i) {
           if (this.props.dates.indexOf(i) !== -1)
           {this.setState({al: true});
           ++conflict;
           window.setTimeout(()=>{this.setState({al: false})}, 3000)}
       }

       if (conflict === 0) {
           this.props.addBooking({dateFrom: dateFrom, dateTo: dateTo, currentCar: this.props.currentCar})
       }


    }

    render() {

        return (
            <Container shadow p="3">
                {this.state.al ? (<Row>
                    <Col md="12" mb="1">
                        <Alert danger>Выбранные даты заняты</Alert>
                    </Col>
                </Row>) : (null)
                }
                <Row alignItems="center">
                    <Col md="4">
                        <label htmlFor="dateFrom">Дата начала</label>
                        <Form.Input
                            type="date"
                            id="dateFrom"
                            defaultValue={date}
                            onChange={this.onChangeDate.bind(this)}
                            required/>
                    </Col>
                    <Col md="4">
                        <label htmlFor="dateTo">Дата окончания</label>
                        <Form.Input
                            type="date"
                            id="dateTo"
                            defaultValue={date}
                            onChange={this.onChangeDate.bind(this)}
                            required/>
                    </Col>
                    <Col md="4">
                        <Button primary sm block shadow p="3" onClick={this.onBooking.bind(this)}>Забронировать</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return{
        months: state.months,
        year: state.year,
        dates: state.dates,
        currentCar: state.currentCar
    }
}

function mapDispatchToProps(dispatch) {
    return{
        setMonth: (id) => dispatch(setMonth(id)),
        addBooking: (period) => dispatch(addBooking(period))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DateSelector);
