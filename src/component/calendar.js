import React, { Component } from 'react';
import { Container, Row, Col, BDiv } from 'bootstrap-4-react';
import { getCars, getCarsCalendar } from "../redux/action";
import { connect } from "react-redux";
import './calendar.css'

const days = ['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС']
const month = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Ноябрь','Декабрь'];

function getDay(date) { // получить номер дня недели, от 0 (пн) до 6 (вс)
    let day = date.getDay();
    if (day === 0) day = 7; // сделать воскресенье (0) последним днем
    return day - 1;
}

function renderTable(year, mon, dates) {
    let day = 0,
        busy = false,
        d = new Date(year, mon),
        count =[];

    for (let i=0; i<6; i++) {count.push(i)}

    return count.map (ind=>{
        return (
            <Row key={ind}>
                {days.map((item, ind) => {
                    if (d.getMonth() === mon)
                    {if (ind === getDay(d))
                        {busy=false
                            d.setDate(d.getDate() + 1);
                            if (dates.indexOf(day+1) !== -1) {busy=true};
                            day += 1;
                        }
                    else {day = 0}}
                    else {day = 0}
                    return <Col rounded key={ind+100} className={busy ? "boxStyleBusy" : "boxStyleFree"}>{day === 0 ? '' : day}</Col>
                })}
            </Row>
        )
    })
}

class Calendar extends Component {
    render() {
        return (
            <BDiv shadow p="3" bg="light" rounded>
                <Container>
                    <label htmlFor="month">График на <b>{month[this.props.month]} {this.props.year}</b> </label>
                    <Row>
                        {days.map((item, index)=>{
                            return(
                                <Col rounded key={index} className="boxStyleHeader">{item}</Col>
                            )
                        })}
                    </Row>
                    {renderTable(this.props.year, this.props.month, this.props.dates)}
                </Container>
            </BDiv>
        )
    }
}

function mapStateToProps(state) {
    return{
        month: state.months,
        year: state.year,
        dates: state.dates
    }
}

function mapDispatchToProps(dispatch) {
    return{
        getCars: () => dispatch(getCars()),
        getCarsCalendar: (id) => dispatch(getCarsCalendar(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);



